import React, { useState, useEffect } from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ThemeProvider } from '@mui/material/styles';  // Separate import
import { createTheme } from '@mui/material/styles';   // Separate import
import signpng from '../Images/signupfinal.png';
import signback from '../Images/signback.png';
import logo from '../Images/logo.png';
import profile from '../Images/profile.png';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';


const firebaseConfig = {
  apiKey: "AIzaSyCwTnB-5-JNu-wu4S-jejIBZ4ylcAiWzH0",
  authDomain: "swargadi-3250a.firebaseapp.com",
  projectId: "swargadi-3250a",
  storageBucket: "swargadi-3250a.appspot.com",
  messagingSenderId: "991902590983",
  appId: "1:991902590983:web:329754a966b8b39e0ee2a2",
  measurementId: "G-0KGDYEWK6L"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    position: 'relative',
    width: '50%'
  },
  stackContainer: {
    width: '50%',
    margin: '50px 0px'
  },
  image: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  image2: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    margin: '0 0 0 10px',
    zIndex: 1,
  },
  '@media (max-width: 600px)': {
    imageContainer: {
      display: 'none',
    },
    stackContainer: {
      width: '100%',
      margin: '25px'
    },
    paperContainer: {
      margin: '25px'
    },
  },
}));

export const Signup = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPw2] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No current user available.");
        return;
      }

      const idToken = await currentUser.getIdToken();

      const userData = {
        name: name,
        email: email,
        // Add other user data fields as needed
      };

      fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}` // Add 'Bearer ' prefix
        },
        body: JSON.stringify(userData)
      })
        .then(response => {
          if (response.ok) {
            console.log('User signed up successfully');
            // Redirect or show success message as needed
          } else {
            console.error('Error signing up user');
            // Handle signup error
          }
        })
        .catch(error => {
          console.error('Error signing up user:', error);
          // Handle signup error
        });
    } catch (error) {
      console.error('Error getting ID token:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        margin='auto'
        style={{ minHeight: '100vh', maxWidth: '1200px' }}
      >
        <Paper sx={{ width: 'auto', margin: '50px', borderRadius: '35px' }} elevation={10}>
          <Grid container>
            <Stack className={classes.imageContainer}>
              <img src={signpng} alt="The signup" className={classes.image} />
              <img src={signback} alt="The signup" className={classes.image2} />
            </Stack>
            <Stack className={classes.stackContainer} justifyContent="center" alignItems="center" direction='column' >
              <img src={logo} alt="Swargadhi logo" style={{ width: '80%', margin: '0px 0 0 0' }} />
              <Typography variant='h4' color='success' style={{ color: 'green' }}>Sign Up</Typography>
              <img src={selectedImage || profile} alt="Profile" style={{ width: '60px', height: '60px', cursor: 'pointer', borderRadius: '200px', margin: '20px' }} onClick={() => document.getElementById('avatar-input').click()} />
              <input id="avatar-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
              <TextField placeholder='Name' variant="standard" margin="normal" required style={{ width: '80%' }} value={name} onChange={(e) => { setName(e.target.value); console.log('name: ' + name) }} InputProps={{ startAdornment: (<InputAdornment position='start'><AccountCircleRoundedIcon /></InputAdornment>), }} />
              <TextField placeholder='Email' variant="standard" margin="normal" required style={{ width: '80%' }} value={email} onChange={(e) => { setEmail(e.target.value); console.log('email: ' + email) }} InputProps={{ startAdornment: (<InputAdornment position='start'><EmailRoundedIcon /></InputAdornment>), }} />
              <TextField placeholder='Password' variant="standard" margin="normal" type='password' required style={{ width: '80%' }} value={password} onChange={(e) => { setPassword(e.target.value); console.log('password: ' + password) }} InputProps={{ startAdornment: (<InputAdornment position='start'><LockRoundedIcon /></InputAdornment>), }} />
              <TextField placeholder='Re Enter Password' variant="standard" margin="normal" type='password' required style={{ width: '80%' }} value={password2} onChange={(e) => { setPw2(e.target.value); console.log('Re entered password: ' + password2) }} InputProps={{ startAdornment: (<InputAdornment position='start'><LockRoundedIcon /></InputAdornment>), }} />
              <Button variant="contained" onClick={handleSignUp} color='success'>Sign up</Button>
              <Typography>Already have an account? <Button variant='text' onClick={() => { navigate('/login') }}>Login</Button></Typography>
            </Stack>
          </Grid>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
};