'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { use, useEffect } from 'react'
import { Skeleton } from '@/app/components'

const AssigneeSelect = () => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 1000 * 60 * 5,
    retry: 3
  })
  if (isLoading) return <Skeleton></Skeleton>
  if (error) return null

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign to..'>
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map(user => (
            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
          ))}

        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect