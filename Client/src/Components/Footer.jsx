import React from 'react'
import { AppBar, Button, Stack, Typography} from '@mui/material'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
import { Email, WhatsApp, Facebook, Call } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export const Footer = () => {

    const navigate = useNavigate();


    
    return (
    
        <AppBar position='static' sx={{ display: 'flex', justifyContent: 'center',alignItems:'center',backgroundColor:'#CBCBCB', width:'100%',padding:'20px 20px 20px 0px', color:'black' }} >
            
            <Stack direction={{sm:'row', xs:'column'}} justifyContent='space-between' >
                
                <Stack sx={{width:{xs:'80%', md:'30%', sm:'50%'}}}>
                <Button onClick={()=>navigate('/')} ><img src={logo} alt="Swargadhi logo"  width='100%' />
                </Button>
                <Stack marginLeft='25px'>
                <Typography variant='h6' sx={{color:'black'}}><LocationOnIcon/>No: 273/B, Temple Road, Gonulla,Gonawila </Typography>
                {/* <Typography variant='body' sx={{color:'black'}}>Gonulla,</Typography>
                <Typography variant='body' sx={{color:'black'}}>Gonawila</Typography> */}
                </Stack>
                </Stack>

                    <Stack direction='column'  spacing={0} sx={{padding:'25px', color:'black'}} >
                    <Typography variant='h6' fontWeight='bold' pl='10px'>Quick Links</Typography>
                    <Button variant='text' onClick={()=>{navigate('/')}}  sx={{justifyContent:'left', color:'black'}}><KeyboardArrowRightIcon/>Home</Button>
                    <Button variant='text' onClick={()=>navigate('/shop')} sx={{justifyContent:'left', color:'black'}}><KeyboardArrowRightIcon/>Shop</Button>
                    <Button variant='text' onClick={()=>navigate('/dispensary')} sx={{justifyContent:'left', color:'black'}}><KeyboardArrowRightIcon/>Dispensary</Button>
                    <Button variant='text' onClick={()=>navigate('/about')}  sx={{justifyContent:'left', color:'black'}}><KeyboardArrowRightIcon/>About Us</Button>
                    <Button variant='text' onClick={()=>navigate('/user')}   sx={{justifyContent:'left', color:'black' }}><KeyboardArrowRightIcon/>My Account</Button>
                    </Stack>
                
                    <Stack direction='column' spacing={1} justifyContent="center" padding="25px">
                    <Typography variant='h6' fontWeight='bold'>Connect With Us</Typography>
                    <Button variant='text' startIcon={<Call/>} sx={{justifyContent:'left', color:'black'}}>081 7822142</Button>
                    <Button variant='text' startIcon={<Email/>} sx={{justifyContent:'left', color:'black'}}>swargadhi@gmail.com</Button>
                    <Button variant='text' startIcon={<WhatsApp/>} sx={{justifyContent:'left', color:'black'}}>071 1947550</Button>
                    <Button variant='text' startIcon={<Facebook/>} sx={{justifyContent:'left', color:'black'}} href='https://web.facebook.com/profile.php?id=100063950014549'>ස්වර්ගධී ආයුර්වේද නිෂ්පාදන</Button>
                    </Stack>
                
                </Stack>
            
            

        </AppBar>
    
    )
}
