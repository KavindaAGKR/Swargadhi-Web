
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';

const EditProfileDialog = 
({ open, handleClose, userDetails }) =>
     {

  const [user, setUser] =  useState(userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails) {
      setUser({ ...userDetails });
    }
  }, [userDetails]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setUser({ ...user, [name]: value });
  };
  const handleUpdate = (updatedUser) => {
    
    // dispatch(setUser(updatedUser));
    console.log(updatedUser)
    // localStorage.setItem('user', JSON.stringify(updatedUser));
};



  const handleSave = async () => {
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
        console.log(data.message);
        console.log("edited user details:" + data.updatedUser);

        handleUpdate(data.updatedUser); 
        handleClose();
      } else {
        console.error('Error updating user:', await response.text());
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={user.firstName}
                            onChange={handleChange}
                           
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="lastName"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={user.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="mobileNumber"
                            label="Mobile Number"
                            variant="outlined"
                            fullWidth
                            value={user.mobileNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="addressL1"
                            label="Address Line 01"
                            variant="outlined"
                            fullWidth
                            value={user.addressL1}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="addressL2"
                            label="Address Line 02"
                            variant="outlined"
                            fullWidth
                            value={user.addressL2}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="addressL3"
                            label="Address Line 03"
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
