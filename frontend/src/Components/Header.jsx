import { AppBar, Avatar, IconButton, Stack, Toolbar, Drawer, useMediaQuery, useTheme,Button, Divider, TextField, InputAdornment, Box } from '@mui/material'
import React, { useState } from 'react'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from "@mui/icons-material/Menu";


import { useSelector, useDispatch } from 'react-redux';
import {selectUser, selectIsLoggedIn} from '../redux/slices/userSlice'
import { selectIsSinhalaTrue, setSinhalaTrue, setSinhalaFalse} from '../redux/slices/languageSlice';
import { MotionButton } from './FramerMotion/MotionButton';
import SearchIcon from '@mui/icons-material/Search';
import { Search } from '../Pages/Search/Search';




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
    const dispatch = useDispatch();
    const isSinhalaTrue = useSelector(selectIsSinhalaTrue);

    if(props.isMatch===true){
        return (
            <React.Fragment>
            <Drawer
            PaperProps={{
                sx: { width: {xs:'50%', md:'40%'} },
            }}
                
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}>
            <Stack direction='column'  >
                <MultilingualHeader />
                <Divider />
                {isSinhalaTrue ? (
                                <MotionButton variant='contained' style={{height:'30px' , width:'100px'}} onClick={()=>dispatch(setSinhalaFalse(false))}>English</MotionButton>
                            ):(
                            <MotionButton variant='contained' style={{height:'30px', width:'100px'}} onClick={()=>dispatch(setSinhalaTrue(true))}>සිංහල</MotionButton>
                            )
                            }
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
            <Stack direction='row' alignItems='center'  >
                <MultilingualHeader/>
                {isSinhalaTrue ? (
                                <MotionButton variant='contained' style={{height:'30px', marginLeft:'20px'}} onClick={()=>dispatch(setSinhalaFalse(false))}>English</MotionButton>
                            ):(
                            <MotionButton variant='contained' style={{height:'30px', marginLeft:'20px'}} onClick={()=>dispatch(setSinhalaTrue(true))}>සිංහල</MotionButton>
                            )
                            }
            </Stack>
        );
    }

}






//Header
export const Header = () => {
    
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);
    const isSinhalaTrue = useSelector(selectIsSinhalaTrue);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        
        navigate(`/search?query=${searchValue}`);
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    
    return (
        <React.Fragment >
            <AppBar position='static' style={{boxShadow:'none', backgroundColor:'white',}} >
                <Toolbar  sx={{ m:'10px 0 0 0'}}>
                    <Stack direction='row' sx={{ justifyContent:'space-between' , alignItems:'center', m:'10px 0 0 0'}}>
                    <Box width={{xs:'50%', sm:'40%', md:'30%'}}>
                    <img src={logo} alt="Swargadhi logo" width='100%'/>
                        </Box>
                        <Stack alignItems='end' >
                        <Stack direction='row' spacing={1}  >
                            <ResponsiveNav isMatch={isMatch}/>
                            
                            
                            
                            { isLoggedIn ? (
                                <>
                                <MotionButton>
                                <Avatar sx={{ bgcolor: 'success.light', marginLeft:'0px' }}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar>
                                </MotionButton>
                                <MotionButton onClick={()=>{navigate('/cart')}} >
                                <IconButton sx={{padding:'0px'}}><ShoppingCartIcon/></IconButton>
                                </MotionButton>
                                </>
                            ): (
                                <MotionButton variant='contained' color="success" onClick={()=>navigate('/login')} >{isSinhalaTrue ? ("ලොග් වන්න"): ("Sign In")}</MotionButton>
                                )
                            }
                        </Stack> 
                        <TextField
                        sx={{width:'250px', m:'10px' , display:{xs:'none', sm:'block'}}}
                        
          id="standard-search"
          placeholder='Search'
          type="search"
          variant="standard"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{endAdornment:<InputAdornment p='0px' position='start'><Button m='0px' p='0px'
            onClick={() => handleSearch(searchValue)}><SearchIcon/></Button></InputAdornment>}}
        />
                        </Stack>

                    </Stack>
</Toolbar>
                    <TextField
                        sx={{width:'60%', m:' 10px auto ' , display:{xs:'block', sm:'none'}}}
                        
          id="standard-search"
          placeholder='Search'
          type="search"
          variant="standard"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{endAdornment:<InputAdornment p='0px' position='start'><Button m='0px' p='0px'
            onClick={() => handleSearch(searchValue)}><SearchIcon/></Button></InputAdornment>}}
        />
                    
                </AppBar>
            </React.Fragment>
        )
}



