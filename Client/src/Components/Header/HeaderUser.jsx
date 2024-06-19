import React, { useEffect, useState } from 'react';
import { Button, Typography, Stack, Popover, IconButton, Avatar, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import axios from 'axios';
import config from '../../config';

export const HeaderUser = ({user, isSinhalaTrue}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [profilePicture, setProfilePicture] = useState(null);


    useEffect(() => {
        fetchUserProfile();
    }, []);
    
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${config.baseURL}/api/user/profile/${user._id}`);
            setProfilePicture(response.data.profilePicture);
            
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleSignOut = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    
    const renderAvatar = () => {
        if (profilePicture) {
            return (
                <Box sx={{borderRadius:'100px', width:{xs:'40px', sm:'40px'},height:{xs:'40px', sm:'40px'}, margin: '10px auto' }}>
                    <img
                    src={profilePicture}
                    alt="DP"
                    style={{ width: '100%', height: '100%', borderRadius: '100px' }}
                    onError={(e) => {
                        console.error('Failed to load image');
                        e.target.onerror = null;
                    }}
                />
                </Box>
            );
        } else {
            return (
                <Avatar sx={{ bgcolor: 'success.light', marginLeft:'0px', height:'35px' , width:'35px'}}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar>
            );
        }
    };

    return (
        <Stack  aria-describedby={id}>
            <Button  sx={{ width: '100%', color:'black',padding:{xs:'0px', lg:'0px 15px'} }} variant="text" onClick={handleClick}>
            {renderAvatar()}
                <Stack direction='row' ><Typography sx={{display:{xs:'none', md:'block'},fontSize:"12px", width:"70px", m:'0px' }} >{isSinhalaTrue? "මගේ ගිණුම / ඇණවුම්" :"Account & Orders"}</Typography><ExpandMoreRoundedIcon/></Stack>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                
                {
                    isSinhalaTrue?(
                    <Stack  alignItems='start' gap={1} sx={{ width: '200px', m: '16px' }}>
                    <Button variant="text" sx={{color:'black'}} onClick={() => navigate('/user', { state: { select: "MyDetails" } })}>මගේ විස්තර</Button>
                    <Button variant="text" sx={{color:'black'}} onClick={() => navigate('/user', { state: { select: 'MyOrders' } })}>මගේ ඇණවුම්</Button>
                    <Button variant="text" sx={{color:'black'}} onClick={() => navigate('/user', { state: { select: 'Supply' } })}>අමුද්‍රව්‍ය සපයන්න</Button>
                    <Button variant="text" sx={{color:'black'}} onClick={() => navigate('/user', { state: { select: 'Feedback' } })}>අදහස් දක්වන්න</Button>
                    <Button sx={{ width: '150px' }} variant="contained" color="error" onClick={handleSignOut}>ඉවත් වන්න</Button>
                </Stack>
                    ):(
                        <Stack alignItems='start' gap={1} sx={{ width: '200px', m: '16px' }}>
                    <Button variant="text" sx={{color:'black'}}  onClick={() => navigate('/user', { state: { select: "MyDetails" } })}>My Details</Button>
                    <Button variant="text" sx={{color:'black'}}  onClick={() => navigate('/user', { state: { select: 'MyOrders' } })}>My Orders</Button>
                    <Button variant="text" sx={{color:'black'}}  onClick={() => navigate('/user', { state: { select: 'Supply' } })}>Supply Material</Button>
                    <Button variant="text" sx={{color:'black'}}  onClick={() => navigate('/user', { state: { select: 'Feedback' } })}>Send Feedback</Button>
                    <Button sx={{ width: '150px' }} variant="contained" color="error" onClick={handleSignOut}>Sign Out</Button>
                </Stack>
                    )
                
                }
            </Popover>
        </Stack>
    );
};
