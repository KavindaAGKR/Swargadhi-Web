import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export const Home = () => {

    const navigate = useNavigate()

  return (
    <Stack>
        <Typography variant='h1'>Hello world - Web Home Page</Typography>
        <Stack >
        <Button variant='contained' onClick={()=>{navigate('/login')}}>Login</Button>
        <Button variant='contained' onClick={()=>{navigate('/signup')}}>Signup</Button>
        <Button variant='contained' onClick={()=>navigate('/about')}>About Us</Button>
        <Button variant='text' onClick={()=>navigate('/admin')}>admin</Button>
        </Stack>
    </Stack>
  )
}
