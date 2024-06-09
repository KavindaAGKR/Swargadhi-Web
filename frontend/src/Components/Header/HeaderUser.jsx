import React, { useEffect, useState } from 'react';
import { Button, Typography, Stack, Popover, IconButton, Avatar, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/userSlice';

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import axios from 'axios';

export const HeaderUser = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [profilePicture, setProfilePicture] = useState(null);


    useEffect(() => {
        fetchUserProfile();
    }, []);
    
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/profile/${user._id}`);
            setProfilePicture(response.data.profilePicture);
            
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleSignOut = () => {
        dispatch(logout());
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
                <Box sx={{borderRadius:'100px', width:'50px', height:'50px', margin: '10px auto' }}>
                    <img
                    src={profilePicture}
                    alt="Profile"
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
                <Avatar sx={{ bgcolor: 'success.light', marginLeft:'0px' }}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar>
            );
        }
    };

    return (
        <Stack  aria-describedby={id}>
            <Button  sx={{ width: '100%', color:'black' }} variant="text" onClick={handleClick}>
            {renderAvatar()}
                <Stack direction='row' ><Typography fontSize="12px" width="70px" m='0px 5px'>Account & Orders</Typography><ExpandMoreRoundedIcon/></Stack>
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
                <Stack width='200px'>
                    <Button variant="text" onClick={() => navigate('/user', { state: { select: "MyDetails" } })}>My Details</Button>
                    <Button variant="text" onClick={() => navigate('/user', { state: { select: 'MyOrders' } })}>My Orders</Button>
                    <Button variant="text" onClick={() => navigate('/user', { state: { select: 'Supply' } })}>Supply Material</Button>
                    <Button variant="text" onClick={() => navigate('/user', { state: { select: 'Feedback' } })}>Send Feedback</Button>
                    <Button sx={{ width: '150px', m: '16px' }} variant="contained" color="error" onClick={handleSignOut}>Sign Out</Button>
                </Stack>
            </Popover>
        </Stack>
    );
};
