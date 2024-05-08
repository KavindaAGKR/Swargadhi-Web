import React, { useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Stack, Button, Dialog, DialogContent, TextField, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';


import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import {selectIsLoggedIn} from '../../redux/slices/userSlice'
import { selectCartItems } from '../../redux/slices/cartSlice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation   } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


const ProductCard = ({ product }) => {


    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for controlling Snackbar visibility
    const [snackMessage, setSnackMessage] = useState('')


    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const cartItems = useSelector(selectCartItems);

    const handleAddToCart = () => {

        const isProductInCart = cartItems.some(item => item.productItemID === product.productItemID);

        if(isLoggedIn){

            if(isProductInCart){
                setSnackMessage("The product is already in the cart")
                
            }
            else{
                dispatch(addToCart(product));
                setSnackMessage("Product added to the cart")
                
            }
            
        }
        else{
            setSnackMessage("You must Sign In to add products to the cart")
            
            
            
        }
        setSnackbarOpen(true)
    };




    const { itemName, description, price, imageUrl, quantity } = product; // Destructure product details
    const [openMore, setOpenMore] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(0);


    //
    const [firstImgLoaded, setFirstImgLoaded] = useState(false);

    // const handleAddToCart = () => {
    //     console.log(`Added ${selectedQuantity} ${itemName} to cart`);
    // };

    // Render images using Carousel component
    const renderImages = () => {

        


        if (imageUrl && imageUrl.length > 0) {
            return (
                
                // <Carousel
                //     sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center',overflowY:'hidden', overflowX: 'hidden' }}
                //     navButtonsAlwaysVisible={false}
                //     indicators={false}
                //     duration={1}
                //     changeOnFirstRender={true}
                    
                    
                // >
                //     {imageUrl.map((image, index) => (
                //         <img
                //             key={index}
                //             src={`http://localhost:5000${image}`} // Prepend base URL to image path
                //             alt={`Slide ${index + 1}`}
                //             style={{ maxWidth: '100%', borderRadius: '20px', }}
                            
                //             onError={(e) => {
                //                 console.error(`Failed to load image ${index}: ${e.target.src}`);
                //                 e.target.onerror = null; // Prevent infinite error loops
                //             }}
                //         />
                //     ))}
                // </Carousel>
                <Swiper
                style={{width:'100%', color:'green'}}
                spaceBetween={15}
                slidesPerView={1}
                autoplay={{ delay: 4000,}}
                navigation={true}
                modules={[Autoplay,Navigation]}
                className="mySwiper"
                speed={1200}
                loop={true}
                >
                
                {imageUrl.map((image, index) => (
                    <SwiperSlide>
                        <img
                            key={index}
                            src={`http://localhost:5000${image}`} // Prepend base URL to image path
                            alt={`Slide ${index + 1}`}
                            style={{ maxWidth: '100%', borderRadius: '20px', }}
                            
                            onError={(e) => {
                                console.error(`Failed to load image ${index}: ${e.target.src}`);
                                e.target.onerror = null; // Prevent infinite error loops
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
        <Paper sx={{ height: '350px', borderRadius: '20px' }} elevation={5}>
            <Stack sx={{ margin: '10px', height: '100%' }}>
                <Stack sx={{ height: '50%', margin: '10px 0px' }}>
                    {renderImages()}
                </Stack>
                <Stack height='50%' sx={{ padding: '0 10px' }}>
                    
                    <Typography variant='h5'>{itemName.si}</Typography>
                    <Typography variant='body1'>{description}</Typography>
                    <Typography variant='h6' color='success.main'>Rs. {price}</Typography>
                    <Stack direction='row' justifyContent='center' spacing={2}>
                        <Button variant='contained' color='success' size='small' onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                        <Button
                            variant='contained'
                            color='success'
                            size='small'
                            onClick={() => setOpenMore(true)}
                        >
                            View More
                        </Button>
                    </Stack>
                </Stack>
                <Dialog open={openMore} onClose={() => setOpenMore(false)} fullWidth maxWidth='sm'>
                    <DialogContent>
                        <Stack sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => setOpenMore(false)} color='success'>
                                <CancelIcon />
                            </IconButton>
                        </Stack>
                        <Stack sx={{ margin: '20px', textAlign: 'center' }}>
                            {renderImages()}
                            <Typography variant='h5' mt={2}>{itemName}</Typography>
                            <Typography variant='body1'>{description}</Typography>
                            <Stack direction='row' justifyContent='center' mt={2}>
                                <TextField
                                    type='number'
                                    label='Quantity'
                                    InputProps={{
                                        inputProps: { min: 0, max: quantity },
                                        startAdornment: <InputAdornment position="start">In stock: {quantity}</InputAdornment>,
                                    }}
                                    value={selectedQuantity}
                                    onChange={(e) => setSelectedQuantity(e.target.value)}
                                />
                            </Stack>
                            <Stack direction='row' justifyContent='center' mt={2}>


                                <Button variant='contained' color='success' onClick={handleAddToCart}>
                                    Add to Cart
                                </Button>





                                




                            </Stack>
                        </Stack>
                    </DialogContent>
                </Dialog>
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
                        severity={(snackMessage == "Product added to the cart") ? ('success'): ('error') }
                        variant="filled"
                        sx={{ width: '100%' }}>
                        {snackMessage}
                    </Alert>
            </Snackbar>
        </Paper>
    );
};

export default ProductCard;
