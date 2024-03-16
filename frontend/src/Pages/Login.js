import React, {useState} from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment, FormControlLabel,Box,Checkbox, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import { useNavigate } from 'react-router-dom';
import signpng from '../Images/signupfinal.png';
import signback from '../Images/signback.png'
import logo from '../Images/logo.png'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GoogleButton from 'react-google-button'



const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    imageContainer: {
    position: 'relative',
    width:'50%',
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
        margin:'25px' 
    },
    paperContainer:{
        margin:'25px'
    },
},
}));



export const Login = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);


    const handleChange = (event) => {
        setRememberMe(event.target.checked);
        
    }
    

return (
    <div>
    <ThemeProvider theme={theme}>
        <Grid
        container
        justifyContent="center"
        alignItems="center"
        margin='auto'
        style={{ minHeight: '100vh',maxWidth:'1200px', maxHeight:'80%' }}
        >
        <Paper sx={{width: 'auto', margin:'50px', borderRadius:'35px', 
        }} elevation={20} className={classes.paperContainer}>

            <Grid container>
            <Stack  className={classes.imageContainer} >
                <img src={signpng} alt="The signup" className={classes.image} />
                <img src={signback} alt="The signup" className={classes.image2} />
            </Stack>
            
            <Stack className={classes.stackContainer}  justifyContent="center" alignItems="center" direction='column'  >
                
                <img src={logo} alt="Swargadhi logo" style={{width:'80%', margin:'0px 0 0 0'}} />
                <Typography variant='h4' color='success' style={{color:'green'}} >Login</Typography>

                
                <TextField placeholder='Email' variant="standard"  margin="normal" type='text' required style={{width:'80%'}} 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
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
                onChange={(e)=>{setPassword(e.target.value)}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                            <LockRoundedIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box>
                    <FormControlLabel label='Remember Me' 
                    control={< Checkbox onChange={handleChange} checked={rememberMe} color='success' />}/>
                    </Box>


                

                    <Button variant="contained" onClick={() => { navigate('/'); alert('Successfully loged in') }} color='success'>Login</Button>
                    <Button variant='text' onClick={()=>{navigate('/signup')}}>Forgot password?</Button>
                    <Typography variant='body'>Don't have an account?<Button variant='text' onClick={() => {navigate('/signup')}}>Sign Up</Button> </Typography>
                    <GoogleButton type="light" 
                    onClick={() => { console.log('Google button clicked') }}
/>

            </Stack>
            
            </Grid>
        </Paper>
        </Grid>
    </ThemeProvider>

    </div> 
    )
}
