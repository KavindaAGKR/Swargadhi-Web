import React from 'react'
import { AppBar, Button, Stack, Toolbar } from '@mui/material'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
import { Email, WhatsApp, Facebook, Call } from '@mui/icons-material';

export const Footer = () => {

    const navigate = useNavigate();
    return (
    
        <AppBar position='static' sx={{ display: 'flex', justifyContent: 'center',backgroundColor:'white', width:'100%',padding:'0px' }} >
            
            <Stack direction='column' alignItems='center'>
                
                <img src={logo} alt="Swargadhi logo" width="20%" height='40%' />


                    <Stack direction={{ xs: 'column', md:'row' }}  spacing={1} sx={{padding:'20px'}}>
                    <Button variant='text' onClick={()=>{navigate('/')}}>Home</Button>
                    <Button variant='text' onClick={()=>navigate('/shop')}>Shop</Button>
                    <Button variant='text' onClick={()=>navigate('/dispensary')}>Dispensary</Button>
                    <Button variant='text' onClick={()=>navigate('/about')}>About Us</Button>
                    <Button variant='text' onClick={()=>navigate('/myaccount')}>My Account</Button>
                    </Stack>
                
                    <Stack direction={{ xs: 'column', md:'row' }} spacing={5}>
                    
                    <Button variant='text' startIcon={<Call/>}>081 7822142</Button>
                    <Button variant='text' startIcon={<Email/>}>swargadhi@gmail.com</Button>
                    <Button variant='text' startIcon={<WhatsApp/>}>071 1947550</Button>
                    <Button variant='text' startIcon={<Facebook/>} href='https://web.facebook.com/profile.php?id=100063950014549'>ස්වර්ගධී ආයුර්වේද නිෂ්පාදන</Button>
                    </Stack>
                
                </Stack>
            
            

        </AppBar>
    
    )
}
