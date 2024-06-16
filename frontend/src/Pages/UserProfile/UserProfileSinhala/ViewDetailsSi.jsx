import React, { useState, useEffect } from 'react';
import { Button, Typography, Avatar, Stack, Grid, Box } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';
import EditProfileDialogSi from './EditUserSi';
import ErrorIcon from '@mui/icons-material/Error';

const detailStyles = {
    boxShadow: '2px 2px 5px 1px #D6D3D2',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '5px 10px',
    fontWeight: '10px',
    alignSelf:'center',
    textAlign:'auto'
    
};




export const ViewDetailsSi = ({userId}) => {

    const user = useSelector(selectUser)

    const [profilePicture, setProfilePicture] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(user);



    useEffect(() => {
        fetchUserProfile();
    }, []);
    useEffect(() => {
        setUserDetails(user);
    }, [user]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`);
            setProfilePicture(response.data.profilePicture);
            
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };


    const handleUploadProfilePicture = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('No profile picture selected');
            return;
        }

        setProfilePicture(file); 

        const formData = new FormData();
        formData.append('profilePicture', file);
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
            fetchUserProfile(); 
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
                setProfilePicture(null); 
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
                <Box sx={{borderRadius:'100px', width: { xs: '100px', sm: '150px' }, height: { xs: '100px', sm: '150px' }, margin: '25px auto' }}>
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
                <Avatar sx={{ width: { xs: '100px', sm: '150px' }, height: { xs: '100px', sm: '150px' }, margin: '25px auto' }}>
                    {`${userDetails.firstName.charAt(0)}${userDetails.lastName.charAt(0)}`}
                </Avatar>
            );
        }
    };




  return (
    <Stack sx={{margin:'0 15px'}} alignSelf='center'>
        <Typography variant='h5'  >මගේ විස්තර</Typography>
    <Stack  sx={{ width: '100%',margin:'auto' }} justifyContent='center' alignItems='center' alignSelf='center'>
    {(userDetails.mobileNumber==undefined || (userDetails.deliveryAddress==undefined || userDetails.deliveryAddress==null))?(
            <Stack direction='row' sx={{margin:'40px 0'}}><ErrorIcon color='error'/><Typography variant='body' color="error" textAlign='left' >ඔබේ ගිණුමේ පහත සියළු විස්තර සම්පූර්ණ කිරීමෙන් නිෂ්පාදන මිලදී ගැනීමේදී සිදු විය හැකි අවහිරතා මගහරවා ගත හැකි වේවි.</Typography>
            </Stack>):("")}
            <Stack sx={{ width: '90%',    }}>
                {renderAvatar()}
                
                <Stack direction={{xs:'column', md:"row"}} spacing={2} margin='25px auto' textAlign='center'>
      <Button
        variant="outlined"
        component="label"
      >
        පින්තූරයක් ‍යොදන්න
        <input
          accept=".png, .jpg, .jpeg"
          type="file"
          style={{ display: 'none' }}
          onChangeCapture={handleUploadProfilePicture}
        />
      </Button>
      {profilePicture && (
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteProfilePicture}
        >
          පින්තූරය මකන්න
        </Button>
      )}
    </Stack>
                
                
            </Stack>
            <Stack sx={{ width:{xs:'100%', md:'90%'},borderRadius:'15px', backgroundColor: '#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin: '0px' }}>
                <Stack sx={{ margin: '25px 10px' }}>
                    <Grid container spacing={0} rowGap={5} columnGap={1} sx={{ fontWeight: 'bold', }}>
                        <Grid item xs={3.5} sm={2.3} alignSelf='center'>මුල් නම:</Grid>
                        <Grid item sm={2.8} xs={8} sx={{ ...detailStyles, alignSelf:'center' }}>{userDetails.firstName}</Grid>
                        <Grid item sm={1} sx={{display:{xs:'none', sm:'block'}}}/>
                        <Grid item xs={3.5} sm={2.3}  alignSelf='center'>අවසාන නම:</Grid>
                        <Grid item sm={2.8} xs={8} sx={{ ...detailStyles }}>{userDetails.lastName}</Grid>
                        <Grid item xs={3.5} sm={2.3}  alignSelf='center'>විද්යුත් තැපෑල:</Grid>
                        <Grid item xs={8} sx={{ ...detailStyles }}>{userDetails.email}</Grid>
                        <Grid item xs={3.5} sm={2.3} alignSelf='center'>දුරකථන අංකය:</Grid>
                        <Grid item sm={3.5} xs={7} sx={{ ...detailStyles }}>{userDetails.mobileNumber}</Grid>
                        <Grid item container rowGap={2} columnGap={1}>ලිපිනය:
                            <Grid item xs={10} />
                            <Grid item sm={2.3} alignSelf='center'>පළමු පේලිය:</Grid>
                            <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{userDetails.deliveryAddress?.addressL1 || "-----"}</Grid>
                            <Grid item sm={2.3} alignSelf='center'>දෙවන පේලිය:</Grid>
                            <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{userDetails.deliveryAddress?.addressL2 || "-----"}</Grid>
                            <Grid item sm={2.3} alignSelf='center'>තෙවන පේලිය:</Grid>
                            <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{userDetails.deliveryAddress?.addressL3 || "-----"}</Grid>
                        </Grid>
                    </Grid>
                </Stack>
            </Stack>
        </Stack>
        <Button
            variant="contained"
            sx={{m:'25px auto'}}
            onClick={handleEditProfile}
        >
            විස්තර වෙනස් කරන්න
        </Button>
        <EditProfileDialogSi 
            open={editDialogOpen} 
            handleClose={handleCloseEditDialog} 
            userDetails={userDetails} 
        />
    </Stack>
  )
}
