import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export const Home = () => {

    const navigate = useNavigate()

  return (
    <Stack>
        <Typography variant='h1'>Hello world</Typography>
        <Stack >
        <Button variant='contained' onClick={()=>{navigate('/login')}}>Login</Button>
        <Button variant='contained' onClick={()=>{navigate('/signup')}}>Signup</Button>

        </Stack>
    </Stack>
  )
}
