import { AppBar, Avatar, IconButton, Stack, Toolbar, Drawer, useMediaQuery, useTheme,Button } from '@mui/material'
import React, { useState } from 'react'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from "@mui/icons-material/Menu";


import { useSelector, useDispatch } from 'react-redux';
import {selectUser, selectIsLoggedIn} from '../redux/slices/userSlice'
import { selectIsSinhalaTrue, setSinhalaTrue, setSinhalaFalse} from '../redux/slices/languageSlice';
import { MotionButton } from './FramerMotion/MotionButton';






export const MultilingualHeader = () => {

    const navigate = useNavigate();
    const isSinhalaTrue = useSelector(selectIsSinhalaTrue);
    

    

   
    return(
    <React.Fragment >
        {isSinhalaTrue ? (
            <>
            <MotionButton variant='text' onClick={()=>{navigate('/')}}>මුල් පිටුව</MotionButton>
        <MotionButton variant='text' onClick={()=>navigate('/shop')}>මිල දී ගන්න</MotionButton>
        <MotionButton variant='text'  onClick={()=>navigate('/dispensary')}>වෛද්‍ය මධ්‍යස්ථානය ගැන</MotionButton>
        <MotionButton variant='text'  onClick={()=>navigate('/about')}>ස්වර්ගධී ගැන</MotionButton>
        <MotionButton variant='text' onClick={()=>navigate('/user')}>මාගේ ගිණුම</MotionButton>
            </>
        ):(
            <>
        <MotionButton variant='text' onClick={()=>{navigate('/')}}>Home</MotionButton>
        <MotionButton variant='text' onClick={()=>navigate('/shop')}>Shop</MotionButton>
        <MotionButton variant='text' onClick={()=>navigate('/dispensary')}>Dispensary</MotionButton>
        <MotionButton variant='text' onClick={()=>navigate('/about')}>About Us</MotionButton>
        <MotionButton variant='text' onClick={()=>navigate('/user')}>My Account</MotionButton>
        </>
    )}


        
    </React.Fragment>
    )
}





//Responsive Navigation Bar Component
export const ResponsiveNav = (props) =>{
    
    const [openDrawer, setOpenDrawer] = useState(false);

    if(props.isMatch===true){
        return (
            <React.Fragment>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}>
            <Stack direction='column' >
                <MultilingualHeader/>
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
                <MultilingualHeader/>
            </Stack>
        );
    }

}




//Header
export const Header = () => {
    
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const isSinhalaTrue = useSelector(selectIsSinhalaTrue);
    
    

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    
    return (
        <React.Fragment >
            <AppBar position='static' style={{boxShadow:'none'}} >
                <Toolbar sx={{backgroundColor:'white', justifyContent:'space-between' , }}>
                    <img src={logo} alt="Swargadhi logo" width="30%"/>
                        <Stack direction='row' spacing={1} alignItems='center' >
                            <ResponsiveNav isMatch={isMatch}/>
                            {isSinhalaTrue ? (
                                <MotionButton variant='contained' style={{height:'30px', marginLeft:'20px'}} onClick={()=>dispatch(setSinhalaFalse(false))}>English</MotionButton>
                            ):(
                            <MotionButton variant='contained' style={{height:'30px', marginLeft:'20px'}} onClick={()=>dispatch(setSinhalaTrue(true))}>සිංහල</MotionButton>
                            )
                            }
                            
                            
                            { isLoggedIn ? (
                                <>
                                <MotionButton>
                                <Avatar sx={{ bgcolor: 'success.light', marginLeft:'0px' }}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar>
                                </MotionButton>
                                <MotionButton>
                                <IconButton onClick={()=>{navigate('/cart')}} sx={{padding:'0px'}}><ShoppingCartIcon/></IconButton>
                                </MotionButton>
                                </>
                            ): (
                                <MotionButton variant='contained' color="success" onClick={()=>navigate('/login')} >{isSinhalaTrue ? ("ලොග් වන්න"): ("Sign In")}</MotionButton>
                                )
                            }
                        </Stack> 
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
}



