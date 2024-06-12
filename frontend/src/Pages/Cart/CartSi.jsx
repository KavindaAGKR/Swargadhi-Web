import React from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Paper, Stack, Typography, Button, Breadcrumbs } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { selectCartItems   } from '../../redux/slices/cartSlice';
import { CartCardSi } from './Sinhala/CartCardSi';




export const CartSi = () => {

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
            <Breadcrumbs   Breadcrumbs aria-label="breadcrumb" sx={{marginLeft:'15px'}}>
            <Typography color="#9A9A9A" component={Link} to="/" sx={{ textDecoration: 'none',fontSize:'13px' }}>
            මුල් පිටුව
            </Typography>
            
            <Typography color="#9A9A9A"  sx={{ textDecoration: 'none',fontSize:'13px' }}>
            ගැණුම් ලැයිස්තුව
            </Typography>

        </Breadcrumbs>
            <Stack>
            <Stack direction='row' margin="auto" color='green' gap={1}>
                <ShoppingCartIcon sx={{fontSize:'50px'}} />
                <Typography  variant='h4'  sx={{marginBottom:'50px'}}>
                ගැණුම් ලැයිස්තුව
                </Typography>
                </Stack>
                

                {cartItems.length === 0 ? (
                    <Stack direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                        <Typography variant='h5'>ඔබගේ ගැණුම් ලැයිස්තුව හිස්.</Typography>
                        <Button variant='contained' onClick={() => navigate('/shop')}>
                        නිෂ්පාදන මිලට ගන්න
                        </Button>
                    </Stack>
                ) : (
                    <Stack direction={{xs:'column',md:'row'}}   margin='20px' >
                        <Stack sx={{ width: {xs:'95%', md:'65%'} }} justifyContent='center' alignItems='center' gap={5} margin='20px auto' >
                            {cartItems.map((item) => (
                                <CartCardSi key={item.productItemID} item={item} />
                            ))}
                            <Button variant='contained' onClick={() => navigate('/shop')}>
                            තවත් නිෂ්පාදන මිලට ගන්න
                        </Button>
                        </Stack>
                        <Stack sx={{ width: {xs:'100%',sm:'80%', md:'35%'}, margin:'20px auto ' }} >
                            <Paper elevation={5} sx={{ padding: '50px' }}>
                                <Grid container spacing={2}>
                                <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>උප එකතුව</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h6'>{subTotal.toString()}</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>වට්ටම්</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h6'>{discount.toString()}%</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h6'>බෙදාහැරීමේ ගාස්තු</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h6'>{deliveryFee.toString()}</Typography>
                                    </Grid>
                                    <Grid item xs={8} md={8}>
                                        <Typography variant='h5'>මුළු පිරිවැය</Typography>
                                    </Grid>
                                    <Grid item xs={4} md={4}>
                                        <Typography variant='h5'> {totalAmount.toString()}</Typography>
                                    </Grid>
                                </Grid>

                                <Stack margin='25px auto' width='auto'>
                                    <Button variant='contained' onClick={()=> {
                                        HandleCheckout();
                                    }}>ඇණවුම සකසන්න</Button>
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

