import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import config from '../../../config';

const ForgotPasswordDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRequestReset = async () => {
    
    try {
      const response = await axios.post(`${config.baseURL}/api/user/forgotpassword`, { email });
      setSnackMessage("Password reset message sent to your email");
      setIsSuccess(response.data.alert);
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackMessage('Error requesting password reset');
      setIsSuccess(false);
      setSnackbarOpen(true);
    }
  // close();
  };

  return (
    <Dialog open={open} onClose={onClose} 
    PaperProps={{ sx: { borderRadius: "25px" } }}>
      <DialogTitle width={{xs:'300px', sm:'500px'}} sx={{margin:'10px 0 0 0px'}}>Forgot Password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" >Cancel</Button>
        <Button onClick={handleRequestReset} color="primary">Request Reset</Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={isSuccess ? "success" : "error"}
          variant="filled"
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
