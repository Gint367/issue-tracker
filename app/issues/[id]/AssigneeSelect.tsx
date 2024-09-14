'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { use, useEffect } from 'react'

const AssigneeSelect = () => {
  const [users, setUsers] = React.useState<User[]>([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<User[]>('/api/users')
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <Select.Root>
        <Select.Trigger placeholder='Assign to..'>
        </Select.Trigger>
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                {users.map(user => (
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                ))}
                
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default AssigneeSelect