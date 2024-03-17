import React from 'react'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../Images/logo.png'

export const AdminHome = () => {

    const navigate = useNavigate()

return (

    <Grid container>
        <Grid item xs={3} >
            
        
            <Box gap='50px' sx={{backgroundColor:'#A1FEC0',borderRadius:'25px' , margin:'20px', height:'100%', textAlign:'center'}} >
                <Stack>
                <img src={logo} alt='Swargadhi logo' style={{margin:'20px'}}/>
                <Typography variant='h4' style={{margin:'20px'}}>Admin Panel</Typography>
            <Stack direction='column' gap='50px' width='80%' justifyContent='center' alignContent='center' margin='auto' >

                <Button variant='contained' color='success' onClick={()=>navigate('')}>Dashboard</Button>
                <Button variant='contained' color='success' onClick={()=>navigate('profile')}>Admin Profile</Button>
                <Button variant='contained' color='success' onClick={()=>navigate('orders')}>Orders</Button>
                <Button variant='contained' color='success' onClick={()=>{navigate('products')}}>products</Button>
                <Button variant='contained' color='success' onClick={()=>navigate('salesreport')}  >Sales Report</Button>
                <Button variant='contained' color='success' onClick={()=>navigate('users')}  >Users</Button>
                <Button variant='contained' color='success' onClick={()=>navigate('messages')}  >Messages</Button>
                <Button variant='contained' color='success' onClick={()=>navigate('settings')}  >Settings</Button>
                <Button variant='contained' color='success' onClick={()=>alert('You have signed out!')}  >SignOut</Button>
                
            </Stack >
                </Stack>
            </Box>
        
            
        </Grid>
        <Grid item xs={9} >
            <Box sx={{backgroundColor:'#C8FFDB',borderRadius:'25px' , margin:'20px',height:'100%'}}>
            <Stack  >
                
                <Outlet/>
            </Stack>
            </Box>

        </Grid>
    </Grid>
)
}
