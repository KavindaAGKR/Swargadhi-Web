import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PageNotFoundSi = () => {
  const navigate = useNavigate();
  return (
    <Stack justifyContent='center' alignItems='center' sx={{height:'100%', margin:'150px auto '}}>
        <Typography variant='h2'>Oooops...</Typography>
        <Typography variant='h4'> 404  Error : වෙබ් පිටුව හමු නොවීය</Typography>
        <Typography variant='h6'>  <Button variant='text' onClick={()=>navigate('/')}>ස්වර්ගධී</Button> මුල් පිටුව වෙත යන්න</Typography>
    </Stack>
  )
}
