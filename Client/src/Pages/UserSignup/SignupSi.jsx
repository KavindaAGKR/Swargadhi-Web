
import React, {useState} from 'react';
import { Paper, Button, Typography, TextField, InputAdornment,Stack,Snackbar, Alert, Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import signpng from '../../Images/signupfinal.png';
import signback from '../../Images/signback.png'
import logo from '../../Images/logo.png'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios'; 
import { Visibility, VisibilityOff } from '@mui/icons-material';
import config from '../../config';


export const SignupSi = () => {
    const navigate = useNavigate();


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPw2] = useState('');
    const [snackbarMessage, setSnackMessage] = useState('');
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [issignedup, setisSignedup] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [errorEmailMsg, setEmailErrorMsg] = useState('');
    const [errorPW, setErrorPW] = useState(false)
    const [errorPWMsg, setErrorPWMsg] = useState('')
    const [errorPW2, setErrorPW2] = useState(false)
    const [errorPW2Msg, setErrorPW2Msg] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleSignUp = async () => {

        if (!firstName || !lastName || !email || !password || !password2) {
            setSnackMessage('සියලුම කොටස් සම්පූර්ණ කරන්න');
            setSnackBarOpen(true);
            return;
        }

        const emailType = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailType.test(email) || !email) {
        setEmailError(true)
        setEmailErrorMsg('වලංගු විද්යුත්-තැපැල් ලිපිනයක් ඇතුලත් කරන්න!')
        return;
    }
    const passwordType = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordType.test(password)) {
        setErrorPW(true);
        setErrorPWMsg('මුරපදයේ ඉංග්‍රීසි කැපිටල් අකුරක්, සිම්පල් අකුරක් සහ ඉලක්කමක් අඩංගු විය යුතුය');
        return;
    }
        if (password !== password2) {
          setErrorPW2(true);
          setErrorPW(true);
            setErrorPW2Msg("මුර පද ගැලපෙන්නේ නැත")
            setErrorPWMsg("මුර පද ගැලපෙන්නේ නැත")
            return;
        }

        try {
            const response = await axios.post(`${config.baseURL}/api/user/register`, {
                firstName,
                lastName,
                email,
                password,
                password2
            });
            console.log(response.data.message);
            setSnackMessage("සාර්ථකව ලියාපදිංචි විය");
            setisSignedup(true);
            
        } catch (error) {
            console.error(error);
            setSnackMessage("ඇතුලත් කල දත්ත වලංගු නැත");
            
        }
        setSnackBarOpen(true);
    };

    return (

      <div>
        
      <Container justifyContent='center' sx={{display:'flex' ,margin:'25px auto', alignSelf:'center',}} >
      <Paper sx={{
                    borderRadius: '35px', height:'650px'
                }} elevation={20} >
            <Stack direction='row' margin='auto' justifyContent='center' >
            <Stack  sx={{display:{xs:'none', sm:'flex'},position:'relative', width:'50%', height:'650px'}} >
                  <img style={{position:'relative',zIndex:'10', height:'100%', width:'95%', maxHeight:'100%'}} src={signpng} alt="The signup"  />
                  <img style={{position:'absolute', zIndex:'1',height:'100%',width:'100%',  maxHeight:'100%',  }} src={signback} alt="The signup"  />
              </Stack>
            
              <Stack sx={{width:{xs:'100%', sm:'50%'}, position:'relative', padding:'15px 0'}}   alignItems="center" direction='column' spacing={2} >
              <Stack  width='100%' justifyContent='end' alignItems='end' onClick={()=>navigate('/')}>
                                <IconButton><CancelIcon/></IconButton>
                            </Stack>
                <img alt='Swargadhi' src={logo}  style={{width:'70%', margin:'0px'}}/>
                <Typography variant='h5' color='success.main'>ලියාපදිංචි වන්න</Typography>
                <TextField placeholder='මුල් නම' variant="standard"  margin="normal" required style={{width:'80%', marginTop:'20px'}}
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
                <TextField placeholder='අවසන් නම' variant="standard"  margin="normal" required style={{width:'80%'}}
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

                <TextField placeholder='විද්යුත් තැපෑල' variant="standard"  margin="normal" type='text' required style={{width:'80%'}}
                    value={email}
                    onChange={(email)=>{setEmail(email.target.value); setEmailError(false);}}
                    error={emailError}
                        helperText={emailError ? errorEmailMsg : ''}
                        InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <EmailRoundedIcon />
                          </InputAdornment>
                        ),
                      }}
                      
                />
                <TextField placeholder='මුරපදය' variant="standard"  margin="normal" 
                type={showPassword ? 'text' : 'password'}
                required style={{width:'80%'}}
                  value={password}
                  onChange={(pw)=>{setPassword(pw.target.value); setErrorPW(false);}}
                      error = {errorPW}
                      helperText={errorPW ? errorPWMsg : ''}
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <LockRoundedIcon />
                            </InputAdornment>
                        ),
                        endAdornment: password ? (
                            <InputAdornment position="end">
                                <IconButton
                                    
                                    onClick={()=>setShowPassword(!showPassword)}
                                    
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    }}
                      
                />
                <TextField placeholder='මුරපදය යළි ඇතුළු කරන්න' variant="standard"  margin="normal"
                 type={showPassword2 ? 'text' : 'password'}
                 required style={{width:'80%', marginBottom:'15px'}}
                    value={password2}
                    onChange={(pw2)=>{setPw2(pw2.target.value); setErrorPW2(false);}}
                    error={errorPW2}
                                helperText={errorPW2 ? errorPW2Msg : ''}
                    InputProps={{
                      startAdornment: (
                          <InputAdornment position='start'>
                              <LockRoundedIcon />
                          </InputAdornment>
                      ),
                      endAdornment: password2 ? (
                          <InputAdornment position="end">
                              <IconButton
                                  
                                  onClick={()=>setShowPassword2(!showPassword2)}
                                  
                              >
                                  {showPassword2 ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                      ) : null,
                  }}
                      
                />

                <Button variant="contained" onClick={() => { handleSignUp()  }} color='success'>ලියාපදිංචි වන්න</Button>
                <Typography>දැනටමත් ගිණුමක් පවතිනවාද? <Button variant='text' onClick={()=>{navigate('/login')}}>ලොග් වන්න</Button></Typography>
                <Snackbar
                                open={snackBarOpen}
                                autoHideDuration={3000}
                                onClose={() => { setSnackBarOpen(false); if (issignedup) { navigate('/login') } }}
                                
                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                
                                
                            >
                                <Alert
                                onClose={() => { setSnackBarOpen(false); if (issignedup) { navigate('/login') } }}
                                severity={issignedup ? "success" : "error"}
                                variant="filled"
                                sx={{marginTop:'50px'}}
                                >
                                
                                {snackbarMessage}
                                </Alert>

                            </Snackbar>
            
            
            </Stack>
            
            </Stack>
        </Paper>
        </Container>
        </div>
    );
};