import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Stack, Button, Dialog, DialogContent, TextField, InputAdornment, IconButton } from '@mui/material';
import NextIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CancelIcon from '@mui/icons-material/Cancel';

const ProductCard = ({ product }) => {
    const { itemName, description, price, imageUrl, quantity } = product; // Destructure product details
    const [openMore, setOpenMore] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState(0);

    const handleAddToCart = () => {
        console.log(`Added ${selectedQuantity} ${itemName} to cart`);
    };

    // Render images using Carousel component
    const renderImages = () => {
        if (imageUrl && imageUrl.length > 0) {
            return (
                <Carousel
                    sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    navButtonsAlwaysVisible={true}
                    indicators={false}
                    NextIcon={<NextIcon />}
                >
                    {imageUrl.map((image, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000${image}`} // Prepend base URL to image path
                            alt={`Slide ${index + 1}`}
                            style={{ maxWidth: '100%', borderRadius: '20px' }}
                            onError={(e) => {
                                console.error(`Failed to load image ${index}: ${e.target.src}`);
                                e.target.onerror = null; // Prevent infinite error loops
                            }}
                        />
                    ))}
                </Carousel>
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
                    <Typography variant='h5'>{itemName}</Typography>
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
        </Paper>
    );
};

export default ProductCard;
