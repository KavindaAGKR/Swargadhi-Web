import { AppBar, Avatar, IconButton, Stack, Toolbar, Drawer, useMediaQuery, useTheme,Button, Divider, TextField, InputAdornment, Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import { useSelector, useDispatch } from 'react-redux';
import {selectUser, selectIsLoggedIn} from '../redux/slices/userSlice'
import { selectIsSinhalaTrue, setSinhalaTrue, setSinhalaFalse} from '../redux/slices/languageSlice';
import { MotionButton } from './FramerMotion/MotionButton';
import SearchIcon from '@mui/icons-material/Search';
import { Search } from '../Pages/Search/Search';
import { HeaderUser } from './Header/HeaderUser';
import { color } from 'framer-motion';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';

export const MultilingualHeader = () => {

    const navigate = useNavigate();
    const isSinhalaTrue = useSelector(selectIsSinhalaTrue);
    

    


    return(
    <Stack justifyContent={{xs:'left', md:'end'}} alignItems={{xs:'start', md:'end'}} >
            {isSinhalaTrue ? (
            <Stack direction={{md:'row'}}  gap={2}  textAlign='start' pl={{xs:'25px', sm:'50px'}}>
            <MotionButton  variant='text' stylee={{color:{xs:'black', md:'white', justifyContent:'left'}}} onClick={()=>{navigate('/')}}><HomeOutlinedIcon sx={{mr:'10px', display:{md:'none'}}}/>මුල් පිටුව</MotionButton>
        <MotionButton variant='text' stylee={{color:{xs:'black', md:'white', justifyContent:'left'}}} onClick={()=>navigate('/shop')}> <ShoppingBagOutlinedIcon sx={{mr:'10px', display:{md:'none'}}}/>මිල දී ගන්න</MotionButton>
        <MotionButton variant='text' stylee={{color:{xs:'black', md:'white', justifyContent:'left'}}} onClick={()=>navigate('/dispensary')}><LocalHospitalOutlinedIcon sx={{mr:'10px', display:{md:'none'}}}/>වෛද්‍ය මධ්‍යස්ථානය ගැන</MotionButton>
        <MotionButton variant='text' stylee={{color:{xs:'black', md:'white', justifyContent:'left'}}} onClick={()=>navigate('/about')}><Diversity3OutlinedIcon sx={{mr:'10px', display:{md:'none'}}}/>ස්වර්ගධී ගැන</MotionButton>
            </Stack>
        ):(
            <Stack direction={{md:'row'}}   gap={2} pl={{xs:'25px', sm:'50px'}}>
        <MotionButton variant='text' stylee={{color:{xs:'black', md:'white', justifyContent:'left'}}} onClick={()=>{navigate('/')}}><HomeOutlinedIcon sx={{mr:'10px', display:{md:'none'}}}/>Home</MotionButton>
        <MotionButton variant='text' stylee={{color:{xs:'black', md:'white', justifyContent:'left'}}} onClick={()=>navigate('/shop')}><ShoppingBagOutlinedIcon sx={{mr:'10px', display:{md:'none'}}}/>Shop</MotionButton>
        <MotionButton variant='text' stylee={{color:{xs:'black', md:'white', justifyContent:'left'}}} onClick={()=>navigate('/dispensary')}><LocalHospitalOutlinedIcon sx={{mr:'10px', display:{md:'none'}}}/>Dispensary</MotionButton>
        <MotionButton variant='text' stylee={{color:{xs:'black', md:'white', justifyContent:'left'}, textAlign:'left'}} onClick={()=>navigate('/about')}><Diversity3OutlinedIcon sx={{mr:'10px', display:{md:'none'}}}/>About Us</MotionButton>
        </Stack>
    )}


        
    </Stack>
    )
}







//Responsive Navigation Bar Component
export const ResponsiveNav = (props) =>{
    
    const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            <Stack direction='column'  gap={5}>
            <Button onClick={()=>navigate('/')} sx={{width:'80%', padding:'0px', margin:'20px auto'}}>
                    <img src={logo} alt="Swargadhi logo" width='100%'/>
                        </Button>
                <MultilingualHeader />
                <Divider />
                {isSinhalaTrue ? (
                                <MotionButton variant='outlined' color='success' stylee={{height:'auto' , width:'150px', m:'auto'}} onClick={()=>dispatch(setSinhalaFalse(false))}>English</MotionButton>
                            ):(
                            <MotionButton variant='outlined' color='success' stylee={{height:'auto', width:'150px', m:'auto'}} onClick={()=>dispatch(setSinhalaTrue(true))}>සිංහල</MotionButton>
                            )
                            }
            </Stack>
            </Drawer>

                <IconButton
                    
                    sx={{ color: "black",margin:'auto 10px' }}
                    onClick={() => setOpenDrawer(!openDrawer)}
                >
                <MenuIcon sx={{fontSize:'35px', color:'white'}} color="white" />
                </IconButton>
            </React.Fragment>
            );
        }
    else{
        return(
            <Stack  marginRight='15px' width="100%"  >
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
    const isSinhalaTrue = useSelector(selectIsSinhalaTrue);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

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
        <Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' p={{xs:'10px 0px', sm:'10px'}}>
                <Button onClick={()=>navigate('/')} sx={{width:{xs:'155px', sm:'250px', md:'250px', lg:'300px'}, padding:'0px', margin:'0px'}}>
                    <img src={logo} alt="Swargadhi logo" width='100%'/>
                </Button>
                <TextField
                    sx={{ m:'10px' , display:{xs:'none', sm:'block'}}}
                    size='small'
                    color='success'
                    id="standard-search"
                    placeholder={isSinhalaTrue ? "නිෂ්පාදන සොයන්න" : "Search Products"}
                    type="search"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{sx: { borderRadius:"50px",width:{md:'350px'},  },endAdornment:<InputAdornment position="end" sx={{padding:'0px'}}><IconButton sx={{padding:'0px'}}
                    onClick={() => handleSearch(searchValue)}><SearchIcon edge="end" sx={{ width:'25px', height:'25px'}}/></IconButton></InputAdornment>}}
                />
                <Stack direction='row' alignItems='center' gap={2}>
                    {isSinhalaTrue ? (
                            <MotionButton variant='outlined'  stylee={{height:'35px',width:'70px', fontSize:'auto' }} color='success' onClick={()=>dispatch(setSinhalaFalse(false))}>English</MotionButton>
                            ):(
                            <MotionButton variant='outlined' stylee={{height:'35px',width:{xs:'60px', sm:'70px'}, fontSize:'auto'}} color='success'  onClick={()=>dispatch(setSinhalaTrue(true))}>සිංහල</MotionButton>
                            )
                    }
                    {
                        isLoggedIn? (<Stack direction='row' gap={1}>
                            <HeaderUser user={user} isSinhalaTrue={isSinhalaTrue} />
                            <MotionButton stylee={{padding:'0px 5px 0px 0px'}} onClick={()=>{navigate('/cart')}} >
                                <ShoppingCartIcon  sx={{color:'#838383', fontSize:'30px' }} />
                            </MotionButton>
                        </Stack>):(
                                <MotionButton stylee={{height:'auto', width:'auto', marginRight:'5px', padding:'5px 5px'}}  variant='contained' color="success" 
                                onClick={()=>navigate('/login')} >{isSinhalaTrue ? (<Typography sx={{fontSize:{xs:'12px', sm:'15px'}}}>ලොග් වන්න</Typography>):
                                 (<Typography sx={{fontSize:{xs:'12px', sm:'15px'}}}>Sign In</Typography>)}</MotionButton>
                            )
                    }
                </Stack>
            </Stack>
            <Stack sx={{backgroundColor:'blue'}} justifyContent='space-between'  direction='row' width='100%'>
                <ResponsiveNav  isMatch={isMatch}/>
                <TextField
                    sx={{ m:'10px' , display:{xs:'block', sm:'none'}}}
                    size='small'
                    color='success'
                    id="standard-search"
                    placeholder={isSinhalaTrue ? "නිෂ්පාදන සොයන්න" : "Search Products"}
                    type="search"
                    variant="outlined"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{sx: { borderRadius:"50px",width:{md:'350px'},backgroundColor:'white',  },endAdornment:<InputAdornment position="end" sx={{padding:'0px'}}><IconButton sx={{padding:'0px'}}
                    onClick={() => handleSearch(searchValue)}><SearchIcon edge="end" sx={{ width:'25px', height:'25px'}}/></IconButton></InputAdornment>}}
                />
            </Stack>
        </Stack>
        
        )
}



