import React from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../Images/logo.png'

export const AdminHome = () => {

    const navigate = useNavigate()

return (

    <Grid container>
        <Grid item xs={3} >
            
        
            <Stack gap='50px' sx={{backgroundColor:'#A1FEC0',borderRadius:'25px' , margin:'20px'}} >
                <img src={logo} alt='Swargadhi logo' style={{margin:'20px'}}/>
                <Typography variant='h4' style={{margin:'20px'}}>Admin Panel</Typography>
            <Stack direction='column' gap='50px' width='80%' justifyContent='center' alignContent='center' margin='auto' >

                <Button onClick={()=>navigate('')}>Dashboard</Button>
                <Button  onClick={()=>navigate('admin/profile')}>Admin Profile</Button>
                <Button onClick={()=>navigate('admin/orders')}>Orders</Button>
                <Button onClick={()=>{navigate('admin/products')}}>product</Button>
                <Button onClick={()=>navigate('admin/salesreport')}  >Sales Report</Button>
                <Button onClick={()=>navigate('admin/users')}  >Users</Button>
                <Button onClick={()=>navigate('admin/messages')}  >Messages</Button>
                <Button onClick={()=>navigate('admin/settings')}  >Settings</Button>
                <Button onClick={()=>alert('You have signed out!')}  >SignOut</Button>
                
            </Stack >
            </Stack>
        
            
        </Grid>
        <Grid item xs={9} sx={{backgroundColor:'#C8FFDB'}}>
            <Stack sx={{backgroundColor:'#A1FEC0',borderRadius:'25px' , margin:'20px',height:'auto'}}>
                
                <Outlet/>
            </Stack>

        </Grid>

    </Grid>
)
}
