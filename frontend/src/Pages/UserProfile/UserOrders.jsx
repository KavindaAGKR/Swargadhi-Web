import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const UserOrders = ({userId}) => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchUserOrders();

    }, [userId]);



    const fetchUserOrders = async () => {

        try {
            const response = await axios.get(`http://localhost:5000/api/orders/orders/user/${userId}`);
            setOrders(response.data);

        } catch (error) {
            console.error('Error fetching user orders:', error);
            
        }
    };



  return (
    <Stack width='80%'>
                            <Typography variant="h5" gutterBottom>Orders</Typography>
                            {orders.length ? (
                                orders.map((order) => (
                                    <div key={order._id}>
                                        <Typography variant="body1">Status: {order.orderStatus}</Typography>
                                        <Typography variant="body1">Total Amount: ${order.totalAmount}</Typography>
                                        <Typography variant="body1">Products:</Typography>
                                        <ul>
                                            {order.products.map((product, index) => (
                                                <li key={index}>
                                                    <Typography variant="body2">
                                                        {product.itemName.en} - {product.buyingCount} x ${product.price}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body1">No order is placed.</Typography>
                            )}
                        </Stack>
  )
}
