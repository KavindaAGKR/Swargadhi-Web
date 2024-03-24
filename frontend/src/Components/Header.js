import { AppBar, Avatar, Button, IconButton, Stack, Toolbar, Drawer, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import profilepng from '../Images/profile.png'
  import MenuIcon from "@mui/icons-material/Menu";






//Responsive Navigation Bar
export const ResponsiveNav = (props) =>{
    const navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);
    if(props.isMatch===true){
            return (
                <React.Fragment>
                    <Drawer
                        anchor="left"
                        open={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                        >
                            <Stack direction='column' >
                                <Button variant='text' onClick={()=>{navigate('/')}}>Home</Button>
                                <Button variant='text' onClick={()=>navigate('/shop')}>Shop</Button>
                                <Button variant='text' onClick={()=>navigate('/dispensary')}>Dispensary</Button>
                                <Button variant='text' onClick={()=>navigate('/about')}>About Us</Button>
                                <Button variant='text' onClick={()=>navigate('/user')}>My Account</Button>
                            </Stack>
                    </Drawer>
                <IconButton
                    sx={{ color: "black", marginLeft: "auto" }}
                    onClick={() => setOpenDrawer(!openDrawer)}
                >
                <MenuIcon color="white" />
                </IconButton>
                </React.Fragment>
            );
        }
    else{
        return(
            <Stack direction='row'  >
                    <Button variant='text' onClick={()=>{navigate('/')}}>Home</Button>
                    <Button variant='text' onClick={()=>navigate('/shop')}>Shop</Button>
                    <Button variant='text' onClick={()=>navigate('/dispensary')}>Dispensary</Button>
                    <Button variant='text' onClick={()=>navigate('/about')}>About Us</Button>
                    <Button variant='text' onClick={()=>navigate('/user')}>My Account</Button>
                </Stack>
        );
    }

}





//To show the DP when user logged in
export const IsLogged = (props) => {
    
    const navigate = useNavigate();
    if (!props.isLogged) {
        return (
            <Button variant='contained' color="success" onClick={()=>navigate('/login')} >Sign In</Button>
        );
    } else {
        return (
            <Button><Avatar sx={{bgcolor:'primary.light'}}>DP</Avatar></Button>
        );
    }
};





//Header
export const Header = () => {
    
    //const navigate = useNavigate();

    //const [isLoggedIn] = useState(true);
    const isLoggedIn = false;


    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    
    return (
            <React.Fragment >
                <AppBar position='static' >
                    <Toolbar sx={{backgroundColor:'white', justifyContent:'space-between'  }}>
                        <img src={logo} alt="Swargadhi logo" width="30%"/>


                        <Stack direction='row' spacing={2} >

                            <ResponsiveNav isMatch={isMatch}/>
                            <Button variant='contained'>සිංහල</Button>
                            <IsLogged isLogged={isLoggedIn}/>
                            <IconButton sx={{padding:'0px'}}><ShoppingCartIcon/></IconButton>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
}



