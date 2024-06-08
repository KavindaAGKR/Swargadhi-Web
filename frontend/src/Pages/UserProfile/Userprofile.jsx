
import React, { useState } from 'react';
import { Button, Typography, Avatar, Stack, Grid, Tab, Box, Popover } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { selectUser, selectIsLoggedIn } from '../../redux/slices/userSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { UserOrders } from './UserOrders';
import { Feedbacks } from './Feedbacks';
import { ViewDetails } from './ViewDetails';
import { useLocation } from 'react-router-dom';
import { SupplyMaterial } from './SupplyMaterial';



export const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);


    const [openPop, setOpenPop] = useState(false);
    

    const handleSignOut = () => {
        dispatch(logout());
    };


    const location = useLocation();
    const selectFromState = location.state?.select || 'userDetails';

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


    return (
        <React.Fragment>
            <Header />
            <Stack  alignItems='center' sx={{minHeight:'500px', mt:'50px'}}>
                {/* <Stack direction='row' margin="0px 0 25px 0" color='green'>
                    <PersonOutlineIcon sx={{ fontSize: '40px' }} />
                    <Typography variant='h4' margin='auto'>
                        My Account
                    </Typography>
                </Stack> */}
                {isLoggedIn ? (
                    


<Stack direction='row' sx={{   display: 'flex',  width:'100%'}}>



<Button sx={{height:' 40px'}}  aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
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
                        <TabList
                            onChange={handleChange}
                            orientation="vertical"
                            
                            scrollButtons
                            allowScrollButtonsMobile
                            
                            variant="fullWidth"
                            
                        >
                            <Tab  label='My Details' value='userDetails'  />
                            <Tab  label='My Orders' value='userOrders' />
                            <Tab label='Supply Material ' value='supply' />
                            <Tab label='Send Feedback' value='feedback' />
                            
                            <Button
                            sx={{width:'100px'}}
                            variant="contained"
                            color="error"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                            
                        </TabList>
</Popover>


                    
                    <TabPanel value='userDetails' sx={{width:'75%', padding:'0px'}}  >
                    <ViewDetails userId={user._id} user={user}/>
                    </TabPanel>
                    <TabPanel value='userOrders' sx={{width:'75%',padding:'0px'}}>
                    <UserOrders userId={user._id}/>
                    </TabPanel>
                    <TabPanel value='supply' sx={{width:'75%',padding:'0px'}}>
                    <SupplyMaterial userId={user._id}/>
                    </TabPanel>
                    <TabPanel value='feedback' sx={{width:'75%',padding:'0px'}}>
                    <Feedbacks user={user}/>
                    </TabPanel>
                    
                    
                
                </TabContext>
            </Stack>


                        
                        
                        
                        
                    
                ) : (
                    <Typography variant="body1" sx={{ minHeight: '400px' }}>
                        Please <a href="/login">login</a> to view your details.
                    </Typography>
                )}
            </Stack>
            <Footer />
        </React.Fragment>
    );
};
