import { AppBar, Button, IconButton, Stack, Toolbar } from '@mui/material'
import React from 'react'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Header = () => {
    const navigate = useNavigate();


return (

    <div>
        <AppBar position='static'>
            <Toolbar sx={{backgroundColor:'white', justifyContent:'space-between'}}>
                <img src={logo} alt="Swargadhi logo" width="20%"/>

                <Stack direction='row' spacing={5}>
                    <Stack direction='row'  spacing={1}>
                    <Button variant='text' onClick={()=>{navigate('/')}}>Home</Button>
                    <Button variant='text' onClick={()=>navigate('/shop')}>Shop</Button>
                    <Button variant='text' onClick={()=>navigate('/dispensary')}>Dispensary</Button>
                    <Button variant='text' onClick={()=>navigate('/about')}>About Us</Button>
                    <Button variant='text' onClick={()=>navigate('/myaccount')}>My Account</Button>
                    </Stack>
                    <Button variant='contained'>සිංහල</Button>
                    <Button variant='contained' color="success" onClick={()=>navigate('/login')}>Sign In</Button>
                    <IconButton><ShoppingCartIcon/></IconButton>
                </Stack>
            </Toolbar>
            

        </AppBar>
    </div>
  )
}
