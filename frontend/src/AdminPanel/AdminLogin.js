import React, { useState } from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    stackContainer: {
        width: '80%',
        margin: '50px',
    },
    '@media (max-width: 600px)': {
        stackContainer: {
            width: '90%',
            margin: '50px auto' 
        },
    },
}));

export const AdminLogin = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', {
                email,
                password
            });

            if (response.data.alert) {
                alert(response.data.message);
                localStorage.setItem('userDetails', JSON.stringify(response.data.Admin));
                Cookies.set('jwt', response.data.token); 
                console.log('Successfully authenticated as admin');
                console.log('Token:', response.data.token); 
                navigate('/admin/home/');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    margin='auto'
                    style={{ minHeight: '100vh', maxWidth:'1200px', maxHeight:'80%' }}
                >
                    <Paper sx={{ width: 'auto', margin: '50px', borderRadius: '25px' }} elevation={20} className={classes.paperContainer}>
                        <Stack className={classes.stackContainer}  justifyContent="center" alignItems="center" direction='column'  >
                            <img src={logo} alt="Swargadhi logo" style={{ width:'50%' }} />
                            <Typography variant='h5' color='success' style={{ color: 'green', margin: '25px' }} >Admin Login</Typography>
                            <TextField
                                placeholder='Email'
                                variant="standard"
                                margin="normal"
                                type='text'
                                required
                                style={{ width: '80%' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmailRoundedIcon />
                                        </InputAdornment>
                                    ), 
                                }}
                            />
                            <TextField
                                placeholder='Password'
                                variant="standard"
                                margin="normal"
                                type='password'
                                required
                                style={{ width: '80%', marginBottom: '50px' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LockRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button variant="contained" onClick={handleLogin} color='success'>Login</Button>
                        </Stack>
                    </Paper>
                </Grid>
            </ThemeProvider>
        </div> 
    );
};
