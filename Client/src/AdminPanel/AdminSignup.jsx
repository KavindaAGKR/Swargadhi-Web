import React, { useState } from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment, Stack, Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import config from '../config';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    stackContainer: {
        width: '80%',
        margin: 'auto',
        padding:'0'
    },
    '@media (max-width: 600px)': {
        stackContainer: {
            width: '100%',
            margin: '50px auto'
        },
    },
}));

export const AdminSignup = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [snackbarMessage, setSnackMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [issignedup, setisSignedup] = useState(false);



    const handleSignup = async () => {
        setSnackBarOpen(true)


        if (!firstName || !lastName ||!email || !password) {
            setSnackMessage('All the fields are required');
            setSnackBarOpen(true);
            return;
        }

        const emailtype = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailtype.test(email)) {
            setSnackMessage('Please enter a valid email address');
            setSnackBarOpen(true);
            return;
        }
        if(password !== password2){
            setSnackMessage('Entered two passwords are not matching!');
            setSnackBarOpen(true);
            return;
        }



        try {
            const response = await axios.post(`${config.baseURL}/api/admin/register`, {
                firstName,
                lastName,
                email,
                password,
                password2
            });
            console.log(response.data.message);
            setSnackMessage(response.data.message);
            setisSignedup(true);
            //navigate('/admin');
        } catch (error) {
            console.error(error);
            setSnackMessage("Invalid Inputs");

            
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
                    style={{ minHeight: '100vh', maxWidth: '1200px', maxHeight: '80%' }}
                >
                    <Paper sx={{ width: '80%', margin: '50px', borderRadius: '25px' }} elevation={20} className={classes.paperContainer}>
                        <Stack className={classes.stackContainer} justifyContent="center" alignItems="center" direction='column'>
                            <Typography variant='h5' color='success' style={{ color: 'green', margin: '25px' }}>Admin Signup</Typography>
                            <TextField placeholder='First Name' variant="standard" margin="normal" type='text' required style={{ width: '80%' }}
                                value={firstName}
                                onChange={(e) => { setFirstName(e.target.value) }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmailRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField placeholder='Last Name' variant="standard" margin="normal" type='text' required style={{ width: '80%' }}
                                value={lastName}
                                onChange={(e) => { setLastName(e.target.value) }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmailRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField placeholder='Email' variant="standard" margin="normal" type='text' required style={{ width: '80%' }}
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <EmailRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField placeholder='Password' variant="standard" margin="normal" type='password' required style={{ width: '80%' }}
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LockRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField placeholder='Re-enter Password' variant="standard" margin="normal" type='password' required style={{ width: '80%', marginBottom: '50px' }}
                                value={password2}
                                onChange={(e) => { setPassword2(e.target.value) }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <LockRoundedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button variant="contained" onClick={handleSignup} color='success' style={{ width: '30%', marginBottom: '50px' }}>Signup</Button>
                            <Snackbar
                                open={snackBarOpen}
                                autoHideDuration={3000}
                                onClose={() => { setSnackBarOpen(false); if (issignedup) { navigate('/admin/') } }}
                                message={snackbarMessage}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                sx={{marginTop:"100px"}}
                                
                            >
                                <Alert
                                onClose={() => { setSnackBarOpen(false); if (issignedup) { navigate('/admin/') } }}
                                severity={issignedup ? "success" : "error"}
                                variant="filled"
                                >
                                
                                {snackbarMessage}
                                </Alert>

                            </Snackbar>

                        </Stack>
                    </Paper>
                </Grid>
            </ThemeProvider>
        </div>
    );
};




