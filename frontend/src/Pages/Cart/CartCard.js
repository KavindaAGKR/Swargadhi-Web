import { IconButton, Paper, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import slide1 from '../Images/Slider1.jpg'
import slide2 from '../Images/Slider2.png'
import slide3 from '../Images/Slider3.png'




const product = [
{
    productItemID: "8",
    itemName: { 
        en: "Product 8", 
        si: "නිෂ්පාදනය 8" 
    },
    price: 79.99,
    description: { 
        en: "Description of Product 8", 
        si: "නිෂ්පාදනය 8 විස්තර" 
    },
    quantity: 35,
    category: { 
        en: "Category 8", 
        si: "ප්‍රවර්ගය 8" 
    },
    images: [slide1, slide2, slide3]
},
]

export const CartCard = () => {

    const quantity = 55;

    return (
    
        <Stack justifyContent='space-between' direction='row' sx={{borderRadius:'20px', border:'solid 1px #B1FDC5', boxShadow:' 5px 10px 13px -6px rgba(0,0,0,0.2)', width:'80%', padding:'10px'}}>
            <img src={product[0].images[1]} alt='product img' width='20%' style={{borderRadius:'20px'}} />
            <Stack direction='column'>
                <Typography>Product name_endsffff fffffff fffffffffdddd ddddddd ddddddddd</Typography>
                <Typography>Product name_si</Typography>
                <Typography>Unit price</Typography>
            </Stack>
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
            <Typography variant='h6' color='success.main'>Rs. 8989</Typography>
            <IconButton  color='error' ><CancelIcon sx={{ fontSize: 25 , }}/></IconButton> 
        </Stack>

    )
}
