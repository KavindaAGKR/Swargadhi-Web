
import { Alert, Box, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from '../../Components/Footer';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCardIcon from '@mui/icons-material/AddCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Header } from '../../Components/Header';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { MotionButton } from '../../Components/FramerMotion/MotionButton';

export const CheckOutSi = () => {


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
            <Breadcrumbs aria-label="breadcrumb" sx={{marginLeft:'15px'}}>
            <Typography color="#9A9A9A" component={Link} to="/" sx={{ textDecoration: 'none',fontSize:'13px' }}>
                මුල් පිටුව
            </Typography>
            <Typography color="#9A9A9A" component={Link} to="/cart" sx={{ textDecoration: 'none',fontSize:'13px' }}>
            ගැණුම් ලැයිස්තුව
            </Typography>
            <Typography color="#9A9A9A" sx={{ textDecoration: 'none',fontSize:'13px' }}>
            ඇණවුම
            </Typography>
            </Breadcrumbs>
            <Stack margin="25px">
                <Stack direction="row" margin="auto" color="green" gap={1}>
                    <ShoppingBasketIcon sx={{ fontSize: '60px' }} />
                    <Typography variant="h3" sx={{ marginBottom: '25px' }}>
                    ඇණවුම
                    </Typography>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }}   gap={2}>

                    <Stack width={{ xs: '100%', md: '60%' }}  gap={2} justifyContent="center">
                        <Stack sx={{ backgroundColor: '#DDF9DD', padding: '25px' }}>
                            <Typography variant="h4">බෙදාහැරීමේ විස්තර</Typography>
                            
                            <Table >
                                <TableBody >
                                    <TableRow>
                                        <TableCell>සම්පූර්ණ නම</TableCell>
                                        <TableCell >{user.firstName} {user.lastName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>විද්යුත් තැපෑල</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>දුරකථන අංකය</TableCell>
                                        <TableCell>{mobileNo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>බෙදා හැරීමේ ලිපිනය</TableCell>
                                        <TableCell>{addressL1 ? `${addressL1}, ${addressL2}, ${addressL3}` : ''}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            
                            <Stack margin="20px auto" gap={2} width='auto'>
                                <Button color="success" variant='contained'  onClick={() => setOpen(true)}>විස්තර වෙනස් කරන්න</Button>
                            </Stack>
                        </Stack>
                        <Stack sx={{ backgroundColor: '#DDF9DD', padding: '25px', }}>
                            <Typography variant="h4">ඇණවුම් ලැයිස්තුව</Typography>

                            <TableContainer style={{width:'100%'}}>

                            <Table >
                                <TableHead>
                                    <TableRow width='100%'> 
                                        <TableCell>නිෂ්පාදන නාමය</TableCell>
                                        <TableCell>ඒකකයක මිල</TableCell>
                                        <TableCell>ප්‍රමාණය</TableCell>
                                        <TableCell>එකතුව</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.itemName.si}</TableCell>
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
                        <Typography padding='25px' align="left" variant="h4">ඇණවුම් සාරාංශය</Typography>
                        
                        <ToggleButtonGroup onClick={(e) => handlePaymentMethod(e.target.value)} value={paymentMethod} exclusive orientation="vertical" sx={{ width: '70%', margin: '0px auto' }}>
                            <Typography margin='5px'>ඔබේ ගෙවීමේ ක්‍රමය තෝරන්න: </Typography>
                            <ToggleButton value="cashOnDelivery"><LocalShippingIcon sx={{ fontSize: '100px' }} />භාණ්ඩ ලැබුණ පසු ගෙවන්න</ToggleButton>
                            <ToggleButton value="cardpayment" disabled><AddCardIcon sx={{ fontSize: '100px', display: 'flex', flexDirection: 'column' }} />කාඩ්පත් ගෙවීම</ToggleButton>
                            <Typography color="error">කාඩ්පත් ගෙවීම් තාවකාලිකව අත්හිටුවා ඇත!</Typography>
                        </ToggleButtonGroup>
                        <Typography align="center" variant="h5" margin='15px'>මුලු වටිනාකම: {totalAmount}</Typography>
                        <MotionButton  onClick={()=>{setOpenOrder(true)} } variant='contained' style={{width:'150px', margin:'25px auto'}} >ඇණවුම් කරන්න</MotionButton>
                    </Stack>
                </Stack>
            </Stack>
            <Footer />
            <Dialog open={openDialog} onClose={() => setOpen(false)}>
                <DialogTitle>බෙදා හැරීමේ විස්තර ඇතුළත් කරන්න</DialogTitle>
                <DialogContent>
                    <Stack gap={2}>
                        <TextField label="දුරකථන අංකය" placeholder="දුරකථන අංකය" defaultValue={mobileNo} type="number" inputProps={{ maxLength: 2 }} onChange={(e) => setMobileNo(e.target.value)} />
                        <TextField placeholder="ලිපිනය පළමු පේලිය" defaultValue={addressL1} onChange={(e) => setAddressL1(e.target.value)} />
                        <TextField placeholder="ලිපිනය දෙවන පේලිය" defaultValue={addressL2} onChange={(e) => setAddressL2(e.target.value)} />
                        <TextField placeholder="ලිපිනය තෙවන පේලිය" defaultValue={addressL3} onChange={(e) => setAddressL3(e.target.value)} />
                        <Button variant="contained" onClick={() => (setOpen(false))}>විස්තර සුරකින්න</Button>
                    </Stack>
                </DialogContent>
            </Dialog>

            <Dialog
        open={open}
        
        
      >
        <DialogTitle width={{xs:'250px', sm:'400px'}}>
          {"ඔබ ඇණවුම තහවුරු කරනවාද?"}
        </DialogTitle>
        
        <DialogActions>
          <Button  onClick={()=>setOpenOrder(false)}>අවලංගු කරන්න</Button>
          <Button  autoFocus onClick={handlePlaceOrder}>
          තහවුරු කරන්න
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
