import React, {useState} from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment, FormControlLabel,Box,Checkbox } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import { useNavigate } from 'react-router-dom';
import signpng from './signupfinal.png';
import signback from './signback.png'
import logo from './logo.png'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';




const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    imageContainer: {
    position: 'relative',
    },
    image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'auto',
    height: '600px',
    zIndex: 2,
    },
    image2: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'auto',
    height: '600px',
    margin: '0 0 0 10px',
    zIndex: 1,
    },
    avatarImage:{
        
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
        style={{ minHeight: '100vh' }}
        >
        <Paper sx={{ padding: '20px,200px,0px,0px', width: '1200px', height: '600px' }} elevation={10}>

            <Grid container>
            <Grid item xs={4} className={classes.imageContainer}>
                <img src={signpng} alt="The signup" className={classes.image} />
                <img src={signback} alt="The signup" className={classes.image2} />
            </Grid>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={4} container justifyContent="center" alignItems="center" direction='column' >
                
                <img src={logo} alt="Swargadhi logo" style={{width:'400px', margin:'50px 0 0 0'}} />
                <Typography variant='h4' color='success' style={{color:'green'}} >Login</Typography>

                
                

                
                <TextField placeholder='Email' variant="standard"  margin="normal" type='text' required fullWidth 
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
                <TextField placeholder='Password' variant="standard"  margin="normal" type='password' required fullWidth
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
                    control={< Checkbox onChange={handleChange} checked={rememberMe} />}/>
                    </Box>


                

                    <Button variant="contained" onClick={() => { navigate('/signup') }} color='success'>Login</Button>
                    <Button variant='text' onClick={()=>{navigate('/signup')}}>Forgot password?</Button>
                    <Typography variant='body'>Don't have an account?<Button variant='text' onClick={() => {navigate('/signup')}}>Login</Button> </Typography>
                    
                    
            </Grid>
            <Grid item xs={1}>

            </Grid>
            </Grid>
        </Paper>
        </Grid>
    </ThemeProvider>

    </div> 
    )
}
