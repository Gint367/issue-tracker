import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';


interface Props {
    params: { id: string }
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }))

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions)
    // checks if id is other than a number
    if (Number.isNaN(Number(params.id))) {
        //console.log(typeof(params.id))
        notFound()
    }

    const issue = await fetchUser(parseInt(params.id))

    if (!issue) notFound();

    //await delay(2000)

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />

            </Box>
            {session && <Box>
                <Flex direction={"column"} gap={"4"}>
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />

                </Flex>

            </Box>}
        </Grid>
    )
}

export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id))
    return {
        title: 'Issue: ' + issue?.title,
        description: 'Details of the issue' + issue?.id
    }
}
export default IssueDetailPage