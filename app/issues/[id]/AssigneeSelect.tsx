'use client'
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers()
  if (isLoading) return <Skeleton></Skeleton>
  if (error) return null

  const assignIssue = (userId: string) => {
    axios.patch('/api/issues/' + issue.id, {
      assignedToUserId: userId === 'unassign' ? null : userId,
      status: userId === 'unassign' ? 'OPEN' : 'IN_PROGRESS'
    }).catch(() => {
      toast.error('An error occurred while assigning the issue')
    })
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignIssue}>

        <Select.Trigger placeholder='Assign to..'>
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassign">Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
            ))}

          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>

  )
}

const useUsers = () => useQuery<User[]>({
  queryKey: ['users'],
  queryFn: () => axios.get('/api/users').then(res => res.data),
  staleTime: 1000 * 60 * 5,
  retry: 3
})

export default AssigneeSelect