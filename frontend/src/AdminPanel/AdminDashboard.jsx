import { Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import TotSales from '../Images/Admin/TotSales.png'
import TotOrders from '../Images/Admin/TotOrders.png'
import TotProducts from '../Images/Admin/TotProducts.png'

import { FetchOrders } from './AdminApis/FetchOrders'
import { FetchAdminProducts } from './AdminApis/FetchAdminProducts'


export const AdminDashboard = () => {
  const {orders} = FetchOrders();
  const {products} = FetchAdminProducts();

  let totalSales = 0;
  orders.forEach(order => { totalSales += order.totalAmount})

  let totalOrders = orders.length;
  let totalProducts = products.length;

  const latestOrders = orders.slice(-6).reverse();

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




  return (
    <Stack padding={{xs:'10px', sm:'25px'}}>
      <Typography variant='h4' textAlign='center'>Dashboard</Typography>
      <Stack direction={{xs:'column', sm:'row'}} justifyContent='space-evenly' gap={{xs:5, sm:5, md:10}} sx={{backgroundColor:'white', padding:'10px', margin:'20px', borderRadius:'15px'}}>
      <Stack direction='row' m='auto'>
        <img width='50px' height='50px' src={TotSales}></img>
        <Stack height='50px'>
        <Typography variant='h7' color='success.main'>Total Sales</Typography>
        <Typography>Rs. {totalSales}</Typography>
        </Stack>
      </Stack>
      <Stack direction='row' m='auto'>
        <img width='50px' height='50px' src={TotOrders}></img>
        <Stack height='50px'>
        <Typography variant='h7' color='success.main'>Total Orders</Typography>
        <Typography>{totalOrders}</Typography>
        </Stack>
      </Stack>
      <Stack direction='row' m='auto'>
        <img width='50px' height='50px' src={TotProducts}></img>
        <Stack height='50px'>
        <Typography variant='h7' color='success.main'>Total Products</Typography>
        <Typography>{totalProducts}</Typography>
        </Stack>
      </Stack>
      </Stack>


      <Stack>
        <Typography variant='h6' margin='20px 0px'>Latest Orders</Typography>
      <TableContainer style={{width:'100%', margin:'auto', backgroundColor:'white', borderRadius:'15px'}}>
      <Table >
        {/* <TableHead >
            <TableRow  sx={{borderBottom:'solid  transparent'}}> 
              <TableCell sx={{fontWeight:'bold' }}>Name</TableCell>
              <TableCell sx={{fontWeight:'bold' }}>Total Amount</TableCell>
              <TableCell sx={{fontWeight:'bold' }}>Mobile Number</TableCell>
              <TableCell sx={{fontWeight:'bold' }}>Order Status</TableCell>
              <TableCell sx={{fontWeight:'bold' }}>Date</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {latestOrders.map(
              (order) => (
              <>
                <TableRow key={order._id} sx={{borderBottom:'solid  transparent'}}>
                    <TableCell>{order.orderedby ? `${order.orderedby.firstName || ''} ${order.orderedby.lastName || ''}`.trim() || "N/A" : "N/A"}</TableCell>
                    <TableCell>{order.mobileNumber}</TableCell>
                    <TableCell>{order.totalAmount}</TableCell>
                    <TableCell sx={{padding:'0px'}}
                    ><Container sx={{ backgroundColor: getColorByStatus(order.orderStatus), width:'150px', textAlign:'center', borderRadius:'15px' }}>{order.orderStatus}</Container>
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                    
                  </TableRow>
              </>
              )
            )}
              
          </TableBody>
      </Table>
      </TableContainer>
      </Stack>





    </Stack>
  )
}




