import React, { useState } from 'react';

import { Paper, Typography, Stack, Button, Dialog, DialogContent, TextField, InputAdornment, IconButton, Snackbar, Alert, Box, Container } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';


import { useDispatch, useSelector } from 'react-redux';
import { addToCart, } from '../../redux/slices/cartSlice';
import {selectIsLoggedIn} from '../../redux/slices/userSlice'
import { selectCartItems } from '../../redux/slices/cartSlice';
import {  motion } from "framer-motion"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation   } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


const ProductCard = ({ product }) => {


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




    const { itemName, description, price, imageUrl, quantity } = product; 
    const [openMore, setOpenMore] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(0);


    //


    // const handleAddToCart = () => {
    //     console.log(`Added ${selectedQuantity} ${itemName} to cart`);
    // };

    // Render images using Carousel component
    const renderImages = () => {

        if (imageUrl && imageUrl.length > 0) {
            return (
                

                <Swiper
                style={{width:'100%', color:'green', '--swiper-navigation-color': ' #B2BEB5',
                '--swiper-navigation-size': '25px',borderRadius: '20px',
                }}
                spaceBetween={15}
                slidesPerView={1}
                autoplay={{ delay: 4000000,}}
                navigation={true}
                modules={[Autoplay,Navigation]}
                className="mySwiper"
                speed={1200}
                loop={true}
                
                >
                
                {imageUrl.map((image, index) => (
                    <SwiperSlide key={index} style={{display:'flex' ,alignItems:'center', justifyContent:'center', margin:'auto'}} >
                        <img
                            
                            src={`http://localhost:5000${image}`} 
                            alt={`Slide ${index + 1}`}
                            style={{ maxWidth: '100%',borderRadius: '20px',  height:'100%', margin:'auto' }}
                            
                            onError={(e) => {
                                console.error(`Failed to load image ${index}: ${e.target.src}`);
                                e.target.onerror = null; 
                            }}
                        />
                        </SwiperSlide>
                    ))}
            </Swiper>
            );
        } else {
            return <Typography variant="body1">No images available</Typography>;
        }
        
        
    };




    return (
        <Paper sx={{ height: '350px', borderRadius: '20px' }} elevation={5} 
        component={motion.div} 
            whileHover={{
                scale: 1.06,
                transition: { duration: 0.3 },
                color:'Black'
            }}
            initial={{ opacity: 0 , y:50}}
            whileInView={{ opacity: 1,y:0,  }}
            viewport={{ amount:0.4 , once: true}}
            transition={{ duration: 2 }}
            


        >
                        
            
            <Stack sx={{ margin: '10px', height: '100%' }}>
                <Stack sx={{ height: '50%', margin: '10px 0px' }}>
                    {renderImages()}
                </Stack>
                <Stack height='50%' sx={{ padding: '0 10px' }}>
                    
                    <Typography variant='h5' sx={{fontWeight:'bold'}}>{itemName}</Typography>
                    
                    <Typography variant='h6' color='success.main'>Rs. {price}</Typography>
                    <Stack direction='row' justifyContent='center' spacing={2}>
                        <Button variant='contained' color='success' size='small' onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                        <Button
                            variant='outlined'
                            color='success'
                            size='small'
                            onClick={() => setOpenMore(true)}
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
                <Dialog open={openMore} onClose={() => setOpenMore(false)} >
                    <DialogContent sx={{ width:{xs:'300px',sm:'500px', lg:'550px' },
                                height:'500px', padding:'0px'
                            }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton onClick={()=>setOpenMore(false)} color='success' ><CancelIcon sx={{ fontSize: 25 , }}/></IconButton>
                                </Box>
                        <Stack direction='column' alignItems='center' justifyContent='center'>
                                
                                <Stack sx={{  margin: '0 20px', height:'200px', width:'80%' }} height='50%' style={{
                    
                    '--swiper-navigation-color': 'white',
                    '--swiper-pagination-color': '#0DFE0D',
                }} >
                        
                            {renderImages()}
                            </Stack>
                            </Stack>
                            <Stack sx={{ margin: '20px', textAlign: 'left' }}>
                            <Typography variant='h3' mt={2}>{itemName}</Typography>
                            <Typography variant='body1'>{description}</Typography>
                            <Typography variant='body1'> Avilable Quantity: {quantity}</Typography>
                            <Typography variant='h5' color='success.main'> Unit Price: {price}</Typography>
                            <Stack direction='row' justifyContent='center' mt={2}>
                                <Button variant='contained' color='success' onClick={handleAddToCart}>
                                    Add to Cart
                                </Button>


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


                
            </Stack>


        </Paper>
    );
};

export default ProductCard;
