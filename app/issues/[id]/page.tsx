import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface Props {
    params: { id:string}
}

const IssueDetailPage = async ({ params }: Props) =>  {
    // checks if id is other than a number
    if (Number.isNaN(Number(params.id))) {
        //console.log(typeof(params.id))
        notFound()
    }
        
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id)}
    })
    
    if (!issue) notFound();
    
    //await delay(2000)
    
    return (
        <div>
            <Heading>{issue.title} </Heading>
            <Flex className='space-x-3' my={"2"}>
                <IssueStatusBadge status={issue.status}/>
                <Text>{issue.createdAt.toDateString()} </Text>
            </Flex>
            <Card className='prose' mt={"4"}>
            <ReactMarkdown children = {issue.description} />
            </Card>
        </div>
       
    )
}

export default IssueDetailPage