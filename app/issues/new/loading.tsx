import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function LoadingNewIssuePage() {
  return (
    <Box className='max-w-xl'>
      <Skeleton></Skeleton>
      <Skeleton height={"15rem"}></Skeleton>
    </Box>
  )
}

export default LoadingNewIssuePage