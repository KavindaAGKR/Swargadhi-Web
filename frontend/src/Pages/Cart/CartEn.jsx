import React, { useState, useEffect } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Stack, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartCard } from './CartCard';
import { useSelector } from 'react-redux';
import { selectCartItems   } from '../../redux/slices/cartSlice';




export const CartEn = () => {

    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();




    const discount = 10;
    const subTotal = cartItems.reduce((total, item) => total + (item.buyingCount * item.price), 0);
    const total = subTotal*(100-discount)/100;
    const deliveryFee = 450;
    const totalAmount = total + deliveryFee;

    const HandleCheckout = () => {
        navigate('/checkout', {
            state: {
                cartItems: cartItems,
                totalAmount: totalAmount,
            },
        });
    };




    return (
        <React.Fragment>
            <Header />
            <Stack>
            <Stack direction='row' margin="auto" color='green' gap={1}>
                <ShoppingCartIcon sx={{fontSize:'60px'}} />
                <Typography  variant='h3'  sx={{marginBottom:'50px'}}>
                     My Cart
                </Typography>
                </Stack>
                

                {cartItems.length === 0 ? (
                    <Stack direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                        <Typography variant='h5'>Your cart is empty</Typography>
                        <Button variant='contained' onClick={() => navigate('/shop')}>
                            Shop Now
                        </Button>
                    </Stack>
                ) : (
                    <Stack direction={{xs:'column',md:'row'}}   margin='20px' >
                        <Stack sx={{ width: {xs:'95%', md:'65%'} }} justifyContent='center' alignItems='center' gap={5} margin='20px auto' >
                            {cartItems.map((item) => (
                                <CartCard key={item.productItemID} item={item} />
                            ))}
                            <Button variant='contained' onClick={() => navigate('/shop')}>
                            Buy More Products
                        </Button>
                        </Stack>
                        <Stack sx={{ width: {xs:'100%',sm:'80%', md:'35%'}, margin:'20px auto ' }} >
                            <Paper elevation={5} sx={{ padding: '50px' }}>
                                <Grid container spacing={2}>
                                <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>Sub Total</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h6'>{subTotal.toString()}</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>Discount</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h6'>{discount.toString()}%</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>Delivery Charges</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h6'>{deliveryFee.toString()}</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h5'>Total Cost</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h5'> {totalAmount.toString()}</Typography>
                                    </Grid>
                                </Grid>

                                <Stack margin='25px auto' width='auto'>
                                    <Button variant='contained' onClick={()=> {
                                        HandleCheckout();
                                    }}>Proceed to Checkout</Button>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Stack>
                )}
            </Stack>
            <Footer />
        </React.Fragment>
    );
};