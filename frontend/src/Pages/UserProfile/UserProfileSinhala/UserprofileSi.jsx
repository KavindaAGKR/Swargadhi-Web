
import React, { useState } from 'react';
import { Button, Typography, Avatar, Stack, Grid, Tab, Box, Popover, IconButton } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { selectUser, selectIsLoggedIn } from '../../redux/slices/userSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { UserOrders } from './UserOrders';
import { Feedbacks } from './Feedbacks';
import { ViewDetails } from './ViewDetailsSi';
import { useLocation } from 'react-router-dom';
import { SupplyMaterial } from './SupplyMaterial';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MenuIcon from '@mui/icons-material/Menu';

export const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);


    const [openPop, setOpenPop] = useState(false);
    

    const handleSignOut = () => {
        dispatch(logout());
    };


    const location = useLocation();
    const selectFromState = location.state?.select || 'MyDetails';

    const [value, setValue] = useState(selectFromState);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setAnchorEl(null);
    };


    const handleClosePop = () =>{
        setOpenPop(false)
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const ResponsiveTab = () =>{
        return(
            <TabList
                            onChange={handleChange}
                            orientation="vertical"
                            
                            scrollButtons
                            allowScrollButtonsMobile
                            sx={{width:'200px',m:'auto'}}
                            variant="fullWidth"
                            
                        >
                            <Tab  label='My Details' value='MyDetails' sx={{alignSelf:'start'}} />
                            <Tab  label='My Orders' value='MyOrders' sx={{alignSelf:'start'}}/>
                            <Tab label='Supply Material ' value='Supply' sx={{alignSelf:'start'}}/>
                            <Tab label='Send Feedback' value='Feedback' sx={{alignSelf:'start'}}/>
                            
                            <Button
                            sx={{width:'100px', m:'16px'}}
                            variant="contained"
                            color="error"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                            
                        </TabList>
        )
    }




    return (
        <React.Fragment>
            <Header />
            <Stack direction='row'  color='green' sx={{display:{ md:'none'}, justifyContent:'center',alignItems:'center',  margin:'20px'}}>
                    <PersonOutlineIcon sx={{ fontSize: '40px' }} />
                    <Typography variant='h4'>
                        My Account
                    </Typography>
                    
                </Stack> 
            <Stack  alignItems='center' sx={{minHeight:'500px', mt:'50px'}}>
                
                {isLoggedIn ? (
                    


<Stack direction={{xs:'column',md:'row'}} sx={{   display: 'flex',  width:'100%'}}>



<IconButton sx={{display:{xs:'block', md:'none', width:'100px'}}}  aria-describedby={id} variant="contained" onClick={handleClick}>
        <Stack direction='row' gap={1}><MenuIcon/><Typography>{value}</Typography></Stack>
      </IconButton>
                <TabContext value={value} >
                    

                <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
      >
                        <ResponsiveTab/>
                </Popover>
                    <Box sx={{display:{xs:'none', md:'block'}, width:'25%', }}>
                    <ResponsiveTab />
                    </Box>

                    
                    <Box margin='10px' sx={{width:{xs:'95%',md:'75%'}}}>
                    <TabPanel value='MyDetails' sx={{width:'100%', padding:'0px'}}  >
                    <ViewDetails userId={user._id} user={user}/>
                    </TabPanel>
                    <TabPanel value='MyOrders' sx={{width:'100%',padding:'0px'}}>
                    <UserOrders userId={user._id}/>
                    </TabPanel>
                    <TabPanel value='Supply' sx={{width:'100%',padding:'0px'}}>
                    <SupplyMaterial userId={user._id}/>
                    </TabPanel>
                    <TabPanel value='Feedback' sx={{width:'100%',padding:'0px'}}>
                    <Feedbacks user={user}/>
                    </TabPanel>
                    </Box>
                    
                    
                
                </TabContext>
            </Stack>


                        
                        
                        
                        
                    
                ) : (
                    <>
                    
                <Typography variant="body1" sx={{ minHeight: '400px' }}>
                Please <a href="/login">login</a> to view your details.
            </Typography></>
                    
                )}
            </Stack>
            <Footer />
        </React.Fragment>
    );
};
