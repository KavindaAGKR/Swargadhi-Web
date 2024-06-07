
// import React, { useState, useEffect } from 'react';
// import { Button, Typography, TextField, Stack, Avatar, Grid } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import axios from 'axios';
// import { Header } from '../../Components/Header';
// import { Footer } from '../../Components/Footer';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../redux/slices/userSlice';
// import { selectUser, selectIsLoggedIn } from '../../redux/slices/userSlice';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import EditProfileDialog from './EditUser';
// import { UserOrders } from './UserOrders';
// import {Feedbacks} from './Feedbacks'

// const detailStyles = {
//     boxShadow: '2px 2px 5px 1px #D6D3D2',
//     backgroundColor: 'white',
//     borderRadius: '10px',
//     padding: '5px',
//     fontWeight: '10px',
// };

// const useStyles = makeStyles((theme) => ({
//     root: {
//         padding: '20px',
//     },
//     button: {
//         marginTop: '20px'
//     },
//     form: {
//         marginTop: '20px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '10px',
//     },
// }));

// export const UserProfile = () => {
//     const dispatch = useDispatch();
//     const user = useSelector(selectUser);
//     const isLoggedIn = useSelector(selectIsLoggedIn);
//     const classes = useStyles();

//     const [profilePicture, setProfilePicture] = useState();
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [userDetails, setUserDetails] = useState(user);

//     useEffect(() => {
//         fetchUserProfile();
        
//     }, []);

//     const fetchUserProfile = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/user/profile/${user._id}`);
//             setProfilePicture(response.data.profilePicture);
//             console.log("image " + response.data.profilePicture)
//         } catch (error) {
//             console.error('Error fetching user profile:', error);
//         }
//     };



//     const handleSignOut = () => {
//         dispatch(logout());
//     };

//     const handleProfilePictureChange = (event) => {
//         setProfilePicture(event.target.files[0]);
//     };

//     const handleUploadProfilePicture = async () => {
//         if (!profilePicture) {
//             console.error('No profile picture selected');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('profilePicture', profilePicture);
//         formData.append('userId', user._id);

//         try {
//             const response = await fetch('http://localhost:5000/api/user/picture', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!response.ok) {
//                 const errorText = await response.text(); 
//                 throw new Error(`Error uploading profile picture: ${errorText}`);
//             }

//             const data = await response.json();
//             console.log(data.message);
//         } catch (error) {
//             console.error('Error uploading profile picture:', error);
//         }
//     };

//     // const getAvatarContent = () => {
//     //     if (profilePicture) {
//     //         return (
//     //             <img
//     //                 src={profilePicture}
                    
//     //                 style={{ width: '100%', height: '120px', borderRadius: '5px' }}
//     //                 onError={(e) => {
//     //                     console.error(`Failed to load image`);
//     //                     e.target.onerror = null;
//     //                 }}
//     //             />
//     //         );
//     //     } else {
//     //         return (
//     //             <Avatar sx={{ width: { xs: '100px', sm: '150px' }, height: { xs: '100px', sm: '150px' }, margin: '100px auto' }}>
//     //               {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`} 
//     //             </Avatar>
//     //         );
//     //     }
//     // };


//     const handleEditProfile = () => {
//         setEditDialogOpen(true);
//     };

//     const handleCloseEditDialog = () => {
//         setEditDialogOpen(false);
//     };


//     return (
//         <React.Fragment>
//             <Header />
//             <Stack justifyContent='center' alignItems='center'>
//                 <Stack direction='row' margin="40px 0 25px 0" color='green'>
//                     <PersonOutlineIcon sx={{ fontSize: '60px' }} />
//                     <Typography variant='h3' margin='auto'>
//                         My Account
//                     </Typography>
//                 </Stack>
//                 {isLoggedIn ? (
//                     <React.Fragment>
//                         <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '90%' }} justifyContent='center' alignItems='center'>
//                             <Stack sx={{ width: '40%', backgroundColor: '#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin: '20px' }}>
//                                 {/* {getAvatarContent()} */}
                                
//                                 {profilePicture? (
//                                     <img
//                 src={profilePicture}
                
//                 style={{ width: '100%', height: '120px', borderRadius: '5px' }}
//                 onError={(e) => {
//                     console.error(`Failed to load image`);
//                     e.target.onerror = null;
//                 }}
//             />
//                                 ):(<Avatar sx={{ width: { xs: '100px', sm: '150px' }, height: { xs: '100px', sm: '150px' }, margin: '100px auto' }}>
//                 {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`} 
//             </Avatar>)}

//                                 <input
//                                     accept="image/*"
                                    
   
//                                     type="file"
//                                     onChange={handleProfilePictureChange}
//                                 />
                                
//                                 <Button
//                                     className={classes.button}
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={handleUploadProfilePicture}
//                                 >
//                                     Upload
//                                 </Button>


//                             </Stack>
//                             <Stack sx={{ width: { xs: '80%', md: '60%' }, backgroundColor: '#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin: '20px' }}>
//                                 <Stack sx={{ margin: '25px' }}>
//                                     <Grid container spacing={1} rowGap={5} columnGap={3} sx={{ fontWeight: 'bold' }}>
//                                         <Grid item xs={2.2}>First Name:</Grid>
//                                         <Grid item sm={2.8} xs={8} sx={{ ...detailStyles }}>{userDetails.firstName}</Grid>
//                                         <Grid item xs={2.2}>Last Name:</Grid>
//                                         <Grid item sm={2.8} xs={8} sx={{ ...detailStyles }}>{userDetails.lastName}</Grid>
//                                         <Grid item xs={2.2}>Email:</Grid>
//                                         <Grid item xs={8} sx={{ ...detailStyles }}>{userDetails.email}</Grid>
//                                         <Grid item xs={2.2}>Mobile Number:</Grid>
//                                         <Grid item sm={3} xs={7} sx={{ ...detailStyles }}>{userDetails.mobileNumber}</Grid>
//                                         <Grid item container gap={2}>Address:
//                                             <Grid item xs={10} />
//                                             <Grid item sm={2.2}>Address Line 01:</Grid>
//                                             <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{userDetails.deliveryAddress?.addressL1}</Grid>
//                                             <Grid item sm={2.2}>Address Line 02:</Grid>
//                                             <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{user.deliveryAddress?.addressL2}</Grid>
//                                             <Grid item sm={2.2}>Address Line 03:</Grid>
//                                             <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{user.deliveryAddress?.addressL3}</Grid>
//                                         </Grid>
//                                     </Grid>
//                                 </Stack>
//                             </Stack>
//                         </Stack>
//                         <Button
//                             className={classes.button}
//                             variant="contained"
//                             color="primary"
//                             onClick={handleEditProfile}
//                         >
//                             Edit Profile
//                         </Button>
//                         <EditProfileDialog 
//                             open={editDialogOpen} 
//                             handleClose={handleCloseEditDialog} 
//                             userDetails={user} 
                            
//                         />
//                         <UserOrders userId={user._id}/>
//                         <Feedbacks user={user}/>
//                         <Button
//                             className={classes.button}
//                             variant="contained"
//                             color="error"
//                             onClick={handleSignOut}
//                         >
//                             Sign Out
//                         </Button>
//                     </React.Fragment>
//                 ) : (
//                     <Typography variant="body1" sx={{ minHeight: '400px' }}>
//                         Please <a href="/login">login</a> to view your details.
//                     </Typography>
//                 )}
//             </Stack>
//             <Footer />
//         </React.Fragment>
//     );
// };








import React, { useState, useEffect } from 'react';
import { Button, Typography, Avatar, Stack, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { selectUser, selectIsLoggedIn } from '../../redux/slices/userSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditProfileDialog from './EditUser';
import { UserOrders } from './UserOrders';
import { Feedbacks } from './Feedbacks';

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

export const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const classes = useStyles();

    const [profilePicture, setProfilePicture] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userDetails, setUserDetails] = useState(user);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/user/profile/${user._id}`);
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

    const handleSignOut = () => {
        dispatch(logout());
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
        formData.append('userId', user._id);

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

    const handleEditProfile = () => {
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const renderAvatar = () => {
        if (profilePicture) {
            return (
                <img
                    src={profilePicture}
                    alt="Profile"
                    style={{ width: '100%', height: '120px', borderRadius: '5px' }}
                    onError={(e) => {
                        console.error('Failed to load image');
                        e.target.onerror = null;
                    }}
                />
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
                        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '90%' }} justifyContent='center' alignItems='center'>
                            <Stack sx={{ width: '40%', backgroundColor: '#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin: '20px' }}>
                                {renderAvatar()}
                                <input accept="image/*" type="file" onChange={handleProfilePictureChange} />
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUploadProfilePicture}
                                >
                                    Upload
                                </Button>
                            </Stack>
                            <Stack sx={{ width: { xs: '80%', md: '60%' }, backgroundColor: '#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin: '20px' }}>
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
                            color="primary"
                            onClick={handleEditProfile}
                        >
                            Edit Profile
                        </Button>
                        <EditProfileDialog 
                            open={editDialogOpen} 
                            handleClose={handleCloseEditDialog} 
                            userDetails={userDetails} 
                        />
                        <UserOrders userId={user._id}/>
                        <Feedbacks user={user}/>
                        <Button
                            className={classes.button}
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
