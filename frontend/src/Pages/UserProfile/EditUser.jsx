import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';


const EditProfileDialog = ({ open, handleClose, userDetails }) => {
  const [user, setEditedUser] = useState(userDetails);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setEditedUser({
        ...userDetails,
        addressL1: userDetails.deliveryAddress?.addressL1 || '',
        addressL2: userDetails.deliveryAddress?.addressL2 || '',
        addressL3: userDetails.deliveryAddress?.addressL3 || ''
      });
    }
  }, [userDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({ ...user, [name]: value });

    if (name === 'mobileNumber' && value.length !== 10) {
      setError(true);
    }else{
      setError(false);
    }
    
  };




  const handleUpdate = (updatedUser) => {
    console.log("Edited user details:", updatedUser);
    dispatch(setUser(updatedUser));
  };




  const handleSave = async () => {
    if (user.mobileNumber.length !== 10) {
      
      setError(true);
      return;
    }
    try {
      
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobileNumber: user.mobileNumber,
          addressL1: user.addressL1,
          addressL2: user.addressL2,
          addressL3: user.addressL3
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        handleUpdate(data.user); 
        
        handleClose();
      } else {
        console.error('Error updating user:', await response.text());
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const maxNumber = 10000000000;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle >Edit Profile</DialogTitle>
      <DialogContent >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              size='small'
              sx={{margin:'5px 0 0 0'}}
              value={user.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name" size='small'
              variant="outlined"
              sx={{margin:'5px 0 0 0'}}
              fullWidth
              value={user.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email"
              variant="outlined" size='small'
              fullWidth
              disabled
              value={user.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          
            <TextField
              name="mobileNumber"
              label="Mobile Number" 
              size='small'
              variant="outlined"
              type='number'
              error={error}
              helperText={error ? 'Invalid mobile number' : ''}
              fullWidth
              defaultValue={user.mobileNumber}
              onChange={handleChange}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {display: "none",},
               }}
            />
            
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="addressL1"
              label="Address Line 01" size='small'
              variant="outlined"
              fullWidth
              value={user.addressL1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="addressL2"
              label="Address Line 02" size='small'
              variant="outlined"
              fullWidth
              value={user.addressL2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="addressL3"
              label="Address Line 03" size='small'
              variant="outlined"
              fullWidth
              value={user.addressL3}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
      
    </Dialog>
  );
};

export default EditProfileDialog;
