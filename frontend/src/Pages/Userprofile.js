import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios'; // Import axios for making HTTP requests
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice'; 
import { selectUser, selectIsLoggedIn } from '../redux/slices/userSlice';

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
    const [userFeedback, setUserFeedback] = useState([]);

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
            <div className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    User Profile
                </Typography>

                
                {isLoggedIn ? (
                    <React.Fragment>
                        <Typography variant="body1">
                            
                            First Name: { user.firstName } <br />
                            Last Name: {user.lastName} <br />
                            Email: {user.email} <br />
                            
                            Address: 
                        </Typography>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    </React.Fragment>
                ) : (
                    <Typography variant="body1">
                        Please <a href="/login">login</a> to view your details.
                    </Typography>
                )}



                
                <Typography variant="h5" gutterBottom>
                    Feedback
                </Typography>
                <ul>
                    {userFeedback.map((feedbackItem, index) => (
                        <li key={index}>{feedbackItem.feedBack}</li>
                    ))}
                </ul>
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
                    >
                        Submit Feedback
                    </Button>
                </form>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    //onClick={handleEditProfile}
                >
                    Edit Profile
                </Button>
            </div>
            <Footer />
        </React.Fragment>
    );
};