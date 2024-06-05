import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Stack justifyContent='center' alignItems='center' sx={{height:'100%', margin:'150px auto '}}>
        <Typography variant='h2'>Oooops...</Typography>
        <Typography variant='h4'> 404  Error : Page Not Found</Typography>
        <Typography variant='h6'>Go to <Button variant='text' onClick={()=>navigate('/')}>Swargadhi</Button> home page</Typography>
    </Stack>
  )
}
