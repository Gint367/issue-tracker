import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IsssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    { 
      ssr:false,
      loading: () => <IssueFormSkeleton/>
    }
  )

interface Props {
    params: {id: string }
}

const EditissuePage = async ({ params }: Props) => {
    const issue= await prisma.issue.findUnique({
        where: { id: parseInt(params.id)}
    })

    if (!issue) notFound()

    return (
        <IssueForm issue={issue}/>
    )
}

export default EditissuePage