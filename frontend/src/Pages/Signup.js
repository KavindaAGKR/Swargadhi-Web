import React, {useState} from 'react';
import { Grid, Paper, Button, Typography, TextField, InputAdornment,Stack } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import { useNavigate } from 'react-router-dom';
import signpng from '../Images/signupfinal.png';
import signback from '../Images/signback.png'
import logo from '../Images/logo.png'
import profile from '../Images/profile.png'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { Password } from '@mui/icons-material';
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
          margin:'25px' 
    },paperContainer:{
        margin:'25px'
    },
},
}));

              


export const Signup = () => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPw2] = useState('');

    const handleSignUp = ()=>{
      alert("Your data are: \n User Name: "+name + "\n Email : " + email+"\n");
    }
  


  // const handleSignUp = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/v1/buyer/signup", {
  //       name,
  //       email,
  //       password,
  //     });

  //     if (response.data) {
  //       //console.log('User registered successfully');
  //       //SuccessMessage("User registered successfully");
  //       alert("User registered successfully, Now log with your email and password");
        
  //       navigate('/login'); 
  //     } else {
  //       throw new Error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     alert("Error: " + error.message); // Display the error message to the user
  //   }
  //   alert("Your data are: \n User Name: "+name + "\n Email : " + email+"\n");

  // };
    
    const [selectedImage, setSelectedImage] = useState(null);

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
                
                <img src={logo} alt="Swargadhi logo" style={{width:'80%', margin:'0px 0 0 0'}} />
                <Typography variant='h4' color='success' style={{color:'green'}} >Sign Up</Typography>

                
                <img src={selectedImage || profile} alt="Profile" style={{ width: '60px', height: '60px', cursor: 'pointer',borderRadius:'200px', margin:'20px' }} onClick={() => document.getElementById('avatar-input').click()} />
              <input id="avatar-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />


                <TextField placeholder='Name' variant="standard"  margin="normal" required style={{width:'80%'}}
                value={name}
                onChange={(e) => {setName(e.target.value); console.log('name: ' + name)}}
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
                <TextField placeholder='Re Enter Password' variant="standard"  margin="normal" type='password' required style={{width:'80%'}}
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

                <Button variant="contained" onClick={() => { handleSignUp() ;navigate('/login') }} color='success'>Sign up</Button>
                <Typography>Already have an account? <Button variant='text' onClick={()=>{navigate('/login')}}>Login</Button></Typography>
            </Stack>
            
            </Grid>
        </Paper>
        </Grid>
    </ThemeProvider>
    );
};


