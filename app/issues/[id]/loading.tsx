import { Box, Card, Flex } from '@radix-ui/themes'
import {Skeleton} from '@/app/components'

function LoadingIssueDetailPage() {
  return (
    <Box className='max-w-xl'>
        <Skeleton/>
        <Flex className='space-x-3' my={"2"}>
          <Skeleton width={"3rem"}/>
          <Skeleton width={"7rem"}/>
        </Flex>
        <Card className='prose' mt={"4"}>
          <Skeleton count={3}/>
        </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage