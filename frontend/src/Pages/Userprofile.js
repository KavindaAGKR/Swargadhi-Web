import React from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';


const useStyles = makeStyles((theme) => ({
    root: {
    padding: '20px',
    },
    button: {
    marginTop: '20px'
    },
}));

export const UserProfile = () => {
    const classes = useStyles();

    const handleEditProfile = () => {
      // Handle edit profile action
    console.log('Edit profile clicked');
    };

    return (
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
    );
};