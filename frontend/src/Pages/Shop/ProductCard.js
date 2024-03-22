// import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
// import React from 'react'

// export const ProductCard = ({ product }) => {
//   return (
//     // <Box>
//     //   <Card sx={{ maxWidth: 340, maxHeight: 500, margin: 'auto' }}>
//     //     <CardActionArea>
//     //       <CardMedia
//     //         component="img"
//     //         height="250"
//     //         width="20"
//     //         image={product.image}
//     //         alt={product.name}
//     //       />
//     //       <CardContent>
//     //         <Typography gutterBottom variant="h5" component="div">
//     //           {product.name}
//     //         </Typography>
//     //         <Typography variant="body2" color="text.secondary">
//     //           {product.description}
//     //         </Typography>
//     //         <Typography variant="h6" color="text.primary">
//     //           {product.price}
//     //         </Typography>
//     //       </CardContent>
//     //     </CardActionArea>
//     //     <CardContent>
//     //       <Button variant="contained" color="primary">
//     //         Add to Cart
//     //       </Button>
//     //       <Button variant="outlined" color="primary" sx={{ marginLeft: '10px' }}>
//     //         View More
//     //       </Button>
//     //     </CardContent>
//     //   </Card>
//     // </Box>
//         <Box>

//         </Box>


//   )
// }


import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Typography, Box, Button, Stack } from '@mui/material';
import NextIconn from '@mui/icons-material/KeyboardArrowRightRounded';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import PrevIcon from '@mui/icons-material/ArrowBackIosOutlined';
import slide1 from '../Images/Slider3.png';
import slide2 from '../Images/Slider2.png';
import Slide3 from '../Images/Slider1.jpg';

function ProductCard(props) {
    const items = [
        {
            name: "The Product1",
            Sname: "කරබ්මු නාකරබ්මු නා",
            price: 4856,
            imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
        }
    ];

    const allImages = items.flatMap(item => item.imageUrl);

    return (
        <Paper sx={{ height: '350px', borderRadius: '20px' }} elevation={5}>
            <Stack sx={{margin:'10px'}}>
            <Box sx={{ height: '50%',margin:'10px 0px'  }}>
                <Carousel
                    sx={{ height: '100%',   display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    navButtonsAlwaysVisible={true}
                    autoPlay={false}
                    indicators={false}
                    NextIcon={<NextIconn   />}
                    
                >
                    {allImages.map((image, index) => (
                        <img key={index} src={image} alt={`Slide ${index + 1}`} style={{ maxWidth: '100%', borderRadius: '20px',  }} />
                    ))}
                </Carousel>
            </Box>
            <Typography variant='h5'>{items.map( (i) => i.name)}</Typography>
            <Typography variant='h7'>{items.map( (i) => i.Sname)}</Typography>
            <Typography variant='h6' color='success.main' >{items.map( (i) => i.price)}</Typography>
            <Stack gap={5} direction='row' sx={{justifyContent:'center' }}>
            <Button variant='contained' color='success' sx={{fontSize:'10px'}}>Add to cart</Button>
            <Button variant='contained' color='success' sx={{fontSize:'10px'}}>View more</Button>

            </Stack>
            </Stack>
        </Paper>
    );
}

export default ProductCard;
