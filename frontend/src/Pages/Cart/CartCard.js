import React from 'react';
import { IconButton, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';




export const CartCard = ({ item, onRemoveItem }) => {

    const { itemName, description, price, imageUrl, quantity , productItemID} = item;

    const handleRemoveClick = () => {
        onRemoveItem(productItemID);
    };
    
    // console.log(imageUrl)
    const firstImageUrl = Object.values(imageUrl)[0];
    return (
        <Stack justifyContent='space-between' direction='row' sx={{ borderRadius: '20px', border: 'solid 1px #B1FDC5', boxShadow: ' 5px 10px 13px -6px rgba(0,0,0,0.2)', width: '80%', padding: '10px' }}>
            
            
            
            {Object.values(imageUrl).slice(0, 1).map((image, index) => (
    <img
        key={index}
        src={`http://localhost:5000${image}`} // Prepend base URL to image path
        alt={`Slide ${index + 1}`}
        style={{ width:'20%', borderRadius: '20px' }}
        onError={(e) => {
            console.error(`Failed to load image ${index}: ${e.target.src}`);
            e.target.onerror = null; // Prevent infinite error loops
        }}
    />
))}


            <Stack direction='column' width='40%'>
                <Typography>{itemName}</Typography>
                <Typography>{itemName.si}</Typography>
                <Typography>Unit price: Rs. {price}</Typography>
            </Stack>
            <Stack direction='column' width='20%'>
                <Stack direction='row'>
                    <Typography>Quantity : </Typography>
                    <TextField
                        type='number'
                        inputProps={{ min: 1, max: quantity, style: { padding: '0px', display: 'all' } }}
                    />
                </Stack>
                {quantity > 0 ? (
                    <Typography variant='h7' color='success.main' >(In stock: {quantity})</Typography>
                ) : (
                    <Typography variant='h7' color='error'>(Out of Stock)</Typography>
                )}
            </Stack>
            <Typography variant='h6' color='success.main' width='10%'>Rs. {price}</Typography>
            <IconButton color='error' sx={{ width: '1px', height: '1px' }} onClick={handleRemoveClick}><CancelIcon sx={{ fontSize: 25 }} /></IconButton>
        </Stack>
    );
};
