import React, { useState } from 'react';

import { Paper, Typography, Stack, Button, Dialog, DialogContent, IconButton, Snackbar, Alert, Box } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';


import { useDispatch, useSelector } from 'react-redux';
import { addToCart, } from '../../redux/slices/cartSlice';
import {selectIsLoggedIn} from '../../redux/slices/userSlice'
import { selectCartItems } from '../../redux/slices/cartSlice';
import {  motion } from "framer-motion"
import { ProductSwiper } from './ProductSwiper';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {

    const navigate = useNavigate();


    const [snackbarOpen, setSnackbarOpen] = useState(false); 
    const [snackMessage, setSnackMessage] = useState('')


    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const cartItems = useSelector(selectCartItems);





    const handleAddToCart = () => {

        const isProductInCart = cartItems.some(item => item.productItemID === product.productItemID);
        const { productId, quantity, price } = product;
        if(isLoggedIn){

            if(isProductInCart){
                setSnackMessage("The product is already in the cart")
                
            }
            else{
                dispatch(addToCart(product));
                // dispatch(sendCartData(product));
                setSnackMessage("Product added to the cart")
                
            }
            
        }
        else{
            setSnackMessage("You must Sign In to add products to the cart")
            
            
            
        }
        setSnackbarOpen(true)
    };

    const handleBuyNow = () =>{
        const isProductInCart = cartItems.some(item => item.productItemID === product.productItemID);
        const { productId, quantity, price } = product;
        if(isLoggedIn){

            if(isProductInCart){
                
                navigate('/cart')
                
            }
            else{
                dispatch(addToCart(product));
                navigate('/cart')
                
            }
            
        }
        

    }




    const { itemName, description, price, imageUrl, quantity } = product; 
    const [openMore, setOpenMore] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(0);



    return (
        <Paper sx={{ height: '400px', borderRadius: '20px', margin:'5px',  }} 
        elevation={5}
        
        component={motion.div} 
            whileHover={{
                scale: 1.0,
                transition: { duration: 0.1 },
                color:'Black',
                
                
            }}
            initial={{ opacity: 0,transition: { duration: 0.1 },}}
            whileInView={{ opacity: 1 , transition: { duration: 1 },  }}
            viewport={{ amount:0.3 , once: true}}
            
            


        >
            
            
            <Stack sx={{ margin: '10px', height: '100%' }} >
                <Stack sx={{ height: '50%', margin: '10px 0px' }}>
                    <ProductSwiper imageUrl={imageUrl}/>
                </Stack>
                <Stack height='50%' sx={{ padding: '0 10px' , overflowY:'unset'}} justifyContent='space-evenly'>
                    
                    <Typography variant='h5' noWrap={false} sx={{fontWeight:'semiBold'}}>{itemName}</Typography>
                    <Typography  noWrap={false} >සිංහල නම මෙහි දැක්වේ</Typography>
                    <Typography variant='h6' color='success.main'>Rs. {price}</Typography>
                    <Stack direction='row' justifyContent='center' spacing={2} padding='0px 0px 5px 0px '>
                        <Button variant='contained' color='success' size='small' sx={{padding:'10px 5px', width:'200px'}} onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                        <Button
                            variant='outlined'
                            color='success'
                            size='small'
                            onClick={() => setOpenMore(true)}
                            sx={{padding:'0px', width:'200px'}}
                        >
                            View More
                        </Button>
                    </Stack>
                    <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => { setSnackbarOpen(false);  }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    sx={{ marginTop: "100px", width:'100%' }}
                    >
                    <Alert
                        onClose={() => { setSnackbarOpen(false);  }}
                        severity={(snackMessage === "Product added to the cart") ? ('success'): ('error') }
                        variant="filled"
                        >
                        {snackMessage}
                    </Alert>
            </Snackbar>
                </Stack>


                


                
            </Stack>




            <Dialog open={openMore} onClose={() => setOpenMore(false)} sx={{ width:{xs:'300px',sm:'500px', lg:'700px' },
                                height:'1000px', margin:'auto'
                            }} overflow={false}>
                    <DialogContent  >
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton onClick={()=>setOpenMore(false)} color='success' ><CancelIcon sx={{ fontSize: 25 , }}/></IconButton>
                                </Box>
                        <Stack direction='column' alignItems='center' justifyContent='center'>
                                
                                <Stack sx={{  margin: '0 20px', height:'200px', width:'80%' }} height='50%' style={{
                    
                    '--swiper-navigation-color': 'white',
                    '--swiper-pagination-color': '#0DFE0D',
                }} >
                        
                            <ProductSwiper imageUrl={imageUrl}/>
                            </Stack>
                            </Stack>
                            <Stack sx={{ margin: '20px', textAlign: 'left' }}>
                            <Typography variant='h4' mt={2} noWrap={false}>{itemName}</Typography>

                            
                            <Stack direction='row' justifyContent='space-between' margin='30px 0'>
                            <Typography variant='h6'> Avilable Quantity: {quantity}</Typography>
                            <Typography variant='h5' color='success.main'> Unit Price: {price}</Typography>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between' mt={2} gap={10}>
                            <Stack>
                            <Typography variant='h6'>Description:</Typography>
                            <Typography variant='body1'>{description}</Typography>
                            </Stack>
                                <Stack gap={5} >
                                <Button variant='contained'  color='success' sx={{padding:'5px 10px', width:'140px'}} onClick={handleAddToCart}>
                                    Add to Cart
                                </Button>
                                <Button variant='contained' color='success' sx={{padding:'5px', width:'140px'}} onClick={handleBuyNow}>
                                    Buy Now
                                </Button>
                                </Stack>


                            </Stack>
                        </Stack>
                        <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={() => { setSnackbarOpen(false);  }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    sx={{ marginTop: "100px" }}
                    >
                    <Alert
                        onClose={() => { setSnackbarOpen(false);  }}
                        severity={(snackMessage === "Product added to the cart") ? ('success'): ('error') }
                        variant="filled"
                        sx={{ width: '100%' }}>
                        {snackMessage}
                    </Alert>
            </Snackbar>
                    </DialogContent>
                </Dialog>

        </Paper>
    );
};

export default ProductCard;
