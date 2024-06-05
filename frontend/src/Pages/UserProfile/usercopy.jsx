
import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Stack, Avatar, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice'; 
import { selectUser, selectIsLoggedIn } from '../../redux/slices/userSlice';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const detailStyles = {
    boxShadow: '2px 2px 5px 1px #D6D3D2',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding:'5px',
    fontWeight:'10px',
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px',
    },
    button: {
        marginTop: '20px'
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
    const [feedback, setFeedback] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchUserOrders();
        fetchUserFeedback();
    }, []);

    const fetchUserOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/orders/user/${user._id}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching user orders:', error);
        }
    };

    const fetchUserFeedback = async () => {
        // Fetch user feedback logic here
    };

    const handleSubmitFeedback = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/feedback/', { givenBy: user._id, feedBack: feedback });
            console.log(response.data.message);
            fetchUserFeedback();
            setFeedback('');
            
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const handleSignOut = () => {
        dispatch(logout());
    };

    return (
        <React.Fragment>
            <Header />
            <Stack justifyContent='center' alignItems='center'>
                <Stack direction='row' margin="40px 0 25px 0" color='green'>
                    <PersonOutlineIcon sx={{fontSize:'60px'}} />
                    <Typography variant='h3' margin='auto'>
                        My Account
                    </Typography>
                </Stack>
                {isLoggedIn ? (
                    <React.Fragment>
                        <Stack direction={{xs:'column', md:'row'}} sx={{width:'90%'}} justifyContent='center' alignItems='center'>
                            <Stack sx={{width:'40%', backgroundColor:'#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin:'20px'}}>
                                <Avatar sx={{width:{xs:'100px', sm:'150px'}, height:{xs:'100px', sm:'150px'}, margin:'100px auto'}}> {user.firstName.charAt(0)}{user.lastName.charAt(0)}</Avatar>
                                <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                        >
                            Edit Profile Photo
                        </Button>
                            </Stack>
                            <Stack sx={{width:{xs:'80%', md:'60%'}, backgroundColor:'#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2',margin:'20px'}}>
                                <Stack sx={{margin:'25px'}}>
                                    <Grid container spacing={1} rowGap={5} columnGap={3} sx={{fontWeight:'bold'}}>
                                        <Grid item xs={2.2}>First Name:</Grid>
                                        <Grid item sm={2.8} xs={8} sx={{...detailStyles}}>{ user.firstName }</Grid>
                                        <Grid item xs={2.2}>Last Name:</Grid>
                                        <Grid item sm={2.8} xs={8} sx={{...detailStyles}}>{user.lastName}</Grid>
                                        <Grid item xs={2.2}>Email:</Grid>
                                        <Grid item xs={8} sx={{...detailStyles}}>{user.email}</Grid>
                                        <Grid item xs={2.2}>Mobile Number:</Grid>
                                        <Grid item sm={3} xs={7} sx={{...detailStyles}}>{user.mobileNumber}</Grid>
                                        <Grid item container gap={2}>Address:
                                            <Grid item xs={10}/>
                                            <Grid item sm={2.2}>Address Line 01:</Grid>
                                            <Grid item sm={8} xs={12} sx={{...detailStyles}}>{user.addressL1}</Grid>
                                            <Grid item sm={2.2}>Address Line 02:</Grid>
                                            <Grid item sm={8} xs={12} sx={{...detailStyles}}>{user.addressL2}</Grid>
                                            <Grid item sm={2.2}>Address Line 03:</Grid>
                                            <Grid item sm={8} xs={12} sx={{...detailStyles}}>{user.addressL3}</Grid>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                        >
                            Edit Profile
                        </Button>
                        <Stack width='80%'>
                            <Typography variant="h5" gutterBottom>Orders</Typography>
                            {orders.length ? (
                                orders.map((order) => (
                                    <div key={order._id}>
        
                                        <Typography variant="body1">Status: {order.orderStatus}</Typography>
                                        <Typography variant="body1">Total Amount: ${order.totalAmount}</Typography>
                                        <Typography variant="body1">Products:</Typography>
                                        <ul>
                                            {order.products.map((product, index) => (
                                                <li key={index}>
                                                    <Typography variant="body2">
                                                        {product.itemName} - {product.buyingCount} x ${product.price}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body1">No order is placed.</Typography>
                            )}
                        </Stack>
                        <Stack width='80%'>
                            <Typography variant="h5" gutterBottom>Feedback</Typography>
                            <Typography variant="h7" gutterBottom>Tell us about your experience with our products!</Typography>
                            <form className={classes.form} onSubmit={handleSubmitFeedback}>
                                <TextField
                                    label="Feedback"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={feedback}
                                    onChange={(event) => setFeedback(event.target.value)}
                                />
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{width:'250px'}}
                                >
                                    Submit Feedback
                                </Button>
                            </form>
                        </Stack>
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
                    <Typography variant="body1" sx={{minHeight:'400px'}}>
                        Please <a href="/login">login</a> to view your details.
                    </Typography>
                )}
            </Stack>
            <Footer />
        </React.Fragment>
    );
};



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

// const detailStyles = {
//     boxShadow: '2px 2px 5px 1px #D6D3D2',
//     backgroundColor: 'white',
//     borderRadius: '10px',
//     padding: '5px',
//     fontWeight: 'bold',
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
//     const [feedback, setFeedback] = useState('');
//     const [orders, setOrders] = useState([]);
//     const [profile, setProfile] = useState(null);
//     const [editMode, setEditMode] = useState(false);
//     const [editedProfile, setEditedProfile] = useState({
//         mobileNumber: '',
//         deliveryAddress: {
//             addressL1: '',
//             addressL2: '',
//             addressL3: '',
//         },
//     });

//     useEffect(() => {
//         fetchUserOrders();
//         fetchUserFeedback();
//         fetchUserProfile();
//     }, []);

//     const fetchUserOrders = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/orders/orders/user/${user._id}`);
//             setOrders(response.data);
//         } catch (error) {
//             console.error('Error fetching user orders:', error);
//         }
//     };

//     const fetchUserFeedback = async () => {
//         // Fetch user feedback logic here
//     };

//     const fetchUserProfile = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/profile/${user._id}`);
//             setProfile(response.data);
//         } catch (error) {
//             console.error('Error fetching user profile:', error);
//         }
//     };

//     const handleSubmitFeedback = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5000/api/feedback/', { givenBy: user._id, feedBack: feedback });
//             console.log(response.data.message);
//             fetchUserFeedback();
//             setFeedback('');
            
//         } catch (error) {
//             console.error('Error submitting feedback:', error);
//         }
//     };

//     const handleSignOut = () => {
//         dispatch(logout());
//     };

//     const handleEditProfile = () => {
//         setEditMode(true);
//         // Initialize editedProfile with current profile data
//         setEditedProfile({
//             mobileNumber: profile?.mobileNumber || '',
//             deliveryAddress: {
//                 addressL1: profile?.deliveryAddress?.addressL1 || '',
//                 addressL2: profile?.deliveryAddress?.addressL2 || '',
//                 addressL3: profile?.deliveryAddress?.addressL3 || '',
//             },
//         });
//     };

//     const handleCancelEdit = () => {
//         setEditMode(false);
//         setEditedProfile({
//             mobileNumber: '',
//             deliveryAddress: {
//                 addressL1: '',
//                 addressL2: '',
//                 addressL3: '',
//             },
//         });
//     };

//     const handleSaveProfile = async () => {
//         try {
//             const response = await axios.put(`http://localhost:5000/api/profile/${user._id}`, editedProfile);
//             console.log('Profile updated:', response.data);
//             setProfile(response.data);
//             setEditMode(false);
//         } catch (error) {
//             console.error('Error saving profile:', error);
//         }
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setEditedProfile((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleAddressChange = (event) => {
//         const { name, value } = event.target;
//         setEditedProfile((prevState) => ({
//             ...prevState,
//             deliveryAddress: {
//                 ...prevState.deliveryAddress,
//                 [name]: value,
//             },
//         }));
//     };

//     if (!isLoggedIn) {
//         return (
//             <React.Fragment>
//                 <Header />
//                 <Typography variant="body1" sx={{ minHeight: '400px' }}>
//                     Please <a href="/login">login</a> to view your details.
//                 </Typography>
//                 <Footer />
//             </React.Fragment>
//         );
//     }

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
//                 <Stack direction={{ xs: 'column', md: 'row' }} sx={{ width: '90%' }} justifyContent='center' alignItems='center'>
//                     <Stack sx={{ width: { xs: '40%', sm: '150px' }, backgroundColor: '#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin: '20px' }}>
//                         <Avatar sx={{ width: { xs: '100px', sm: '150px' }, height: { xs: '100px', sm: '150px' }, margin: '100px auto' }}>
//                             {profile && profile.images.length > 0 ? (
//                                 <img src={profile.images[0]} alt="User Avatar" />
//                             ) : (
//                                 user.firstName.charAt(0).toUpperCase()
//                             )}
//                         </Avatar>
//                     </Stack>
//                     <Stack sx={{ width: { xs: '80%', md: '60%' }, backgroundColor: '#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin: '20px' }}>
//                         {editMode ? (
//                             <Stack sx={{ margin: '25px' }}>
//                                 <TextField
//                                     label="Mobile Number"
//                                     variant="outlined"
//                                     name="mobileNumber"
//                                     value={editedProfile.mobileNumber}
//                                     onChange={handleInputChange}
//                                 />
//                                 <Grid container gap={2}>Address:
//                                     <Grid item xs={10} />
//                                     <TextField
//                                         label="Address Line 01"
//                                         variant="outlined"
//                                         name="addressL1"
//                                         value={editedProfile.deliveryAddress.addressL1}
//                                         onChange={handleAddressChange}
//                                     />
//                                     <TextField
//                                         label="Address Line 02"
//                                         variant="outlined"
//                                         name="addressL2"
//                                         value={editedProfile.deliveryAddress.addressL2}
//                                         onChange={handleAddressChange}
//                                     />
//                                     <TextField
//                                         label="Address Line 03"
//                                         variant="outlined"
//                                         name="addressL3"
//                                         value={editedProfile.deliveryAddress.addressL3}
//                                         onChange={handleAddressChange}
//                                     />
//                                 </Grid>
//                                 <Button
//                                     className={classes.button}
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={handleSaveProfile}
//                                 >
//                                     Save Profile
//                                 </Button>
//                                 <Button
//                                     className={classes.button}
//                                     variant="contained"
//                                     color="default"
//                                     onClick={handleCancelEdit}
//                                 >
//                                     Cancel
//                                 </Button>
//                             </Stack>
//                         ) : (
//                             <Stack sx={{ margin: '25px' }}>
//                                 <Grid container spacing={1} rowGap={5} columnGap={3} sx={{ fontWeight: 'bold' }}>
//                                     <Grid item xs={2.2}>First Name:</Grid>
//                                     <Grid item sm={2.8} xs={8} sx={{ ...detailStyles }}>{user.firstName}</Grid>
//                                     <Grid item xs={2.2}>Last Name:</Grid>
//                                     <                                    Grid item sm={2.8} xs={8} sx={{ ...detailStyles }}>{user.lastName}</Grid>
//                                     <Grid item xs={2.2}>Email:</Grid>
//                                     <Grid item xs={8} sx={{ ...detailStyles }}>{user.email}</Grid>
//                                     <Grid item xs={2.2}>Mobile Number:</Grid>
//                                     <Grid item sm={3} xs={7} sx={{ ...detailStyles }}>{profile && profile.mobileNumber}</Grid>
//                                     <Grid item container gap={2}>Address:
//                                         <Grid item xs={10} />
//                                         <Grid item sm={2.2}>Address Line 01:</Grid>
//                                         <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{profile && profile.deliveryAddress.addressL1}</Grid>
//                                         <Grid item sm={2.2}>Address Line 02:</Grid>
//                                         <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{profile && profile.deliveryAddress.addressL2}</Grid>
//                                         <Grid item sm={2.2}>Address Line 03:</Grid>
//                                         <Grid item sm={8} xs={12} sx={{ ...detailStyles }}>{profile && profile.deliveryAddress.addressL3}</Grid>
//                                     </Grid>
//                                 </Grid>
//                                 <Button
//                                     className={classes.button}
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={handleEditProfile}
//                                 >
//                                     Edit Profile
//                                 </Button>
//                             </Stack>
//                         )}
//                     </Stack>
//                 </Stack>
//                 <Stack width='80%'>
//                     <Typography variant="h5" gutterBottom>Orders</Typography>
//                     {orders.length ? (
//                         orders.map((order) => (
//                             <div key={order._id}>
//                                 <Typography variant="body1">Status: {order.orderStatus}</Typography>
//                                 <Typography variant="body1">Total Amount: ${order.totalAmount}</Typography>
//                                 <Typography variant="body1">Products:</Typography>
//                                 <ul>
//                                     {order.products.map((product, index) => (
//                                         <li key={index}>
//                                             <Typography variant="body2">
//                                                 {product.itemName} - {product.buyingCount} x ${product.price}
//                                             </Typography>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))
//                     ) : (
//                         <Typography variant="body1">No order is placed.</Typography>
//                     )}
//                 </Stack>
//                 <Stack width='80%'>
//                     <Typography variant="h5" gutterBottom>Feedback</Typography>
//                     <Typography variant="h7" gutterBottom>Tell us about your experience with our products!</Typography>
//                     <form className={classes.form} onSubmit={handleSubmitFeedback}>
//                         <TextField
//                             label="Feedback"
//                             variant="outlined"
//                             multiline
//                             rows={4}
//                             value={feedback}
//                             onChange={(event) => setFeedback(event.target.value)}
//                         />
//                         <Button
//                             className={classes.button}
//                             variant="contained"
//                             color="primary"
//                             type="submit"
//                             sx={{ width: '250px' }}
//                         >
//                             Submit Feedback
//                         </Button>
//                     </form>
//                 </Stack>
//                 <Button
//                     className={classes.button}
//                     variant="contained"
//                     color="error"
//                     onClick={handleSignOut}
//                 >
//                     Sign Out
//                 </Button>
//             </Stack>
//             <Footer />
//         </React.Fragment>
//     );
// };

