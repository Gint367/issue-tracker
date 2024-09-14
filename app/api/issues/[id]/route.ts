import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse, userAgent } from "next/server";
import delay from "delay";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const { assignedToUserId, title, description } = body
    if (body.assignedToUserId) {
        const issue = await prisma.user.findUnique({ where: { id: body.assignedToUserId } })
        if (!issue)
            return NextResponse.json({ error: 'Invalid User' }, { status: 400 })
    }
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

    const updateIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId
        }
    })

    return NextResponse.json(updateIssue)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    //await delay(2000)
    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

    await prisma.issue.delete({
        where: { id: issue.id }
    })

    return NextResponse.json({ message: 'Issue deleted' })
}