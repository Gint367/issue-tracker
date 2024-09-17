import { IssueStatusBadge, Link } from '@/app/components'
import { Status, Issue } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    orderDirection: 'asc' | 'desc',
    page: string
}
interface Props {
    searchParams: IssueQuery,
    issue: Issue[]
}

const IssueTable = ({ searchParams, issue }: Props) => {
    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map(column => (
                        <Table.ColumnHeaderCell key={column.value} className={column.className}>
                            <NextLink href={{
                                query: {
                                    ...searchParams,
                                    orderBy: column.value,
                                    orderDirection: searchParams.orderBy === column.value && searchParams.orderDirection === 'desc' ? 'asc' : 'desc'
                                }
                            }}>
                                {column.label}
                            </NextLink>
                            {column.value === searchParams.orderBy && (
                                searchParams.orderDirection === 'asc' ? <ArrowUpIcon className='inline' /> : <ArrowDownIcon className='inline' />
                            )}
                        </Table.ColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {issue.map(issue => (
                    <Table.Row key={issue.id}>
                        <Table.Cell >
                            <Link href={`/issues/${issue.id}`} >
                                {issue.title}
                            </Link>

                            <div className='block md:hidden'>
                                <IssueStatusBadge status={issue.status} />
                            </div>
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>
                            <IssueStatusBadge status={issue.status} />
                        </Table.Cell>
                        <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}
const columns: {
    label: string,
    value: keyof Issue,
    className?: string
}[] = [
        { label: 'Issue', value: 'title' },
        { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
        { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
    ]
export const columnNames = columns.map(column => column.value)

export default IssueTable