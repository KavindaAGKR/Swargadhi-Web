import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box, Button, Stack } from '@mui/material';
import NextIcon from '@mui/icons-material/KeyboardArrowRightRounded';

function ProductCard( { product } ) {
    const { name_en, name_si, price, images } = product;



    
    return (
        <Paper sx={{ height: '350px', borderRadius: '20px' }} elevation={5}>
            <Stack sx={{ margin: '10px' }}>
                <Box sx={{ height: '50%', margin: '10px 0px' }}>
                    <Carousel
                        sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        navButtonsAlwaysVisible={true}
                        autoPlay={false}
                        indicators={false}
                        NextIcon={<NextIcon />}
                    >
                        {images.map((image, index) => (
                            <img key={index} src={image} alt={`Slide ${index + 1}`} style={{ maxWidth: '100%', borderRadius: '20px' }} />
                        ))}
                    </Carousel>
                </Box>
                <Typography variant='h5'>{name_en}</Typography>
                <Typography variant='h7'>{name_si}</Typography>
                <Typography variant='h6' color='success.main'>{price}</Typography>
                <Stack gap={5} direction='row' sx={{ justifyContent: 'center' }}>
                    <Button variant='contained' color='success' sx={{ fontSize: '10px' }}>Add to Cart</Button>
                    <Button variant='contained' color='success' sx={{ fontSize: '10px' }}>View More</Button>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default ProductCard;
