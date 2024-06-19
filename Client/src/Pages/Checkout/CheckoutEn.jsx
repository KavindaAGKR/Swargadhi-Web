
import { Alert, Breadcrumbs, Button, Dialog, DialogActions, DialogContent,  DialogTitle,Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../../Components/Footer';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCardIcon from '@mui/icons-material/AddCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Header } from '../../Components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { MotionButton } from '../../Components/FramerMotion/MotionButton';
import { removeCart } from '../../redux/slices/cartSlice';
import config from '../../config';

export const CheckOutEn = () => {


    const location = useLocation();
    const { cartItems, totalAmount } = location.state;
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    console.log("asdasdsadsad" + user)
    const [openDialog, setOpen] = useState(false);
    const [open, setOpenOrder] = useState(false);
    const [mobileNo, setMobileNo] = useState(user.mobileNumber);
    const [addressL1, setAddressL1] = useState(user.deliveryAddress?.addressL1);
    const [addressL2, setAddressL2] = useState(user.deliveryAddress?.addressL2);
    const [addressL3, setAddressL3] = useState(user.deliveryAddress?.addressL3);
    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
    const [error, setError] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [snackMessage, setSnackMessage] = useState('')
    const navigate = useNavigate();

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e);
    };



    const handleOpenOrder = () =>{
        if(mobileNo===undefined ){
            setSnackbarOpen(true)
            setSnackMessage("Enter the mobile number in the delivery details");
            return;
        }else if((addressL1===undefined ||  addressL1==='')){
            setSnackbarOpen(true)
            setSnackMessage("Enter your address in the delivery details");
            return;
        }else if(!paymentMethod){
            setSnackbarOpen(true)
                setSnackMessage("Select a payment method");
                return;
        }
        setOpenOrder(true)
    }

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
            const response = await fetch(`${config.baseURL}/api/orders/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Order placed successfully:', data);
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
            <Breadcrumbs aria-label="breadcrumb" sx={{marginLeft:'15px'}}>
            <Typography color="#9A9A9A" component={Link} to="/" sx={{ textDecoration: 'none',fontSize:'14px' }}>
                Home
            </Typography>
            <Typography color="#9A9A9A" component={Link} to="/cart" sx={{ textDecoration: 'none',fontSize:'14px' }}>
                Cart
            </Typography>
            <Typography color="#9A9A9A" sx={{ textDecoration: 'none',fontSize:'14px' }}>
                Checkout
            </Typography>
            </Breadcrumbs>
            <Stack margin="25px">
                <Stack direction="row" margin="auto" color="green" gap={1}>
                    <ShoppingBasketIcon sx={{ fontSize: '60px' }} />
                    <Typography variant="h2" sx={{ marginBottom: '25px' }}>
                        Check Out
                    </Typography>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }}   gap={2}>

                    <Stack width={{ xs: '100%', md: '60%' }}   gap={2} justifyContent="center">
                        <Stack sx={{ backgroundColor: '#DDF9DD',borderRadius:'15px', padding: '25px' }}>
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
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>{mobileNo || "Add a phone number"} </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Delivery Address</TableCell>
                                        <TableCell>{ [addressL1, addressL2, addressL3].filter(Boolean).join(', ') || "Add an address"}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            
                            <Stack margin="20px auto" gap={2} width='auto'>
                                <Button color="success" variant='contained'  onClick={() => setOpen(true)}>Edit Details</Button>
                            </Stack>
                        </Stack>
                        <Stack sx={{ backgroundColor: '#DDF9DD',borderRadius:'15px', padding: '25px', }}>
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
                                            <TableCell>{item.itemName.en}</TableCell>
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
                    <Stack  gap={1} sx={{pb:'25px', backgroundColor: '#DDF9DD',borderRadius:'15px', height: { xs: 'auto', md: '550px' },  width: { xs: '100%', md: '40%' } }} >
                        <Typography padding='25px' align="left" variant="h4">Order Summary</Typography>
                        
                        <ToggleButtonGroup onClick={(e) => handlePaymentMethod(e.target.value)} value={paymentMethod} exclusive orientation="vertical" sx={{ width: '70%', margin: '0px auto' }}>
                            <Typography margin='5px'>Select your payment method: </Typography>
                            <ToggleButton value="cashOnDelivery"><LocalShippingIcon sx={{ fontSize: '100px' }} />Cash on Delivery</ToggleButton>
                            <ToggleButton value="cardpayment" disabled><AddCardIcon sx={{ fontSize: '100px', display: 'flex', flexDirection: 'column' }} />Card Payment</ToggleButton>
                            <Typography color="error">Card Payment isn't available right now!</Typography>
                        </ToggleButtonGroup>
                        <Typography align="center" variant="h5" margin='15px'>Total Amount: {totalAmount}</Typography>
                        <MotionButton  onClick={()=>handleOpenOrder() } variant='contained' stylee={{width:'150px', margin:'15px auto'}} >Place Order</MotionButton>
                    </Stack>
                </Stack>
            </Stack>
            <Footer />
            <Dialog open={openDialog} PaperProps={{ sx: { borderRadius: "25px" } }}>
            <Typography variant='h5' margin={{xs:'20px 40px', sm:'20px 100px'}}>Enter Delivery Details</Typography>
                <DialogContent>
                    <Stack gap={2}>
                        <TextField 
                        label="Mobile Number" 
                        placeholder="Phone Number" 
                        defaultValue={mobileNo} 
                        type="number" 
                        onChange={(e) => {
                            setMobileNo(e.target.value);
                             if(e.target.value.length !==10)
                                {setError(true);}
                             else
                                {setError(false);}}} 
                        error={error}
                        helperText={error ? 'Phone number must have 10 digits' : ''}
                        sx={{
                            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {display: "none",},
                           }}
                        />
                        <TextField placeholder="Address Line 1" defaultValue={addressL1} onChange={(e) => setAddressL1(e.target.value)} />
                        <TextField placeholder="Address Line 2" defaultValue={addressL2} onChange={(e) => setAddressL2(e.target.value)} />
                        <TextField placeholder="Address Line 3" defaultValue={addressL3} onChange={(e) => setAddressL3(e.target.value)} />
                        <Button variant="contained" color='success' sx={{width:'150px', margin:'20px auto'}} 
                        onClick={() => (
                            !error ? setOpen(false): ('') )}>Save Details</Button>
                    </Stack>
                </DialogContent>
            </Dialog>

            <Dialog
        open={open}
        PaperProps={{ sx: { borderRadius: "25px" } }}
        
      >
        <DialogTitle width={{xs:'250px', sm:'500px'}} sx={{margin:'10px 0 0 0px'}}>
          {"Confirm Your Order?"}
        </DialogTitle>
        
        <DialogActions sx={{margin:'15px 20px'}}>
          <Button  onClick={()=>setOpenOrder(false)}>Cancel</Button>
          <Button variant='contained' color='success' autoFocus onClick={handlePlaceOrder}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>




      <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={5000}
                    onClose={() => { setSnackbarOpen(false); 
                        if(snackMessage === "Order placed successfully")
                            {navigate('/user', { state: { select: 'MyOrders' } }); dispatch(removeCart());};
                     }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    sx={{ marginTop: "50px", width:'100%' }}
                    >
                    <Alert
                        
                        onClose={() => { setSnackbarOpen(false); if(snackMessage === "Order placed successfully"){navigate('/user', { state: { select: 'MyOrders' } }); dispatch(removeCart());} }}
                        severity={(snackMessage === "Order placed successfully") ? ('success'): ('error') }
                        variant="filled"
                        >
                        {snackMessage}
                    </Alert>
            </Snackbar>
        </React.Fragment>
    );
};
