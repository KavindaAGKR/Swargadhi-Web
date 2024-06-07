
import React from 'react';
import { Button, Typography, Avatar, Stack, Grid } from '@mui/material';


import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { selectUser, selectIsLoggedIn } from '../../redux/slices/userSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import { UserOrders } from './UserOrders';
import { Feedbacks } from './Feedbacks';
import { ViewDetails } from './ViewDetails';



export const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    


    const handleSignOut = () => {
        dispatch(logout());
    };








    return (
        <React.Fragment>
            <Header />
            <Stack justifyContent='center' alignItems='center'>
                <Stack direction='row' margin="40px 0 25px 0" color='green'>
                    <PersonOutlineIcon sx={{ fontSize: '60px' }} />
                    <Typography variant='h3' margin='auto'>
                        My Account
                    </Typography>
                </Stack>
                {isLoggedIn ? (
                    <React.Fragment>
                        <ViewDetails userId={user._id}/>
                        <UserOrders userId={user._id}/>
                        <Feedbacks user={user}/>
                        <Button
                            
                            variant="contained"
                            color="error"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    </React.Fragment>
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
