import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField, Stack, Avatar, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios'; // Import axios for making HTTP requests
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

    const dispatch = useDispatch(); // Initialize useDispatch hook

    // Retrieve user authentication state
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    


    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);





    const classes = useStyles();
    const [feedback, setFeedback] = useState('');
    // const [userFeedback, setUserFeedback] = useState([]);

    useEffect(() => {
        fetchUserFeedback();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    const fetchUserFeedback = async () => {
        // try {
        //     // Make GET request to fetch user feedback
        //     const response = await axios.get('http://localhost:5000/api/feedback/');
        //     setUserFeedback(response.data); // Set user feedback state
        // } catch (error) {
        //     console.error('Error fetching user feedback:', error);
        //     // Optionally, you can display an error message to the user
        // }
    };

    const handleSubmitFeedback = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        try {
            // Make POST request to submit feedback
            const response = await axios.post('http://localhost:5000/api/feedback/', { UserName: 'User', feedBack: feedback });
            console.log(response.data.message); // Log feedback submission message
            // Optionally, you can display a success message to the user or redirect them to a confirmation page

            // After submitting feedback, refetch user feedback to update the UI
            fetchUserFeedback();
            setFeedback(''); // Clear feedback input field
        } catch (error) {
            console.error('Error submitting feedback:', error);
            // Optionally, you can display an error message to the user
        }
    };



    const handleSignOut = () => {
        dispatch(logout()); // Dispatch the logout action
    };



    return (
        <React.Fragment>
            <Header />
            <Stack justifyContent='center' alignItems='center' >
            
                <Stack direction='row' margin="40px 0 25px 0" color='blue'>
                <PersonOutlineIcon sx={{fontSize:'60px'}} />
                <Typography variant='h3' margin='auto' >
                My Account
                </Typography>
                </Stack>

                
                {isLoggedIn ? (
                    <React.Fragment>
                        <Stack direction={{xs:'column', md:'row'}} sx={{width:'90%'}} justifyContent='center' alignItems='center'>
                            <Stack sx={{width:'40%', backgroundColor:'#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2', margin:'20px'}}>
                            <Avatar sx={{width:{xs:'100px', sm:'150px'} ,height:{xs:'100px', sm:'150px'} , margin:'100px auto'}}>QQ</Avatar>
                            </Stack>
                            <Stack sx={{width:{xs:'80%', md:'60%'}, backgroundColor:'#F5F9FC', boxShadow: '2px 2px 5px 1px #D6D3D2',margin:'20px' }}>
                            
                            
                            
                            <Stack sx={{margin:'25px'}}>
                        
                        <Grid container spacing={1} rowGap={5} columnGap={3} sx={{fontWeight:'bold'}}>
  <Grid item xs={2.2} >
  First Name:
  </Grid>
  <Grid item sm={2.8} xs={8} sx={{...detailStyles}}>
  { user.firstName }
  </Grid>
  
  <Grid item xs={2.2}>
  Last Name:
  </Grid>
  <Grid item sm={2.8} xs={8} sx={{...detailStyles}}>
  {user.lastName}
  </Grid>
  <Grid item xs={2.2}>
  Email:
  </Grid>
  <Grid item xs={8} sx={{...detailStyles}}>
  {user.email}
  </Grid>
  <Grid item xs={2.2}>
  Mobile Number:
  </Grid>
  <Grid  item sm={3} xs={7} sx={{...detailStyles}}>
  07123456789
  </Grid>

  <Grid item container gap={2} >
  Address:
  <Grid item xs={10}/>
  <Grid item sm={2.2}>
  Address Line 01:
  </Grid>
  <Grid  item  sm={8} xs={12} sx={{...detailStyles}}>
  071
  </Grid>
  
  <Grid item sm={2.2}>
  Address Line 02:
  </Grid>
  <Grid  item sm={8} xs={12} sx={{...detailStyles}}>
  asd
  </Grid><Grid item sm={2.2}>
  Address Line 03:
  </Grid>
  <Grid  item  sm={8} xs={12} sx={{...detailStyles}}>
 fdgfdsdfdsfdsfdsdsfdssf
  </Grid>
  </Grid>
  
  
</Grid>
                            </Stack>
                            </Stack>
                        
                        </Stack>
                        







                        <Typography variant="h5" gutterBottom>
                    Feedback
                </Typography>
                {/* <ul>
                    {userFeedback.map((feedbackItem, index) => (
                        <li key={index}>{feedbackItem.feedBack}</li>
                    ))}
                </ul> */}
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
                <Button
                            className={classes.button}
                            variant="contained"
                            color="error"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    //onClick={handleEditProfile}
                >
                    Edit Profile
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