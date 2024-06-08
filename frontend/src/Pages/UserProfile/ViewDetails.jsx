import React, { useState, useEffect } from 'react';
import { Button, Typography, Avatar, Stack, Grid, Box, Dialog, DialogContent, DialogActions } from '@mui/material';
import EditProfileDialog from './EditUser';
import axios from 'axios';
import { makeStyles } from '@mui/styles';


const detailStyles = {
    boxShadow: '2px 2px 5px 1px #D6D3D2',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '5px',
    fontWeight: '10px',
};
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px',
    },
    button: {
        marginTop: '20px',
    },
    form: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
}));




export const ViewDetails = ({userId, user}) => {

    const [profilePicture, setProfilePicture] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(user);
    const [open, setOpen] = useState(false);

    const classes = useStyles();


    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`);
            setProfilePicture(response.data.profilePicture);
            setUserDetails({
                ...user,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };


    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.files[0]);
    };

    const handleUploadProfilePicture = async () => {
        if (!profilePicture) {
            console.error('No profile picture selected');
            return;
        }

        const formData = new FormData();
        formData.append('profilePicture', profilePicture);
        formData.append('userId', userId);

        try {
            const response = await fetch('http://localhost:5000/api/user/picture', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error uploading profile picture: ${errorText}`);
            }

            const data = await response.json();
            console.log(data.message);
            fetchUserProfile(); // Refresh the profile data after upload
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };
    const handleDeleteProfilePicture = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/profile/picture/${userId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error deleting profile picture: ${errorText}`);
            }
    
            const data = await response.json();
    
            if (!data.user.profilePicture) {
                setProfilePicture(null); // Remove the profile picture from the state
            }
    
            console.log(data.message);
        } catch (error) {
            console.error('Error deleting profile picture:', error);
        }
    };
    
    const handleEditProfile = () => {
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const renderAvatar = () => {
        if (profilePicture) {
            return (
                <Box sx={{borderRadius:'100px', width: { xs: '100px', sm: '150px' }, height: { xs: '100px', sm: '150px' }, margin: '10px auto' }}>
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
                <Avatar sx={{ width: { xs: '100px', sm: '150px' }, height: { xs: '100px', sm: '150px' }, margin: '100px auto' }}>
                    {`${userDetails.firstName.charAt(0)}${userDetails.lastName.charAt(0)}`}
                </Avatar>
            );
        }
    };




  return (
    <Stack >
        <Typography variant='h5'>My Details</Typography>
    <Stack  sx={{ width: '90%' }} justifyContent='center' alignItems='center' alignSelf='center'>
            <Stack sx={{ width: '40%',   margin: '20px' }}>
                {renderAvatar()}
                <Button variant='text' onClick={()=>setOpen(true)}>Upload Profile Photo </Button>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    fullWidth
                    maxWidth='md'
                    
                    
                >
                    
                    {renderAvatar()}
                    
                        <Stack justifyContent='center' alignItems='center' gap={3} m='10px'>
                        
                        <Stack direction='row'>
                        <input accept="image/*" type="file" style={{width:'180px'}} onChange={handleProfilePictureChange} />
                <Button
                    className={classes.button}
                    variant="text"
                    color="primary"
                    onClick={handleUploadProfilePicture}
                >
                    Upload
                </Button>
                        </Stack>
                {profilePicture && (
                    <Button
                        className={classes.button}
                        variant='contained'
                        color='error'
                        onClick={handleDeleteProfilePicture}
                    >
                        Delete Profile Picture
                    </Button>
                )}
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                        </Stack>
                    
                </Dialog>

                
            </Stack>
            <Stack sx={{ width:'100%', backgroundColor: '#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin: '20px' }}>
                <Stack sx={{ margin: '25px' }}>
                    <Grid container spacing={1} rowGap={5} columnGap={3} sx={{ fontWeight: 'bold' }}>
                        <Grid item xs={2.2}>First Name:</Grid>
                        <Grid item sm={2.8} xs={8} sx={{ ...detailStyles }}>{userDetails.firstName}</Grid>
                        <Grid item xs={2.2}>Last Name:</Grid>
                        <Grid item sm={2.8} xs={8} sx={{ ...detailStyles }}>{userDetails.lastName}</Grid>
                        <Grid item xs={2.2}>Email:</Grid>
                        <Grid item xs={8} sx={{ ...detailStyles }}>{userDetails.email}</Grid>
                        <Grid item xs={2.2}>Mobile Number:</Grid>
                        <Grid item sm={3} xs={7} sx={{ ...detailStyles }}>{userDetails.mobileNumber}</Grid>
                        <Grid item container gap={2}>Address:
                            <Grid item xs={10} />
                            <Grid item sm={2.2}>Address Line 01:</Grid>
                            <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{userDetails.deliveryAddress?.addressL1}</Grid>
                            <Grid item sm={2.2}>Address Line 02:</Grid>
                            <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{userDetails.deliveryAddress?.addressL2}</Grid>
                            <Grid item sm={2.2}>Address Line 03:</Grid>
                            <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{userDetails.deliveryAddress?.addressL3}</Grid>
                        </Grid>
                    </Grid>
                </Stack>
            </Stack>
        </Stack>
        <Button
            className={classes.button}
            variant="contained"
            sx={{m:'25px auto'}}
            onClick={handleEditProfile}
        >
            Edit Details
        </Button>
        <EditProfileDialog 
            open={editDialogOpen} 
            handleClose={handleCloseEditDialog} 
            userDetails={userDetails} 
        />
    </Stack>
  )
}
