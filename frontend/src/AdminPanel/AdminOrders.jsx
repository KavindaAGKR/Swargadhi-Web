import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress, Stack, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { FetchOrders} from './AdminApis/FetchOrders';

export const AdminOrders = () => {

  const {orders, loading, error, handleStatusChange} = FetchOrders();
  const [value, setValue] = useState('Not Processed');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
};




  const filterOrdersByStatus = (status) => {
    return orders.reverse().filter(order => order.orderStatus === status).map(order => ({
      id: order._id,
      orderedBy: order.orderedby ? `${order.orderedby.firstName || ''} ${order.orderedby.lastName || ''}`.trim() || "N/A" : "N/A",
      products: order.products.map((product, index) => (
        `${product.itemName} x ${product.buyingCount}`
      )).join(", "),
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      orderStatus: order.orderStatus,
      deliveryAddress: `${order.deliveryAddress.addressL1}, ${order.deliveryAddress.addressL2}, ${order.deliveryAddress.addressL3}`,
      mobileNumber: order.mobileNumber,
      dateOrdered: new Date(order.createdAt).toLocaleString(),
    }));
  };

  const columns = [
    { field: 'orderedBy', headerName: 'Ordered By', width: 150 },
    {
      field: 'products',
      headerName: 'Products',
      width: 300,
      renderCell: (params) => (
        <ul>
          {params.value.split(", ").map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      )
    },
    { field: 'totalAmount', headerName: 'Total Amount', width: 130 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 150 },
    {
      field: 'orderStatus',
      headerName: 'Order Status',
      width: 180,
      renderCell: (params) => (
        <select
          value={params.value}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
        >
          <option value="Not Processed">Not Processed</option>
          
          <option value="Processing">Processing</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Delivered">Delivered</option>
          <option value="Paid">Paid</option>
        </select>
      )
    },
    { field: 'deliveryAddress', headerName: 'Delivery Address', width: 300 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
    { field: 'dateOrdered', headerName: 'Ordered Time', width: 200 },
  ];

  const orderStatuses = ["Not Processed", "Processing", "Dispatched", "Delivered", "Paid", "Cancelled"];


  if (loading) {
    return <Stack  height='100%'><Typography variant='h5' margin='auto'><CircularProgress color="success" /></Typography></Stack>;
  }
  if (error) {
    return <Stack  height='100%'><Typography variant='h5' margin='auto'>{error}</Typography></Stack>;
  }

  return (
    <Stack spacing={3}  sx={{justifyContent:'center', alignItems:'center', margin:'10px', pt:'25px' }}>
      <Typography variant='h3' >Orders</Typography>

      <TabContext value={value}  >
                    
                        <Box width={{xs:'95%', md:'75%'}}>
                        <TabList
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            width='100%'
                        >
                          {orderStatuses.map(status =>
                            (<Tab label={status} value={status} key={status} />)
                          )}


                        </TabList>
                        </Box>


{
  orderStatuses.map(status =>(
    <TabPanel value={status} key={status} sx={{width:'100%', padding:'0px'}}>
      {filterOrdersByStatus(status).length>0 ? (
      <DataGrid
              rows={filterOrdersByStatus(status)}
              getRowHeight={() => 'auto'}
              columns={columns}
              pageSize={5}
              sx={{ backgroundColor: 'white' }}
            />
            ): (<Typography textAlign='center'>No any '{status}' orders</Typography>)}
                    
                    </TabPanel>
  ))
}
                    
                    
                
                </TabContext>

    </Stack>
  );
};
