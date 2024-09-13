'use client'
import { AlertDialog, Button, Flex, Spinner } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { set } from 'zod'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [isDeleting, setDeleteing] = useState(false)

    const deleteIssue = async () => {
        try {   
            setDeleteing(true)              
            await axios.delete(`/api/issues/${issueId}`)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setDeleteing(false)
            setError(true)
        }
    }


    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button disabled={isDeleting} color="red">
                        Delete Issue
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue?
                    </AlertDialog.Description>
                    <Flex gap="3">
                        <AlertDialog.Action>
                            <Button onClick={deleteIssue} color="red">Delete</Button>

                        </AlertDialog.Action>
                        <AlertDialog.Cancel>
                            <Button variant='soft'>Cancel</Button>

                        </AlertDialog.Cancel>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        An error occurred while deleting the issue
                    </AlertDialog.Description>
                    <AlertDialog.Action>
                        <Button color="gray" variant='soft' mt={"2"} onClick={() => setError(false)}>OK</Button>
                    </AlertDialog.Action>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>

    )
}

export default DeleteIssueButton