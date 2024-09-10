import { Box } from '@radix-ui/themes'
import {Skeleton} from '@/app/components'

function LoadingNewIssuePage() {
  return (
    <Box className='max-w-xl'>
      <Skeleton></Skeleton>
      <Skeleton height={"15rem"}></Skeleton>
    </Box>
  )
}

export default LoadingNewIssuePage