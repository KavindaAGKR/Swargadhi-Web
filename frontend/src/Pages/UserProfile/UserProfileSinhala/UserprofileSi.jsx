import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Typography,  Stack, Tab, Box, Popover, IconButton, Breadcrumbs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Header } from '../../../Components/Header';
import { Footer } from '../../../Components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import { selectUser, selectIsLoggedIn } from '../../../redux/slices/userSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {  FeedbacksSi } from './FeedbacksSi';
import { ViewDetailsSi } from './ViewDetailsSi';
import { useLocation } from 'react-router-dom';
import {  SupplyMaterialSi } from './SupplyMaterialSi';
import MenuIcon from '@mui/icons-material/Menu';
import { UserOrdersSi } from './UserOrdersSi';

export const UserProfileSi = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const handleSignOut = () => {
        dispatch(logout());
    };

    const location = useLocation();
    const selectFromState = location.state?.select || 'MyDetails';

    const [value, setValue] = useState(selectFromState);

    useEffect(() => {
        setValue(selectFromState);
    }, [selectFromState]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setAnchorEl(null);
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const ResponsiveTab = () => {
        return (
            <TabList
                onChange={handleChange}
                orientation="vertical"
                scrollButtons
                allowScrollButtonsMobile
                sx={{ width: '200px', m: 'auto 10px' }}
                variant="fullWidth"
            >
                <Tab label='මගේ විස්තර' value='MyDetails' sx={{ alignSelf: 'start' }} />
                <Tab label='මගේ ඇණවුම්' value='MyOrders' sx={{ alignSelf: 'start' }} />
                <Tab label='අමුද්‍රව්‍ය සපයන්න' value='Supply' sx={{ alignSelf: 'start' }} />
                <Tab label='අදහස් දක්වන්න' value='Feedback' sx={{ alignSelf: 'start' }} />

                <Button
                    sx={{ width: '100px', m: '16px' }}
                    variant="contained"
                    color="error"
                    onClick={handleSignOut}
                >
                    ඉවත් වන්න
                </Button>
            </TabList>
        )
    }


    const sinhalaState = () => {
        switch(value){
            case("MyDetails"): 
                return "මගේ විස්තර" ;
            case("MyOrders"):
                return "මගේ ඇණවුම්";
            case('Supply'):
                return 'අමුද්‍රව්‍ය සපයන්න';
                case('Feedback'):
                return 'අදහස් දක්වන්න';

        }
    }




    return (
        <React.Fragment>
            <Header />
            <Breadcrumbs aria-label="breadcrumb" sx={{marginLeft:'15px'}}>
            <Typography color="#9A9A9A" component={Link} to="/" sx={{ textDecoration: 'none',fontSize:'13px' }}>
            මුල් පිටුව
            </Typography>
            <Typography color="#9A9A9A" component={Link} to="/user" sx={{ textDecoration: 'none',fontSize:'13px' }}>
            මගේ ගිණුම
            </Typography>
            <Typography color="#9A9A9A"  sx={{ textDecoration: 'none',fontSize:'13px' }}>
                {sinhalaState()}
            </Typography>

</Breadcrumbs>
            <Stack direction='row' color='green' sx={{ display: { md: 'none' }, justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
                <PersonOutlineIcon sx={{ fontSize: '40px' }} />
                <Typography variant='h4'>
                මගේ ගිණුම
                </Typography>
            </Stack>
            <Stack alignItems='center' sx={{ minHeight: '500px', mt: '30px' }}>
                {isLoggedIn ? (
                    <Stack direction={{ xs: 'column', md: 'row' }} sx={{ display: 'flex', width: '100%' }}>
                        <IconButton sx={{ display: { xs: 'block', md: 'none', width: '150px', padding:'0px', marginLeft:'25px' } }} aria-describedby={id} variant="contained" onClick={handleClick}>
                            <Stack direction='row' gap={1}><MenuIcon /><Typography>{value}</Typography></Stack>
                        </IconButton>
                        <TabContext value={value}>
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
                                <ResponsiveTab />
                            </Popover>
                            <Stack direction='row' width='100%' >
                            <Stack sx={{ display: { xs: 'none', md: 'block' }, width: '200px', margin:'0px 25px' }}>
                                <ResponsiveTab />
                            </Stack>
                            <Stack margin='10px 10px' sx={{ width: { xs: '100%', md: '100' } }}>
                                <TabPanel value='MyDetails' sx={{ width: '100%', padding: '0px' }}>
                                    <ViewDetailsSi userId={user._id} user={user} />
                                </TabPanel>
                                <TabPanel value='MyOrders' sx={{ width: '100%', padding: '0px' }}>
                                    <UserOrdersSi userId={user._id} />
                                </TabPanel>
                                <TabPanel value='Supply' sx={{ width: '100%', padding: '0px' }}>
                                    <SupplyMaterialSi userId={user._id} />
                                </TabPanel>
                                <TabPanel value='Feedback' sx={{ width: '100%', padding: '0px' }}>
                                    <FeedbacksSi user={user} />
                                </TabPanel>
                            </Stack>
                            </Stack>
                        </TabContext>
                    </Stack>
                ) : (
                    <Typography variant="body1" sx={{ minHeight: '400px' }}>
                        ඔබගේ ගිණුම් විස්තර බැලීම සදහා <a href="/login">ලොග් වන්න</a>.
                        
                    </Typography>
                )}
            </Stack>
            <Footer />
        </React.Fragment>
    );
};
