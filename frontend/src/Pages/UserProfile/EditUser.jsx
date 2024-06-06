
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';

const EditProfileDialog = ({ open, handleClose, user, handleUpdate }) => {

 const handleChange = () =>{

 }


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
                <Button color="primary" variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileDialog;
