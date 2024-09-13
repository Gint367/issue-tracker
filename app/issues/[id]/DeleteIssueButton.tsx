'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteIssueButton = ({ issueId}: { issueId: number}) => {
    const router = useRouter()
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description>
                Are you sure you want to delete this issue?
            </AlertDialog.Description>
              <Flex gap="3">
                  <AlertDialog.Action>
                      <Button onClick={async () => {
                        await axios.delete(`/api/issues/${issueId}`)
                        router.push('/issues')
                        router.refresh()
                      }} color="red">Delete</Button>

                  </AlertDialog.Action>
                  <AlertDialog.Cancel>
                      <Button variant='soft'>Cancel</Button>

                  </AlertDialog.Cancel>
              </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
    
  )
}

export default DeleteIssueButton