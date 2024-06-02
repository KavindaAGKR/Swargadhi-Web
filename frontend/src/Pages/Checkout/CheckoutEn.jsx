
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../../Components/Footer';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCardIcon from '@mui/icons-material/AddCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Header } from '../../Components/Header';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { MotionButton } from '../../Components/FramerMotion/MotionButton';

export const CheckOutEn = () => {


    const location = useLocation();
    const { cartItems, totalAmount } = location.state;

    const user = useSelector(selectUser);
    const [openDialog, setOpen] = useState(false);
    const [open, setOpenOrder] = useState(false);
    const [mobileNo, setMobileNo] = useState('');
    const [addressL1, setAddressL1] = useState('');
    const [addressL2, setAddressL2] = useState('');
    const [addressL3, setAddressL3] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');


    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [snackMessage, setSnackMessage] = useState('')
    const navigate = useNavigate();

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e);
    };

    const handlePlaceOrder = async () => {

        setOpenOrder(false)
        const orderDetails = {
            cartItems,
            paymentMethod,
            user: user, 
            addressL1,
            addressL2,
            addressL3,
            mobileNo,
            totalAmount
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Order placed successfully:', data);
                // Redirect to order confirmation page or show a success message
                setSnackbarOpen(true)
                setSnackMessage("Order placed successfully")
                
                
                
                
            } else {
                console.error('Error while placing order:', response.statusText);
                setSnackMessage('Error while placing order:', response.statusText)
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setSnackMessage('Error placing order:', error)
        }
        setSnackbarOpen(true)
    };



    return (
        <React.Fragment>
            <Header />
            <Stack margin="25px">
                <Stack direction="row" margin="auto" color="green" gap={1}>
                    <ShoppingBasketIcon sx={{ fontSize: '60px' }} />
                    <Typography variant="h2" sx={{ marginBottom: '25px' }}>
                        Check Out
                    </Typography>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }}   gap={2}>

                    <Stack width={{ xs: '100%', md: '60%' }}  gap={2} justifyContent="center">
                        <Stack sx={{ backgroundColor: '#DDF9DD', padding: '25px' }}>
                            <Typography variant="h4">Delivery Details</Typography>
                            
                            <Table >
                                <TableBody >
                                    <TableRow>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell >{user.firstName} {user.lastName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Mobile Number</TableCell>
                                        <TableCell>{mobileNo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Delivery Address</TableCell>
                                        <TableCell>{addressL1 ? `${addressL1}, ${addressL2}, ${addressL3}` : ''}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            
                            <Stack margin="20px auto" gap={2} width='auto'>
                                <Button color="success" variant='contained'  onClick={() => setOpen(true)}>Edit Details</Button>
                            </Stack>
                        </Stack>
                        <Stack sx={{ backgroundColor: '#DDF9DD', padding: '25px', }}>
                            <Typography variant="h4">Order List</Typography>

                            <TableContainer style={{width:'100%'}}>

                            <Table >
                                <TableHead>
                                    <TableRow width='100%'> 
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Unit Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.itemName}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.buyingCount}</TableCell>
                                            <TableCell>{item.buyingCount * item.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Stack>
                    </Stack>
                    <Stack  gap={1} sx={{ backgroundColor: '#DDF9DD', height: { xs: 'auto', md: '550px' },  width: { xs: '100%', md: '40%' } }} >
                        <Typography padding='25px' align="left" variant="h4">Order Summary</Typography>
                        
                        <ToggleButtonGroup onClick={(e) => handlePaymentMethod(e.target.value)} value={paymentMethod} exclusive orientation="vertical" sx={{ width: '70%', margin: '0px auto' }}>
                            <Typography margin='5px'>Select your payment method: </Typography>
                            <ToggleButton value="cashOnDelivery"><LocalShippingIcon sx={{ fontSize: '100px' }} />Cash on Delivery</ToggleButton>
                            <ToggleButton value="cardpayment" disabled><AddCardIcon sx={{ fontSize: '100px', display: 'flex', flexDirection: 'column' }} />Card Payment</ToggleButton>
                            <Typography color="error">Card Payment isn't available right now!</Typography>
                        </ToggleButtonGroup>
                        <Typography align="center" variant="h5" margin='15px'>Total Amount: {totalAmount}</Typography>
                        <MotionButton  onClick={()=>{setOpenOrder(true)} } variant='contained' style={{width:'150px', margin:'25px auto'}} >Place Order</MotionButton>
                    </Stack>
                </Stack>
            </Stack>
            <Footer />
            <Dialog open={openDialog} onClose={() => setOpen(false)}>
                <DialogTitle>Enter Delivery Details</DialogTitle>
                <DialogContent>
                    <Stack>
                        <TextField label="Mobile Number" placeholder="Mobile Number" defaultValue={mobileNo} type="number" inputProps={{ maxLength: 2 }} onChange={(e) => setMobileNo(e.target.value)} />
                        <TextField placeholder="Address Line 1" defaultValue={addressL1} onChange={(e) => setAddressL1(e.target.value)} />
                        <TextField placeholder="Address Line 2" defaultValue={addressL2} onChange={(e) => setAddressL2(e.target.value)} />
                        <TextField placeholder="Address Line 3" defaultValue={addressL3} onChange={(e) => setAddressL3(e.target.value)} />
                        <Button variant="contained" onClick={() => (setOpen(false))}>Save Details</Button>
                    </Stack>
                </DialogContent>
            </Dialog>

            <Dialog
        open={open}
        
        
      >
        <DialogTitle width={{xs:'250px', sm:'400px'}}>
          {"Confirm Your Order?"}
        </DialogTitle>
        
        <DialogActions>
          <Button  onClick={()=>setOpenOrder(false)}>Cancel</Button>
          <Button  autoFocus onClick={handlePlaceOrder}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>




      <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => { setSnackbarOpen(false); if(snackMessage === "Order placed successfully"){navigate('/user')} }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    sx={{ marginTop: "100px", width:'100%' }}
                    >
                    <Alert
                        autoHideDuration={3000}
                        onClose={() => { setSnackbarOpen(false); if(snackMessage === "Order placed successfully"){navigate('/user')} }}
                        severity={(snackMessage === "Order placed successfully") ? ('success'): ('error') }
                        variant="filled"
                        >
                        {snackMessage}
                    </Alert>
            </Snackbar>
        </React.Fragment>
    );
};
