import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
<<<<<<< HEAD
import axios from 'axios'; // Import axios for making HTTP requests
=======
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';

>>>>>>> 9bff5f291d6f35645a409bd9ee00650b72f9d9bf

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
    const classes = useStyles();
    const [feedback, setFeedback] = useState('');
    const [userFeedback, setUserFeedback] = useState([]);

    useEffect(() => {
        fetchUserFeedback();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    const fetchUserFeedback = async () => {
        try {
            // Make GET request to fetch user feedback
            const response = await axios.get('http://localhost:5000/api/feedback/');
            setUserFeedback(response.data); // Set user feedback state
        } catch (error) {
            console.error('Error fetching user feedback:', error);
            // Optionally, you can display an error message to the user
        }
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

    return (
<<<<<<< HEAD
        <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            <Typography variant="body1">
                {/* Display user details here */}
                {/* Example: */}
                Name: John Doe <br />
                Email: johndoe@example.com <br />
                Address: 123 Main St, City, Country
            </Typography>
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
=======
      <React.Fragment><Header/>
    <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
        User Profile
        </Typography>
        <Typography variant="body1">
          {/* Display user details here */}
          {/* Example: */}
        Name: John Doe <br />
        Email: johndoe@example.com <br />
        Address: 123 Main St, City, Country
        </Typography>
        <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleEditProfile}
        >
        Edit Profile
        </Button>
    </div>
    <Footer/></React.Fragment>
>>>>>>> 9bff5f291d6f35645a409bd9ee00650b72f9d9bf
    );
};
