import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id:string}
}
async function IssueDetailPage({params}: Props ) {
    if (Number.isNaN(Number(params.id))) {
        //console.log(typeof(params.id))
        notFound()
    }
        
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id)}
    })
    if (!issue)
        notFound();
    return (
        <div>
            <p>{issue.title} </p>
            <p>{issue.description} </p>
            <p>{issue.status} </p>
            <p>{issue.createdAt.toDateString()} </p>
        </div>
       
    )
}

export default IssueDetailPage