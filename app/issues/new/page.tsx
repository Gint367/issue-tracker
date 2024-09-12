import React from 'react'
import IssueForm from '../_components/IssueForm'

import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'

const IsssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  { 
    ssr:false,
    loading: () => <IssueFormSkeleton/>
  }
)

const NewIssuePage = () => {
  return (
    <IssueForm />

  )
}

export default NewIssuePage