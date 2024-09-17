import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import Pagination from '../components/Pagination'
import IssueActions from './IssueActions'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex, Text } from '@radix-ui/themes'
import { Metadata } from 'next'


const IssuesPage = async ({ searchParams }: {
  searchParams: IssueQuery
}) => {


  //console.log(searchParams)
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const where = { status }

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDirection === 'asc' ? 'asc' : 'desc' }
    : undefined


  const page = parseInt(searchParams.page) || 1
  const pageSize = 10
  const issue = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })
  const issueCount = await prisma.issue.count({ where })
  //await delay(2000)
  return (
    <Flex direction={"column"} gap={"3"} justify={'between'}>

      <IssueActions />
      <IssueTable searchParams={searchParams} issue={issue} />
      <Text>
        Showing
        <input
          name='varpageSize'
          type="number"
          value={issue.length}
          //onChange={e => pageSize = parseInt(e.target.value)}
          style={{ width: '50px', margin: '0 5px' }}
        />
        of {issueCount} issues
      </Text>

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount} />

    </Flex>

  )
}

export const dynamic = 'force-dynamic'
export default IssuesPage
export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'Lists of the issue tracker app',
}