import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'


export const AdminHome = () => {

    const navigate = useNavigate()

return (
    <Stack>
        <Typography variant='h1'>Admin Home</Typography>
        <Stack >
        <Button variant='contained' onClick={()=>{navigate('/admin/products')}}>Products</Button>
        {/* <Button variant='contained' onClick={()=>{navigate('/signup')}}>Signup</Button>
        <Button variant='contained' onClick={()=>navigate('/about')}>About Us</Button> */}

        </Stack>
    </Stack>
)
}
