import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '../../Components/Footer';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCardIcon from '@mui/icons-material/AddCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Header } from '../../Components/Header';

import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';

export const CheckOut = () => {
    const location = useLocation();
    const { cartItems, discount, subTotal, total, deliveryFee, totalAmount } = location.state;

    const user = useSelector(selectUser);
    const [openDialog, setOpen] = useState(false);
    const [mobileNo , setMobileNo] = useState('');
    const [addressL1, setAddressL1] = useState('');
    const [addressL2, setAddressL2] = useState('');
    const [addressL3, setAddressL3] = useState('');

    const[paymentMethod, setPaymentMethod] = useState('')

    // let checkoutDetail = [
    //     products={product:{cartItems},
    //     count:cartItems.buyingCount},
    //     paymentIntent = {paymentMethod},
    //     orderedby = {user},
    //     deliveryAddress = [addressL1,addressL2,addressL3],
    //     mobileNumber = mobileNo,


    // ]

const handlePaymentMethod = (e)=>{

    setPaymentMethod(e)
}


console.log(user)
    return (
        <React.Fragment>
            <Header/>
            <Stack>
            <Typography textAlign='center' variant='h3' padding='25px'>
                    <ShoppingBasketIcon fontSize='30' />Check Out
            </Typography>

            <Stack direction={{xs:'column', md:'row'}} gap={3} justifyContent='center'>
                <Stack width={{xs:'90%', md:'40%'}}>
                    <Typography>Oreder Summary</Typography>
                    <Typography>Total Amount: {totalAmount}</Typography>
                    <ToggleButtonGroup  onClick={(e)=>handlePaymentMethod(e.target.value)} value={paymentMethod} exclusive  orientation='vertical'>
                        <ToggleButton value='cardpayment' disabled ><AddCardIcon sx={{fontSize:'100px',display:'flex', flexDirection:'column'}} />Card Payment</ToggleButton>
                        <ToggleButton value='cashondelivery' ><LocalShippingIcon sx={{fontSize:'100px'}}/>Cash on Delivery</ToggleButton>
                        <Typography color='error'>Card Payment isn't available right now!</Typography>
                    </ToggleButtonGroup>
                    <Button>Place Order</Button>
                </Stack>




                <Stack width={{xs:'90%', md:'60%'}}>
                    <Stack>
                    <Typography>Delivery Details</Typography>
                    <Typography>Full Name:  {user.firstName} {user.lastName}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Mobile Number: {mobileNo}</Typography>
                    <Typography>
    Delivery Address: {addressL1 ? `${addressL1}, ${addressL2}, ${addressL3}` : ''}
</Typography>

                    <Button  color='success' onClick={()=> setOpen(true)}>Edit Details</Button>
                    </Stack>
                    <Stack>
                        <Typography>
                            Order List
                        </Typography>
                        {
                            cartItems.map((item, key)=>(<Typography key={item.productItemID}>{item.itemName} - {item.buyingCount}</Typography>))
                        }
                    </Stack>
                </Stack>
            </Stack>
            </Stack>
            <Footer/>


<Dialog open={openDialog} onClose={()=>setOpen(false)}>
    <DialogTitle>Enter Delivery Details</DialogTitle>
    <DialogContent>
        <TextField placeholder='Mobile Number' defaultValue={mobileNo} type='number' inputProps={{ maxLength: 2 }} onChange={(e)=>setMobileNo(e.target.value)}/>
        <TextField placeholder='Address' defaultValue={addressL1} onChange={(e)=>setAddressL1(e.target.value)}/>
        <TextField placeholder='Address' defaultValue={addressL2} onChange={(e)=>setAddressL2(e.target.value)}/>
        <TextField placeholder='Address' defaultValue={addressL3} onChange={(e)=>setAddressL3(e.target.value)}/>
        <Button variant='contained' onClick={()=>(setOpen(false))}>Save Details</Button>
    </DialogContent>

</Dialog>


        </React.Fragment>
    );
};

