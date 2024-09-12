import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { issueSchema } from '../../validationSchema';
const prisma = new PrismaClient();


/**
 * Handles a POST request to create a new issue.
 * Validates the request body against a predefined schema and creates a new issue using Prisma.
 * Returns a JSON response with the created issue or validation errors.
 * @param request - The Next.js request object containing the request body.
 * @returns A JSON response indicating the success or failure of the creation process.
 */
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400})
    
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description}
    })
    return NextResponse.json(newIssue, { status: 201}) //201 is created

}