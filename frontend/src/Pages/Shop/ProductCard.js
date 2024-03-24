import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box, Button, Stack, Dialog, DialogContent } from '@mui/material';
import NextIcon from '@mui/icons-material/KeyboardArrowRightRounded';









function ProductCard( { product } ) {
    const { name_en, name_si, price, images, itemName } = product;

    const [openMore, setOpenMore] = useState(false);


    
    return (
        <Paper sx={{ height: '350px', borderRadius: '20px' }} elevation={5}>
            <Stack sx={{ margin: '10px', height:'100%'}}>
                <Stack sx={{ height: '50%', margin: '10px 0px' }}>
                    <Carousel
                        sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        navButtonsAlwaysVisible={true}
                        autoPlay={false}
                        indicators={false}
                        NextIcon={<NextIcon />}
                    >
                        {images.map((image, index) => (
                            <img key={index} src={image} alt={name_en} style={{ maxWidth: '100%', borderRadius: '20px' }} />
                        ))}
                    </Carousel>
                </Stack>
                <Stack height='50%'>
                <Typography variant='h5'>{itemName.en}</Typography>
                <Typography variant='h7'>{itemName.si}</Typography>
                <Typography variant='h6' color='success.main'>{price}</Typography>
                <Stack gap={5} direction='row' sx={{ justifyContent: 'center' }}>
                    <Button variant='contained' color='success' sx={{ fontSize: '10px' }}>Add to Cart</Button>
                    <Button variant='contained' color='success' sx={{ fontSize: '10px' }} onClick={()=>setOpenMore(true)}>View More</Button>
                    </Stack>
                                <Dialog
                                open = {openMore}
                                
                                >
                                
                                <DialogContent sx={{ width:'500px'}}>
                                <Box direction='column' >
                                <Button onClick={()=>setOpenMore(false)}>close</Button>
                                <Box sx={{  margin: '10px 0px' }}>
                                    <Carousel
                                        sx={{ height: '250px',width:'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
                                <Stack>
                                <Typography variant='h5'>{itemName.en}</Typography>
                                <Typography variant='h7'>{itemName.si}</Typography>
                                <Typography variant='h6' color='success.main'>{price}</Typography>  
                                </Stack>
                                </Box>
                                </DialogContent>
                            
                            </Dialog>
                            
                
                </Stack>
            </Stack>
        </Paper>
    );
}

export default ProductCard;
