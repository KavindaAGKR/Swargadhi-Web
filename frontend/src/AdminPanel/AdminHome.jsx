import React, { useState } from 'react'
import { Box, Button, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../Images/logo.png'
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

export const AdminHome = () => {

    const [openDrawer, setOpenDrawer] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handlSignout = () => {
        dispatch(logout());
        alert('You have signed out!');
        navigate('/admin')
    };

return (

    <Grid container>
        <Grid item xs={12} md={3} >
            
        
            <Box gap='50px' sx={{backgroundColor:{xs:'white', md:'#A1FEC0'},borderRadius:'15px' , margin:'20px', height:'100%', textAlign:'center', }} >
                <Stack>
                <img src={logo} alt='Swargadhi logo' style={{margin:'20px auto',width:'80%', maxWidth:'500px'}}/>
                <Stack direction='row' margin='auto'>
                <IconButton
                    sx={{display:{xs:'block', md:'none'}, color: "black", marginLeft: "auto" }}
                    onClick={() => setOpenDrawer(!openDrawer)}
                >
                <MenuIcon color="white" />
                </IconButton>
                <Typography variant='h5' style={{margin:'20px'}}>Admin Panel</Typography>
                </Stack>

                
                <Drawer open={openDrawer} onClose={()=>setOpenDrawer(false)} >
                <Stack direction='column' gap='10px' width='250px' margin='20px' >
                <img src={logo} alt='Swargadhi logo' />
                <Typography variant='h5' textAlign='center' >Admin Panel</Typography>
                <Stack width='80%' gap={2} margin='auto'>
                    <Button variant='contained' color='success' onClick={()=>{navigate('');setOpenDrawer(false);}}>Dashboard</Button>
                    <Button variant='contained' color='success' onClick={()=>{navigate('orders');setOpenDrawer(false);}}>Orders</Button>
                    <Button variant='contained' color='success' onClick={()=>{navigate('products');setOpenDrawer(false);}}>products</Button>
                    {/* <Button variant='contained' color='success' onClick={()=>{navigate('salesreport');setOpenDrawer(false);}}  >Sales Report</Button> */}
                    <Button variant='contained' color='success' onClick={()=>{navigate('doctor');setOpenDrawer(false);}}  >Doctors</Button>
                    <Button variant='contained' color='success' onClick={()=>{navigate('treatment');setOpenDrawer(false);}}  >Treatments</Button>
                    <Button variant='contained' color='success' onClick={()=>{navigate('users');setOpenDrawer(false);}}  >User Details</Button>
                    <Button variant='contained' color='success' onClick={()=>{navigate('material');setOpenDrawer(false);}}>Material suppliers</Button>
                    <Button variant='contained' color='success' onClick={()=>{navigate('messages');setOpenDrawer(false);}}  >User Feedbacks</Button>
                    <Button variant='contained' color='error' onClick={()=>{handlSignout();setOpenDrawer(false);}}  >SignOut</Button>
                </Stack>
</Stack >
                    </Drawer>

                    <Stack direction='column' gap='50px' width='80%' justifyContent='center' alignContent='center' margin='auto' sx={{display:{xs:'none', md:'inherit'}}}>

<Button variant='contained' color='success' onClick={()=>navigate('')}>Dashboard</Button>
<Button variant='contained' color='success' onClick={()=>navigate('orders')}>Orders</Button>
<Button variant='contained' color='success' onClick={()=>{navigate('products')}}>Products</Button>
{/* <Button variant='contained' color='success' onClick={()=>navigate('salesreport')}  >Sales Report</Button> */}
<Button variant='contained' color='success' onClick={()=>navigate('doctor')}  >Doctors</Button>
<Button variant='contained' color='success' onClick={()=>navigate('treatment')}  >Treatments</Button>
<Button variant='contained' color='success' onClick={()=>navigate('users')}  >User Details</Button>
<Button variant='contained' color='success' onClick={()=>navigate('messages')}  >User Feedbacks</Button>
<Button variant='contained' color='success' onClick={()=>navigate('material')}>Material suppliers</Button>
<Button variant='contained' color='error' onClick={handlSignout}  >SignOut</Button>
</Stack >

            </Stack>
            </Box>
        </Grid>
        <Grid item xs={12 } md={9}>
            <Box sx={{backgroundColor:'#C8FFDB',borderRadius:'15px' , margin:{xs:'10px' , md:'20px 0px'},height:'100%', minHeight:'500px' }}>
                <Outlet/>
            </Box>

        </Grid>
    </Grid>
)
}
