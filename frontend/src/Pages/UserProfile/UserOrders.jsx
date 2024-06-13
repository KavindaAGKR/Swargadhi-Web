import { CircularProgress, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const UserOrders = ({userId}) => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);


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
    <Stack  sx={{margin:{xs:'0', sm:'0 15px'},  minHeight:'300px'}}>
                            <Typography variant="h5" mb='30px' ml={{xs:'15px' , sm:'0'}} >My Orders</Typography>

{loading?(<CircularProgress alignSelf='center' color="success" sx={{margin:'auto'}}/>):
(
    orders.length ? (
                                
        <Stack alignSelf='center' sx={{width:{xs:'100%', md:'90%'}, mb:'35px'}} >

        <TableContainer style={{width:'100%', overflowX:'auto', backgroundColor:'white', borderRadius:'15px', alignSelf:'center'}}>
        <Table stickyHeader size='small' >
          <TableHead >


              <TableRow  >
              <TableCell size='small'align='center' rowSpan={2}   sx={{fontWeight:'bold', }}>Date</TableCell>
                <TableCell size='small' align='center' sx={{fontWeight:'bold', width:'200px' }}  colSpan={2}>Products</TableCell>
                <TableCell size='small' align='center' rowSpan={2}  sx={{fontWeight:'bold' }}>Total Amount</TableCell>
                
                <TableCell size='small' align='center' rowSpan={2} sx={{fontWeight:'bold' }}>Order Status</TableCell>
                
              </TableRow>
              <TableRow >
              
              <TableCell size='small' sx={{fontWeight:'bold', width:'200px', minWidth:'150px', pl:'50px'  }}>Name</TableCell>
              <TableCell size='small' align='center' sx={{fontWeight:'bold', width:'100px'}}>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice().reverse().map(
                (order) => (
                <>
                
                  <TableRow key={order._id} >
                  <TableCell sx={{width:'150px'}}>{new Date(order.createdAt).toLocaleString()}</TableCell>
                      
<TableCell colSpan={2}>
  
  
        {order.products.map((product, index) => (
          
          <TableRow sx={{borderBottom:'solid  transparent'}}> <TableCell  size='small'sx={{ width:'250px',borderBottom:'solid  transparent'}}><li>{product.itemName.en}</li></TableCell>
          <TableCell align='center' size='small' sx={{ width:'100px',borderBottom:'solid  transparent'}}>{product.buyingCount}</TableCell></TableRow>
            
        ))}
        
  
</TableCell>
                      
                      <TableCell align='center'>{order.totalAmount}</TableCell>
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
