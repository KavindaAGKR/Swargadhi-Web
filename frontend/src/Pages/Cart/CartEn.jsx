import React, { useState, useEffect } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Paper, Stack, Typography, Button, Breadcrumbs, Snackbar, Alert } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartCard } from './CartCard';
import { useSelector } from 'react-redux';
import { selectCartItems   } from '../../redux/slices/cartSlice';




export const CartEn = () => {

    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const [error, setError] = useState(false);



    const discount = 10;
    const subTotal = cartItems.reduce((total, item) => total + (item.buyingCount * item.price), 0);
    const total = subTotal*(100-discount)/100;
    const deliveryFee = 450;
    const totalAmount = total + deliveryFee;



    const handleClose = () => {
        setError(false);
      };

      
    const HandleCheckout = () => {

        const hasError = cartItems.some(item => item.buyingCount <= 0 || item.quantity < item.buyingCount|| !totalAmount);
        setError(hasError);

        if(!hasError){
            navigate('/checkout', {
                state: {
                    cartItems: cartItems,
                    totalAmount: totalAmount,
                },
            });
        }

        
    };




    return (
        <React.Fragment>
            <Header />
            <Breadcrumbs   Breadcrumbs aria-label="breadcrumb" sx={{marginLeft:'15px'}}>
            <Typography color="#9A9A9A" component={Link} to="/" sx={{ textDecoration: 'none',fontSize:'13px' }}>
            Home
            </Typography>
            
            <Typography color="#9A9A9A"  sx={{ textDecoration: 'none',fontSize:'13px' }}>
            Cart
            </Typography>

        </Breadcrumbs>
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
                            <Paper elevation={5} sx={{ borderRadius:'15px',padding: '50px' }}>
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
            
<Snackbar open={error} onClose={handleClose}
  autoHideDuration={5000}>
  <Alert
    severity="error"
    variant="filled"
    onClose={handleClose}
    sx={{ width: '200px' }}
  >
    Invalid Quantity!
  </Alert>
</Snackbar>



        </React.Fragment>
    );
};