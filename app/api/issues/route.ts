import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { patchIssueSchema } from '../../validationSchema';
import { get } from "http";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
const prisma = new PrismaClient();


/**
 * Handles a POST request to create a new issue.
 * Validates the request body against a predefined schema and creates a new issue using Prisma.
 * Returns a JSON response with the created issue or validation errors.
 * @param request - The Next.js request object containing the request body.
 * @returns A JSON response indicating the success or failure of the creation process.
 */
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description }
    })
    return NextResponse.json(newIssue, { status: 201 }) //201 is created

}