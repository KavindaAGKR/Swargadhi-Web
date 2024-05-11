import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'

export const PageNotFound = () => {
  return (
    <Stack justifyContent='center' alignItems='center' sx={{height:'100%', margin:'150px auto '}}>
        <Typography variant='h2'>Oooops... <br/>404  Error</Typography>
        <Typography variant='h4'>Page Not Found</Typography>
    </Stack>
  )
}
