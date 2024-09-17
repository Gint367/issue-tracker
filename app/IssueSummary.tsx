import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link';
import React from 'react'

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const statuses: {
        label: string;
        value: number;
        status: Status;
    }[] = [
            { label: "Open Issues", value: open, status: 'OPEN' },
            { label: "In Progress Issues", value: inProgress, status: 'IN_PROGRESS' },
            { label: "Closed Issues", value: closed, status: 'CLOSED' },
        ];
    return (
        <Flex gap={"3"}>
            {statuses.map(status => (
                <Link key={status.status} href={`/issues?status=${status.status}`} className='w-full'>
                    <Card>
                        <Flex direction={'column'} align={'center'} gap={"1"}>
                            <Text className='text-sm font-medium'>{status.label}</Text>
                            <Text size={"5"} className='font-bold'>{status.value}</Text>
                        </Flex>
                    </Card>
                </Link>
            ))}
        </Flex>
    )
}

export default IssueSummary