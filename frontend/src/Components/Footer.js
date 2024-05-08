import React from 'react'
import { AppBar, Button, Stack, Toolbar } from '@mui/material'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
import { Email, WhatsApp, Facebook, Call } from '@mui/icons-material';

export const Footer = () => {

    const navigate = useNavigate();


    
    return (
    
        <AppBar position='static' sx={{ display: 'flex', justifyContent: 'center',backgroundColor:'#F3FFD0', width:'100%',padding:'20px 20px 20px 0px' }} >
            
            <Stack direction={{sm:'row', xs:'column'}} justifyContent='space-between' >
                
                <Button onClick={()=>navigate('/')} sx={{width:{xs:'80%', md:'30%', sm:'50%'}}}><img src={logo} alt="Swargadhi logo"  width='100%' />
</Button>

                    <Stack direction='column'  spacing={0} sx={{padding:'25px', color:'red'}} >
                    <Button variant='text' onClick={()=>{navigate('/')}}  sx={{justifyContent:'left', color:'black'}}>Home</Button>
                    <Button variant='text' onClick={()=>navigate('/shop')} sx={{justifyContent:'left'}}>Shop</Button>
                    <Button variant='text' onClick={()=>navigate('/dispensary')} sx={{justifyContent:'left'}}>Dispensary</Button>
                    <Button variant='text' onClick={()=>navigate('/about')}  sx={{justifyContent:'left'}}>About Us</Button>
                    <Button variant='text' onClick={()=>navigate('/myaccount')}   sx={{justifyContent:'left'}}>My Account</Button>
                    </Stack>
                
                    <Stack direction='column' spacing={1} justifyContent="center" padding="25px">
                    
                    <Button variant='text' startIcon={<Call/>} sx={{justifyContent:'left'}}>081 7822142</Button>
                    <Button variant='text' startIcon={<Email/>} sx={{justifyContent:'left'}}>swargadhi@gmail.com</Button>
                    <Button variant='text' startIcon={<WhatsApp/>} sx={{justifyContent:'left'}}>071 1947550</Button>
                    <Button variant='text' startIcon={<Facebook/>} sx={{justifyContent:'left'}} href='https://web.facebook.com/profile.php?id=100063950014549'>ස්වර්ගධී ආයුර්වේද නිෂ්පාදන</Button>
                    </Stack>
                
                </Stack>
            
            

        </AppBar>
    
    )
}
