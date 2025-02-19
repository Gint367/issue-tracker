'use client'
import { Card } from '@radix-ui/themes';
import { Bar, BarChart, Label, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
    const data = [
        { name: 'Open', value: open },
        { name: 'In Progress', value: inProgress },
        { name: 'Closed', value: closed }
    ]
    return (
        <Card>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="value" barSize={60} style={{ fill: 'var(--accent-9)' }}>
                        {data.map((entry, index) => (
                            <Label
                                key={`label-${index}`}
                                position="top"
                                fill="#000"
                                textAnchor="middle"
                            >
                                {entry.name}
                            </Label>
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

        </Card>
    )
}

export default IssueChart