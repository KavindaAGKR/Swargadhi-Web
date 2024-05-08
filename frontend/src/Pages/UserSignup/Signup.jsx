
import React, {useState} from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment,Stack,Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import { useNavigate } from 'react-router-dom';
import signpng from '../../Images/signupfinal.png';
import signback from '../../Images/signback.png'
import logo from '../../Images/logo.png'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios'; 
//import axios from 'axios';



const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    imageContainer: {
    position: 'relative',
    width:'50%'
    },
    stackContainer:{
      width:'50%',
      margin:'50px 0px'
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

    imageContainer:{
        display: 'none',
    },
    stackContainer: {
    width: '100%',
          margin:'15px' 
    },paperContainer:{
        margin:'15px'
    },
},
}));

              

export const Signup = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPw2] = useState('');
    const [snackbarMessage, setSnackMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [issignedup, setisSignedup] = useState(false);

    const handleSignUp = async () => {
        setSnackBarOpen(true)

        if (!firstName || !lastName || !email || !password) {
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
        if (password !== password2) {
            setSnackMessage('Entered two passwords are not matching!');
            setSnackBarOpen(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
                firstName,
                lastName,
                email,
                password,
                password2
            });
            console.log(response.data.message);
            setSnackMessage("Successfully Signed Up");
            setisSignedup(true);
            
        } catch (error) {
            console.error(error);
            setSnackMessage("Invalid Inputs");
            
        }
    };

    return (
    <ThemeProvider theme={theme}>
        <Grid
        container
        justifyContent="center"
        alignItems="center"
        margin='auto'
        style={{ minHeight: '100vh',maxWidth:'1200px' }}
        >
        <Paper sx={{ width: 'auto', margin:'50px', borderRadius:'35px' }} elevation={10}>

            <Grid container>
            <Stack className={classes.imageContainer}>
                <img src={signpng} alt="The signup" className={classes.image} />
                <img src={signback} alt="The signup" className={classes.image2} />
            </Stack>
            {/* <Grid item xs={2}>

            </Grid> */}
{/* Inputs */}
            <Stack className={classes.stackContainer} justifyContent="center" alignItems="center" direction='column' >

                <img alt='Swargadhi' src={logo}  style={{width:'80%', marginBottom:'10px'}}/>
                <Typography variant='h4' color='success.main'>SignUp</Typography>
                <TextField placeholder='first Name' variant="standard"  margin="normal" required style={{width:'80%', marginTop:'20px'}}
                value={firstName}
                onChange={(e) => {setFirstName(e.target.value); console.log('name: ' + firstName)}}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountCircleRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                />
                <TextField placeholder='last Name' variant="standard"  margin="normal" required style={{width:'80%'}}
                value={lastName}
                onChange={(e) => {setLastName(e.target.value); console.log('name: ' + lastName)}}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AccountCircleRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                />

                <TextField placeholder='Email' variant="standard"  margin="normal" type='text' required style={{width:'80%'}}
                    value={email}
                    onChange={(email)=>{setEmail(email.target.value); console.log('email: ' + email)}}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <EmailRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      
                />
                <TextField placeholder='Password' variant="standard"  margin="normal" type='password' required style={{width:'80%'}}
                  value={password}
                  onChange={(pw)=>{setPassword(pw.target.value); console.log('password: '+ password)}}

                    InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <LockRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      
                />
                <TextField placeholder='Re Enter Password' variant="standard"  margin="normal" type='password' required style={{width:'80%', marginBottom:'50px'}}
                    value={password2}
                    onChange={(pw2)=>{setPw2(pw2.target.value); console.log('Re entered password: ' + password2)}}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <LockRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      
                />

                <Button variant="contained" onClick={() => { handleSignUp()  }} color='success'>Sign up</Button>
                <Typography>Already have an account? <Button variant='text' onClick={()=>{navigate('/login')}}>Login</Button></Typography>
                <Snackbar
                                open={snackBarOpen}
                                autoHideDuration={3000}
                                onClose={() => { setSnackBarOpen(false); if (issignedup) { navigate('/login') } }}
                                // message={snackbarMessage}
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                sx={{marginTop:"100px"}}
                                
                            >
                                <Alert
                                onClose={() => { setSnackBarOpen(false); if (issignedup) { navigate('/login') } }}
                                severity={issignedup ? "success" : "error"}
                                variant="filled"
                                >
                                
                                {snackbarMessage}
                                </Alert>

                            </Snackbar>
            
            
            </Stack>
            
            </Grid>
        </Paper>
        </Grid>
    </ThemeProvider>
    );
};