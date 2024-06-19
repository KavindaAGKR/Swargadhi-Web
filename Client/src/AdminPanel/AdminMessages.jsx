import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import config from '../config';

export const AdminMessages = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`${config.baseURL}/api/feedback/get`); // Adjust the URL as needed
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    return (
        <>

      <Typography variant='h4' textAlign='center' sx={{p:'25px'}}>User Feedbacks</Typography>

    <TableContainer style={{width:'90%', margin:'auto'}}>
      <Table >
        <TableHead >
            <TableRow  > 
              <TableCell sx={{fontWeight:'bold' }}>Feedback by</TableCell>
              <TableCell sx={{fontWeight:'bold' }}>Feedback</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map(
              (feedback) => (
                <TableRow key={feedback._id}>
                   
                    <TableCell>{feedback.givenBy ? `${feedback.givenBy.firstName} ${feedback.givenBy.lastName}` : 'Unknown'}</TableCell>
                    <TableCell>{feedback.feedBack}</TableCell>
                  </TableRow>
              )
            )}
              
          </TableBody>
      </Table>
      </TableContainer>
        
        </>
    );
};
