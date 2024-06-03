// AdminOrders.jsx
import React, { useEffect, useState } from 'react';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/orders');
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
      const response = await fetch(`http://localhost:5000/api/orders/orders/${_id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      const updatedOrder = await response.json();
      
      setOrders(orders.map(order => (order._id === updatedOrder._id ? updatedOrder : order)));
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Ordered By</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Order Status</th>
            <th>Delivery Address</th>
            <th>Mobile Number</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.orderedby.firstName} {order.orderedby.lastName}</td>
              <td>
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>
                      {product.itemName} - ${product.price} x {product.buyingCount}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${order.totalAmount}</td>
              <td>{order.paymentMethod}</td>
              <td>
                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Paid">Paid</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              <td>
                {order.deliveryAddress.addressL1}, {order.deliveryAddress.addressL2}, {order.deliveryAddress.addressL3}
              </td>
              <td>{order.mobileNumber}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
