import  { useEffect, useState } from 'react';
import config from '../../config';

export const FetchOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
          const response = await fetch(`${config.baseURL}/api/orders/orders`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setOrders(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setError('Error fetching orders');
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (_id, newStatus) => {
      try {
          const response = await fetch(`${config.baseURL}/api/orders/orders/${_id}/status`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ status: newStatus })
          });

          if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Failed to update order status: ${errorText}`);
          }

          const updatedOrder = await response.json();
          setOrders(orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order)));
      } catch (error) {
          console.error('Error updating order status:', error);
          setError('Failed to update order status');
      }
  };

    return { orders, loading, error, handleStatusChange };
};
