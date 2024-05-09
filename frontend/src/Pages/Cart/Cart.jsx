import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Stack, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartCard } from './CartCard';

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, removeItemFromCart,  } from '../../redux/slices/cartSlice';

export const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const [productTotalPrices, setProductTotalPrices] = useState({});

    const updateProductTotalPrice = useCallback((productId, totalPrice) => {
        setProductTotalPrices((prevPrices) => ({
            ...prevPrices,
            [productId]: totalPrice
        }));
    }, []);

    const handleRemoveItem = (productItemID) => {
        dispatch(removeItemFromCart(productItemID));
        updateProductTotalPrice(productItemID, 0); // Reset total price for removed item
    };


// subTotal
const subTotal = Object.values(productTotalPrices).reduce((acc, curr) => acc + curr, 0);
const discount = 10;
const total = subTotal*(100-discount)/100;
const deliveryFee = 450;
const totalAmount = total + deliveryFee;



    return (
        <React.Fragment>
            <Header />
            <Stack>
                <Typography textAlign='center' variant='h3' padding='25px'>
                    <ShoppingCartIcon fontSize='30' /> My Cart
                </Typography>

                {cartItems.length === 0 ? (
                    <Stack direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                        <Typography variant='h5'>Your cart is empty</Typography>
                        <Button variant='contained' onClick={() => navigate('/shop')}>
                            Shop Now
                        </Button>
                    </Stack>
                ) : (
                    <Stack direction='row' padding='20px'>
                        <Stack sx={{ width: '70%' }} justifyContent='center' alignItems='center' spacing={5}>
                            {cartItems.map((item) => (
                                <CartCard key={item.productItemID} item={item} onRemoveItem={handleRemoveItem}  updateProductTotalPrice={updateProductTotalPrice} />
                            ))}
                        </Stack>
                        <Stack sx={{ width: '30%' }}>
                            <Paper elevation={5} sx={{ padding: '50px' }}>
                                <Grid container spacing={2}>
                                <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>Sub Total</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h6'>{subTotal}</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>Discount</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h6'>{discount}%</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>Delivery Charges</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h6'>{deliveryFee}</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h5'>Total Cost</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h5'> {totalAmount}</Typography>
                                    </Grid>
                                </Grid>

                                <Stack margin='25px auto' width='60%'>
                                    <Button variant='contained'>Proceed to Checkout</Button>
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
