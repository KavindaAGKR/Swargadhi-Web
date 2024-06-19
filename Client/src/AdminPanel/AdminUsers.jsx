import { Button, Dialog, DialogActions, DialogTitle, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import config from '../config';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${config.baseURL}/api/user/users`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched users:', data.data); 
          setUsers(data.data); 
        } else {
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    console.log('Attempting to delete user with id:', id);
    if (!id) {
      console.error('Invalid user id:', id);
      return;
    }

    try {
      const response = await fetch(`${config.baseURL}/api/user/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setUsers(users.filter(user => user._id !== id));
        console.log('User deleted successfully');
      } else {
        const errorData = await response.json();
        console.error('Error deleting user:', errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>

      <Typography variant='h4' textAlign='center' sx={{p:'25px'}}>User Management</Typography>


    <TableContainer style={{width:'90%', margin:'auto'}}>
      <Table >
        <TableHead >
            <TableRow  > 
              <TableCell sx={{fontWeight:'bold' }}>Fist Name</TableCell>
              <TableCell sx={{fontWeight:'bold' }}>Last Name</TableCell>
              <TableCell sx={{fontWeight:'bold' }}>Email</TableCell>
              <TableCell sx={{fontWeight:'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(
              (user) => (
               <>
                <TableRow key={user._id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><Button onClick={() => setOpenDelete(true)}>Delete</Button></TableCell>
                  </TableRow>
                  <Dialog open={openDelete}  sx={{backgroundColor:'white'}}>
                  <DialogTitle width={{xs:'250px', sm:'400px'}}> Do you want to delete user? </DialogTitle>
                  <DialogActions>
                      <Button  onClick={()=>setOpenDelete(false)}>Cancel</Button>
                      <Button onClick={() => {handleDeleteUser(user._id);setOpenDelete(false);}}>Yes</Button>
                  </DialogActions>
              </Dialog>
                  
              </>
              )
            )}
              
          </TableBody>
      </Table>
      </TableContainer>
      
    </>
  );
};
