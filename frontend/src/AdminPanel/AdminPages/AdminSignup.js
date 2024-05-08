import React, {useState} from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import { useNavigate } from 'react-router-dom';
import logo from '../../Images/logo.png'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';




const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    
    stackContainer:{
    width:'80%%',
    margin:'50px'
    },

    '@media (max-width: 600px)': {
        
    stackContainer: {
    width: '90%',
        margin:'50px auto ' 
    },
    
},
}));



export const AdminSignup = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');


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


        <Paper sx={{width: 'auto', margin:'50px', borderRadius:'25px', 
        }} elevation={20} className={classes.paperContainer}>

            
            
            
            <Stack className={classes.stackContainer}  justifyContent="center" alignItems="center" direction='column'  >
                
                <img src={logo} alt="Swargadhi logo" style={{width:'50%'}} />
                <Typography variant='h5' color='success' style={{color:'green', margin:'25px'}} >Admin Signup</Typography>

                
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
                <TextField placeholder='Password' variant="standard"  margin="normal" type='password' required style={{width:'80%', marginBottom:'50px'}} 
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
                <TextField placeholder='Reenter Password' variant="standard"  margin="normal" type='password' required style={{width:'80%', marginBottom:'50px'}} 
                value={password2}
                onChange={(e)=>{setPassword2(e.target.value)}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                            <LockRoundedIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <Button variant="contained" onClick={() => { navigate('/admin/home') }} color='success'>Login</Button>


            </Stack>
            
            
        </Paper>
        </Grid>
    </ThemeProvider>

    </div> 
    )
}
