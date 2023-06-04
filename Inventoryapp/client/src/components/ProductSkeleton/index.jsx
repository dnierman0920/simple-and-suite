import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const ProductSkeleton = () => {
  return (
    <Stack spacing={1}>
        <Skeleton variant="rectangular" width={260} height={250} />
        <Skeleton variant="rounded" width={250} height={30} />
        <Skeleton variant="rounded" width={160} height={20} />
    </Stack>
  )
}

export default ProductSkeleton