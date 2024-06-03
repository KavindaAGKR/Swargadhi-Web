import React, { useState } from 'react'
import { Box, Button, Drawer, Grid, IconButton, Stack, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../Images/logo.png'
import MenuIcon from "@mui/icons-material/Menu";




export const AdminHome = () => {

    const [openDrawer, setOpenDrawer] = useState(false);






    const navigate = useNavigate()

return (

    <Grid container>
        <Grid item xs={12} md={3} >
            
        
            <Box gap='50px' sx={{backgroundColor:{xs:'white', md:'#A1FEC0'},borderRadius:'25px' , margin:'20px', height:'100%', textAlign:'center', }} >
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
                <Stack direction='column' gap='10px' width='200px' margin='20px' >
                <img src={logo} alt='Swargadhi logo' />
                <Typography variant='h5' textAlign='center' >Admin Panel</Typography>
                <Stack width='70%' gap={2} margin='auto'>
                    <Button variant='contained' color='success' onClick={()=>navigate('')}>Dashboard</Button>
                    <Button variant='contained' color='success' onClick={()=>navigate('orders')}>Orders</Button>
                    <Button variant='contained' color='success' onClick={()=>{navigate('products')}}>products</Button>
                    <Button variant='contained' color='success' onClick={()=>navigate('salesreport')}  >Sales Report</Button>
                    <Button variant='contained' color='success' onClick={()=>navigate('doctor')}  >Doctor</Button>
                    <Button variant='contained' color='success' onClick={()=>navigate('treatment')}  >Treatment</Button>
                    <Button variant='contained' color='success' onClick={()=>navigate('users')}  >User</Button>
                    <Button variant='contained' color='success' onClick={()=>navigate('messages')}  >Msg</Button>
                    <Button variant='contained' color='success' onClick={()=>alert('You have signed out!')}  >SignOut</Button>
                </Stack>
</Stack >
                    </Drawer>

                    <Stack direction='column' gap='50px' width='80%' justifyContent='center' alignContent='center' margin='auto' sx={{display:{xs:'none', md:'inherit'}}}>

<Button variant='contained' color='success' onClick={()=>navigate('')}>Dashboard</Button>
<Button variant='contained' color='success' onClick={()=>navigate('orders')}>Orders</Button>
<Button variant='contained' color='success' onClick={()=>{navigate('products')}}>products</Button>
<Button variant='contained' color='success' onClick={()=>navigate('salesreport')}  >Sales Report</Button>
<Button variant='contained' color='success' onClick={()=>navigate('doctor')}  >Doctor</Button>
<Button variant='contained' color='success' onClick={()=>navigate('treatment')}  >Treatment</Button>
<Button variant='contained' color='success' onClick={()=>navigate('users')}  >User</Button>
<Button variant='contained' color='success' onClick={()=>navigate('messages')}  >Msg</Button>
<Button variant='contained' color='success' onClick={()=>alert('You have signed out!')}  >SignOut</Button>
</Stack >
            



            </Stack>
            </Box>
        
        
            
        </Grid>
        <Grid item xs={12 } md={9}>
            <Box sx={{backgroundColor:'#C8FFDB',borderRadius:'25px' , margin:{xs:'5px' , md:'20px'},height:'100%'}}>
            <Stack  >
                
                <Outlet/>
            </Stack>
            </Box>

        </Grid>
    </Grid>
)
}
