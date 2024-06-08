import { CircularProgress, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const UserOrders = ({userId}) => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const latestOrders = orders.reverse();

    const getColorByStatus = (status) => {
      switch (status) {
        case 'Pending':
          return '#C6CCFC';
        case 'Delivered' :
          return '#C7FCC6';
          case 'Paid':
          return '#C7FCC6';
        case 'Cancelled':
          return '#F3A6B4';
        default:
          return '#C6CCFC';
      }
    };
  

    useEffect(() => {
        fetchUserOrders();

    }, [userId]);



    const fetchUserOrders = async () => {
setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/orders/orders/user/${userId}`);
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user orders:', error);
            
        }
    };



  return (
    <Stack width='100%'>
                            <Typography variant="h5" mb='30px' >My Orders</Typography>

{loading?(<Stack  height='100%'><Typography variant='h5' margin='auto'><CircularProgress color="success" /></Typography></Stack>):
(
    orders.length ? (
                                
        <Stack alignSelf='center' width='80%'>

        <TableContainer style={{width:'100%', margin:'auto', backgroundColor:'white', borderRadius:'15px', alignSelf:'center'}}>
        <Table >
          <TableHead>

              <TableRow  sx={{borderBottom:'solid  transparent', }}> 
              <TableCell sx={{fontWeight:'bold', }}>Date</TableCell>
                <TableCell sx={{fontWeight:'bold' }}>Products</TableCell>
                <TableCell sx={{fontWeight:'bold' }}>Total Amount</TableCell>
                
                <TableCell sx={{fontWeight:'bold' }}>Order Status</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {latestOrders.map(
                (order) => (
                <>
                
                  <TableRow key={order._id} sx={{borderBottom:'solid  transparent'}}>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                      <TableCell>{order.products.map((product, index) => (
          <li>`{product.itemName} x {product.buyingCount}`</li>
        ))}</TableCell>
                      
                      <TableCell>{order.totalAmount}</TableCell>
                      <TableCell sx={{padding:'0px'}}
                      ><Container sx={{ backgroundColor: getColorByStatus(order.orderStatus), width:'150px', textAlign:'center', borderRadius:'15px' }}>{order.orderStatus}</Container>
                      </TableCell>
                      
                      
                    </TableRow>
                </>
                )
              )}
                
            </TableBody>
        </Table>
        </TableContainer>
        </Stack>
        ) : (
            <Typography variant="body1">No order is placed.</Typography>
        )
)}
                            
                        </Stack>
  )
}
