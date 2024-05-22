// import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Footer } from '../../Components/Footer';
// import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
// import AddCardIcon from '@mui/icons-material/AddCard';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import { Header } from '../../Components/Header';

// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/slices/userSlice';

// export const CheckOut = () => {
//     const location = useLocation();
//     const { cartItems,  totalAmount } = location.state;

//     const user = useSelector(selectUser);
//     const [openDialog, setOpen] = useState(false);
//     const [mobileNo , setMobileNo] = useState('');
//     const [addressL1, setAddressL1] = useState('');
//     const [addressL2, setAddressL2] = useState('');
//     const [addressL3, setAddressL3] = useState('');

//     const[paymentMethod, setPaymentMethod] = useState('cashOnDelivery')

//     // let checkoutDetail = [
//     //     products={product:{cartItems},
//     //     count:cartItems.buyingCount},
//     //     paymentIntent = {paymentMethod},
//     //     orderedby = {user},
//     //     deliveryAddress = [addressL1,addressL2,addressL3],
//     //     mobileNumber = mobileNo,
//     // ]

// const handlePaymentMethod = (e)=>{

//     setPaymentMethod(e)
// }


// console.log(paymentMethod)
//     return (
//         <React.Fragment>
//             <Header/>
//             <Stack>
            
//             <Stack direction='row' margin="auto" color='green' gap={1}>
//                 <ShoppingBasketIcon sx={{fontSize:'60px'}} />
//                 <Typography  variant='h2'  sx={{marginBottom:'25px'}}>
//                 Check Out
//                 </Typography>
//                 </Stack>


//             <Stack direction={{xs:'column', md:'row'}} gap={3} justifyContent='center' >
//                 <Stack  margin='25px' gap={5} sx={{backgroundColor:'#DDF9DD', height:'500px', padding:'25px', width:{xs:'90%', md:'40%'}}}>
//                     <Typography align='left' variant='h4'>Oreder Summary</Typography>
//                     <Typography align='center' variant='h5'>Total Amount: {totalAmount}</Typography>
//                     <ToggleButtonGroup  onClick={(e)=>handlePaymentMethod(e.target.value)} value={paymentMethod} exclusive  orientation='vertical' sx={{width:'70%', margin:'auto'}}>
//                         <Typography>Select your payment method:</Typography>
//                         <ToggleButton value='cashOnDelivery' ><LocalShippingIcon sx={{fontSize:'100px'}}/>Cash on Delivery</ToggleButton>
//                         <ToggleButton value='cardpayment' disabled ><AddCardIcon sx={{fontSize:'100px',display:'flex', flexDirection:'column'}} />Card Payment</ToggleButton>
                        
//                         <Typography color='error'>Card Payment isn't available right now!</Typography>
//                     </ToggleButtonGroup>
//                     <Button>Place Order</Button>
//                 </Stack>


//                 <Stack width={{xs:'90%', md:'60%'}} margin='25px' gap={2}>
//                     <Stack sx={{backgroundColor:'#DDF9DD', padding:'25px'}}>
//                     <Typography variant='h4'>Delivery Details</Typography>

//                     <Table >
                            
                        
//                         <TableBody>
                        
//                             <TableRow >
//                             <TableCell >Full Name</TableCell>
//                             <TableCell>{user.firstName} {user.lastName}</TableCell>
//                             </TableRow>

//                             <TableRow >
//                             <TableCell >Email</TableCell>
//                             <TableCell>{user.email}</TableCell>
//                             </TableRow>

//                             <TableRow >
//                             <TableCell >Mobile Number</TableCell>
//                             <TableCell>{mobileNo}</TableCell>
//                             </TableRow>

//                             <TableRow >
//                             <TableCell >Delivery Address</TableCell>
//                             <TableCell>{addressL1 ? `${addressL1}, ${addressL2}, ${addressL3}` : ''}</TableCell>
//                             </TableRow>
//                         </TableBody>
//                         </Table>


//                     <Stack margin='20px' gap={2} >
                    

//                     <Button  color='success' onClick={()=> setOpen(true)}>Edit Details</Button>
//                     </Stack>
//                     </Stack>
//                     <Stack sx={{backgroundColor:'#DDF9DD', padding:'25px'}}>
//                         <Typography variant='h4'>
//                             Order List
//                         </Typography>
                        
//                         <Table >
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell >Product Name</TableCell>
//                                     <TableCell>Unit Price</TableCell>
//                                     <TableCell>Quentity</TableCell>
//                                     <TableCell>Total</TableCell>
//                                 </TableRow>
//                             </TableHead>
                        
//                         <TableBody>
//                         {
//                             cartItems.map((item, index)=>(
//                             <TableRow key={index } >
//                             <TableCell >{item.itemName}</TableCell>
//                             <TableCell>{item.price}</TableCell>
//                             <TableCell>{item.buyingCount}</TableCell>
//                             <TableCell>{item.buyingCount * item.price}</TableCell>
//                             </TableRow>
                            
//                         ))
//                         }
//                         </TableBody>
//                         </Table>
//                     </Stack>
//                 </Stack>
//             </Stack>
//             </Stack>
//             <Footer/>

// <Dialog open={openDialog} onClose={()=>setOpen(false)}>
//     <DialogTitle>Enter Delivery Details</DialogTitle>
//     <DialogContent>
//         <Stack>
//         <TextField label='Mobile Number' placeholder='Mobile Number' defaultValue={mobileNo} type='number' inputProps={{ maxLength: 2 }} onChange={(e)=>setMobileNo(e.target.value)}/>
//         <TextField placeholder='Address' defaultValue={addressL1} onChange={(e)=>setAddressL1(e.target.value)}/>
//         <TextField placeholder='Address' defaultValue={addressL2} onChange={(e)=>setAddressL2(e.target.value)}/>
//         <TextField placeholder='Address' defaultValue={addressL3} onChange={(e)=>setAddressL3(e.target.value)}/>
//         <Button variant='contained' onClick={()=>(setOpen(false))}>Save Details</Button>
//         </Stack>
//     </DialogContent>
// </Dialog>
//         </React.Fragment>
//     );
// };
























import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../../Components/Footer';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCardIcon from '@mui/icons-material/AddCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Header } from '../../Components/Header';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { MotionButton } from '../../Components/FramerMotion/MotionButton';

export const CheckOut = () => {
    const location = useLocation();
    const { cartItems, totalAmount } = location.state;

    const user = useSelector(selectUser);
    const [openDialog, setOpen] = useState(false);
    const [mobileNo, setMobileNo] = useState('');
    const [addressL1, setAddressL1] = useState('');
    const [addressL2, setAddressL2] = useState('');
    const [addressL3, setAddressL3] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e);
    };

    const handlePlaceOrder = async () => {
        const orderDetails = {
            cartItems,
            paymentMethod,
            user: user, // Ensure user object is being passed correctly
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
            } else {
                console.error('Error placing order:', response.statusText);
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
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
                            <Table width='300px'>
                                <TableBody width='300px'>
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
                            <Stack margin="20px" gap={2}>
                                <Button color="success" onClick={() => setOpen(true)}>Edit Details</Button>
                            </Stack>
                        </Stack>
                        <Stack sx={{ backgroundColor: '#DDF9DD', padding: '25px' }}>
                            <Typography variant="h4">Order List</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
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
                        </Stack>
                    </Stack>
                    <Stack  gap={1} sx={{ backgroundColor: '#DDF9DD', height: '550px',  width: { xs: '100%', md: '40%' } }} >
                        <Typography padding='25px' align="left" variant="h4">Order Summary</Typography>
                        
                        <ToggleButtonGroup onClick={(e) => handlePaymentMethod(e.target.value)} value={paymentMethod} exclusive orientation="vertical" sx={{ width: '70%', margin: '0px auto' }}>
                            <Typography margin='5px'>Select your payment method: </Typography>
                            <ToggleButton value="cashOnDelivery"><LocalShippingIcon sx={{ fontSize: '100px' }} />Cash on Delivery</ToggleButton>
                            <ToggleButton value="cardpayment" disabled><AddCardIcon sx={{ fontSize: '100px', display: 'flex', flexDirection: 'column' }} />Card Payment</ToggleButton>
                            <Typography color="error">Card Payment isn't available right now!</Typography>
                        </ToggleButtonGroup>
                        <Typography align="center" variant="h5" margin='15px'>Total Amount: {totalAmount}</Typography>
                        <MotionButton  onClick={handlePlaceOrder} variant='contained' style={{width:'150px', margin:'auto'}} >Place Order</MotionButton>
                    </Stack>
                </Stack>
            </Stack>
            <Footer />
            <Dialog open={openDialog} onClose={() => setOpen(false)}>
                <DialogTitle>Enter Delivery Details</DialogTitle>
                <DialogContent>
                    <Stack>
                        <TextField label="Mobile Number" placeholder="Mobile Number" defaultValue={mobileNo} type="number" inputProps={{ maxLength: 2 }} onChange={(e) => setMobileNo(e.target.value)} />
                        <TextField placeholder="Address" defaultValue={addressL1} onChange={(e) => setAddressL1(e.target.value)} />
                        <TextField placeholder="Address" defaultValue={addressL2} onChange={(e) => setAddressL2(e.target.value)} />
                        <TextField placeholder="Address" defaultValue={addressL3} onChange={(e) => setAddressL3(e.target.value)} />
                        <Button variant="contained" onClick={() => (setOpen(false))}>Save Details</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};
