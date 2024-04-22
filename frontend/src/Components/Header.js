import { AppBar, Avatar, Button, IconButton, Stack, Toolbar, Drawer, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import profilepng from '../Images/profile.png'
  import MenuIcon from "@mui/icons-material/Menu";


import { useSelector } from 'react-redux';
import {selectUser, selectIsLoggedIn} from '../redux/slices/userSlice'


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
// export const IsLogged = () => {

//     const isLoggedIn = useSelector(selectIsLoggedIn);
//     const user = useSelector(selectUser);
    
    
//     const navigate = useNavigate();
//     if (!isLoggedIn) {
//         return (
//             <Button variant='contained' color="success" onClick={()=>navigate('/login')} >Sign In</Button>
//         );
//     } else {
//         const firstNameInitial = user.firstName.charAt(0);
//         const lastNameInitial = user.lastName.charAt(0);

//         return (
//             <Button>
//             <Avatar sx={{ bgcolor: 'primary.light' }}>{firstNameInitial}{lastNameInitial}</Avatar>
//             {/* <Avatar sx={{ bgcolor: 'primary.light' }}>AA</Avatar> */}
//             </Button>
//         );
//     }
// };





//Header
export const Header = () => {
    
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    
    
    

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    
    return (
            <React.Fragment >
                <AppBar position='static' >
                    <Toolbar sx={{backgroundColor:'#F3FFD0', justifyContent:'space-between'  }}>
                        <img src={logo} alt="Swargadhi logo" width="30%"/>


                        <Stack direction='row' spacing={1} alignItems='center' >

                            <ResponsiveNav isMatch={isMatch}/>
                            <Button variant='contained' style={{height:'30px', marginLeft:'20px'}}>සිංහල</Button>

                            { isLoggedIn ? (<>
                                <Button>
            <Avatar sx={{ bgcolor: 'success.light', marginLeft:'0px' }}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar>
            
            </Button>
            <IconButton onClick={()=>{navigate('/cart')}} sx={{padding:'0px'}}><ShoppingCartIcon/></IconButton></>
        ): (
                <Button variant='contained' color="success" onClick={()=>navigate('/login')} >Sign In</Button>
            )
                            }



                        </Stack> 
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
}



