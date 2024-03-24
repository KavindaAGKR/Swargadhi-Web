import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box, Button, Stack, Dialog, DialogContent, TextField, InputAdornment, IconButton } from '@mui/material';
import NextIcon from '@mui/icons-material/KeyboardArrowRightRounded';

import CancelIcon from '@mui/icons-material/Cancel';







function ProductCard( { product } ) {
    const { name_en, name_si, price, images, itemName , quantity,description} = product;

    const [openMore, setOpenMore] = useState(false);


    
    return (
        <Paper sx={{ height: '350px', borderRadius: '20px' , }} elevation={5}>
            <Stack sx={{ margin: '10px', height:'100%'}}>
                <Stack sx={{ height: '50%', margin: '10px 0px' }}>
                    <Carousel
                        sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        navButtonsAlwaysVisible={true}
                        
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
                                PaperProps={{style:{margin:'0px', padding:'0px'}}}
                                
                                >
                                
                                <DialogContent sx={{ width:{xs:'300px',sm:'500px', lg:'550px' },
                                height:'auto', padding:'0px'
                            }} >

                                <Box direction='column' >
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton onClick={()=>setOpenMore(false)} color='success' ><CancelIcon sx={{ fontSize: 25 , }}/></IconButton>
                                </Box>
                                <Box sx={{  margin: '0 20px', height:'20%' }}>
                                    <Carousel
                                        sx={{ height: '250px',width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius:'20px' }}
                                        navButtonsAlwaysVisible={true}
                                        
                                        indicators={false}
                                        NextIcon={<NextIcon />}
                                    >
                                        {images.map((image, index) => (
                                            <img key={index} src={image} alt={`Slide ${index + 1}`} style={{ maxWidth: '100%', borderRadius: '20px' }} />
                                        ))}
                                    </Carousel>
                                </Box>
                                <Stack sx={{margin: '20px 20px'}}>
                                <Typography variant='h4'>{itemName.en}</Typography>
                                <Typography variant='h7'>{itemName.si}</Typography>
                                
                                <Stack direction='row' margin='30px 0 0 0' justifyContent='space-between'>
                                <Stack direction='row'  >
                                <Typography>Quantity {quantity > 0 ? 
                                    <Typography variant='h7' color='success.main' >(Instock-{quantity})</Typography> :
                                    <Typography variant='h7' color='error'>(Out of Stock)</Typography>
                                } : </Typography>
                                <TextField
                                    type='number'
                                    inputProps={{ min: 0, max:quantity, style: { padding: '0px', display:'all' }  }}
                                    
                                />
                                </Stack>
                                <Typography variant='h6' color='success.main'>Rs. {price}</Typography> 
                                </Stack>
                                
                                <Stack direction='row' justifyContent='space-between' >
                                
                                <Box style={{ height: '150px', overflowY: 'auto', margin:'0px 30px 0 0' }}>
                                    <Typography variant='h7' fontWeight='Bold' >Description: </Typography>
                                    <Typography>{description.en}</Typography>
                                </Box>
                                <Stack direction='column' spacing={3} margin='20px 0 0 0' >
                                    <Button variant='contained' color='success' sx={{ fontSize: '10px', width:'100px' }}>Add to Cart</Button>
                                    <Button variant='contained' color='success' sx={{ fontSize: '10px', width:'100px' }}>Buy Now</Button> 
                                    </Stack>
                                </Stack>
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



