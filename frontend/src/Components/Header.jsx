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
import { HeaderUser } from './Header/HeaderUser';




export const MultilingualHeader = () => {

    const navigate = useNavigate();
    const isSinhalaTrue = useSelector(selectIsSinhalaTrue);
    

    


    return(
    <React.Fragment >
        {isSinhalaTrue ? (
            <Stack direction={{md:'row'}}   gap={3}>
            <MotionButton variant='text'  onClick={()=>{navigate('/')}}>මුල් පිටුව</MotionButton>
        <MotionButton variant='text'  onClick={()=>navigate('/shop')}>මිල දී ගන්න</MotionButton>
        <MotionButton variant='text'  onClick={()=>navigate('/dispensary')}>වෛද්‍ය මධ්‍යස්ථානය ගැන</MotionButton>
        <MotionButton variant='text'  onClick={()=>navigate('/about')}>ස්වර්ගධී ගැන</MotionButton>
            </Stack>
        ):(
            <Stack direction={{md:'row'}}   gap={3}>
        <MotionButton variant='text' onClick={()=>{navigate('/')}}>Home</MotionButton>
        <MotionButton variant='text' onClick={()=>navigate('/shop')}>Shop</MotionButton>
        <MotionButton variant='text' onClick={()=>navigate('/dispensary')}>Dispensary</MotionButton>
        <MotionButton variant='text' onClick={()=>navigate('/about')}>About Us</MotionButton>
        </Stack>
    )}


        
    </React.Fragment>
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
                                <MotionButton variant='contained' stylee={{height:'50px' , width:'150px', m:'auto'}} onClick={()=>dispatch(setSinhalaFalse(false))}>English</MotionButton>
                            ):(
                            <MotionButton variant='contained' stylee={{height:'50px', width:'150px', m:'auto'}} onClick={()=>dispatch(setSinhalaTrue(true))}>සිංහල</MotionButton>
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
            <Stack direction='row' alignItems='center'   >
                <MultilingualHeader/>
                {isSinhalaTrue ? (
                                <MotionButton variant='contained' stylee={{height:'35px',width:'70px', marginLeft:'20px', padding:'100px'}} onClick={()=>dispatch(setSinhalaFalse(false))}>English</MotionButton>
                            ):(
                            <MotionButton variant='contained' stylee={{height:'35px',width:'70px', marginLeft:'20px', padding:'10px'}} onClick={()=>dispatch(setSinhalaTrue(true))}>සිංහල</MotionButton>
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
            <Stack position='static' sx={{ backgroundColor:'white', margin:'5px'}} >
                <Stack  >
                    <Stack direction='row' sx={{ justifyContent:'space-between' , alignItems:'start', m:'10px 0 0 0'}}>
                    <Button onClick={()=>navigate('/')} sx={{width:{xs:'150px', sm:'250px', md:'250px', lg:'300px'}, padding:'0px', margin:'0px'}}>
                    <img src={logo} alt="Swargadhi logo" width='100%'/>
                        </Button>
                        <Stack alignItems='end' >
                        <Stack direction='row' spacing={1}  >
                            
                            
                            
                            
                            { isLoggedIn ? (
                                <Stack direction={{xs:'column', md:'column-reverse'}} alignItems='end'>
                                    <Stack>
                                    <Stack direction='row' justifyContent='space-between'>
                                <TextField
                        sx={{width:'auto', m:'10px',p:'0px 0px' , display:{xs:'none', sm:'block'}}}
                        
          id="standard-search"
          placeholder='Search Products'
          type="search"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{endAdornment:<InputAdornment sx={{padding:'0px 0px'}} position='end'><Button m='0px' sx={{padding:'0px 0px'}}
            onClick={() => handleSearch(searchValue)}></Button></InputAdornment>}}
        />
                                <Stack>
                                <HeaderUser user={user}/>
                                
                                <MotionButton onClick={()=>{navigate('/cart')}} >
                                <ShoppingCartIcon  sx={{padding:'0px 10px',color:'#838383'  }} fontSize="large"/>
                                </MotionButton>
                                </Stack>
                                </Stack>
                                
                                <ResponsiveNav isMatch={isMatch}/>
                                
                                
                                </Stack>
                                
                                </Stack>
                            ): (
                                <Stack alignItems='end' justifyContent='center'>
                                <Stack direction='row' gap={3} alignItems='center' justifyContent='end' >
                                    
                                    <ResponsiveNav isMatch={isMatch}/>
                                    <MotionButton stylee={{height:'auto', width:'100px', margin:'0px 10px', padding:'10px'}} variant='contained' color="success" onClick={()=>navigate('/login')} >{isSinhalaTrue ? ("ලොග් වන්න"): ("Sign In")}</MotionButton>
                                
                                    </Stack>
                                    <TextField
                        sx={{width:'350px', m:'10px',p:'0px 0px' , display:{xs:'none', sm:'block'}}}
                        
          id="standard-search"
          placeholder='Search Products'
          type="search"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{endAdornment:<InputAdornment position="end" sx={{padding:'0px'}}><Button sx={{padding:'0px'}}
            onClick={() => handleSearch(searchValue)}><SearchIcon edge="end" sx={{padding:'0px'}}/></Button></InputAdornment>}}
        />
                                    </Stack>
                                )
                            }
                        </Stack> 
                        
                        </Stack>

                    </Stack>
                    <TextField
                        sx={{width:'300px',height:'30px', m:'auto', padding:'0px' , display:{xs:'flex',sm:'none' }}}
                        
          id="standard-search"
          placeholder='Search Products'
          type="search"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{endAdornment:<InputAdornment position="end" sx={{padding:'0px'}}><Button sx={{padding:'0px'}}
            onClick={() => handleSearch(searchValue)}><SearchIcon edge="end" sx={{padding:'0px'}}/></Button></InputAdornment>}}
        />
</Stack>
                    {/* <TextField
                        sx={{width:'60%', m:' 10px auto ' , display:{xs:'block', sm:'none'}}}
                        
          id="standard-search"
          placeholder='Search'
          type="search"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{endAdornment:<InputAdornment position="end" sx={{padding:'0px'}}><Button sx={{padding:'0px'}}
            onClick={() => handleSearch(searchValue)}><SearchIcon edge="end" sx={{padding:'0px'}}/></Button></InputAdornment>}}
        /> */}
                    
                </Stack>
            </React.Fragment>
        )
}



