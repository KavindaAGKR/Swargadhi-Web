import React, {useState, useEffect} from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { updateItemBuyingCount, removeItemFromCart } from '../../redux/slices/cartSlice';



export const CartCard = ({ item}) => {

    const { itemName,  price, imageUrl, quantity , productItemID,buyingCount} = item;
    const dispatch = useDispatch();


    const [buyingCountt, setBuyingCount] = useState(1)
    const [error, setError] = useState(false)
    const productTotPrice = buyingCountt*price;


    const handleBuyingCountChange = (value) => {
        setBuyingCount(value);
        dispatch(updateItemBuyingCount({ productItemID, buyingCount: value }));
        if (value>quantity || value<1) {
            setError(true);
          } 
          else{setError(false)}
    };


const handleRemoveClick = () => {
    dispatch(removeItemFromCart(productItemID));
        

        
    };







    // const firstImageUrl = Object.values(imageUrl)[0];
    return (
        <Stack justifyContent='space-between' direction='row' sx={{ borderRadius: '20px', border: 'solid 1px #B1FDC5', boxShadow: ' 5px 10px 13px -6px rgba(0,0,0,0.2)', width: '80%', padding: '10px', height:'100px' }}>
            
            
            
            <Box sx={{width:'20%', }}>
            {Object.values(imageUrl).slice(0, 1).map((image, index) => (
    <img
        key={index}
        src={`http://localhost:5000${image}`} 
        alt={`Slide ${index + 1}`}
        style={{ height:'100%',width:'100%', borderRadius: '20px' }}
        onError={(e) => {
            console.error(`Failed to load image ${index}: ${e.target.src}`);
            e.target.onerror = null; 
        }}
    />
))}
            </Box>


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
                        onChange={(e) => {handleBuyingCountChange(parseInt(e.target.value));
                            // setBuyingCount(e.target.value)
                        }}
                        
                        error={error}
                        helperText={error? 'Invalid quentity': ''}
                        defaultValue={buyingCount || 1}
                        inputProps={{ min: 1, max: quantity, style: { padding: '0px 0px 0 10px', display: 'all', width:'40px' } }}
                    />
                </Stack>
                {quantity > 0 ? (
                    <Typography variant='h7' color='success.main' >(In stock: {quantity})</Typography>
                ) : (
                    <Typography variant='h7' color='error'>(Out of Stock)</Typography>
                )}
            </Stack>
            <Typography variant='h6' color='success.main' width='10%'>Rs.{productTotPrice}</Typography>
            <IconButton color='error' sx={{ width: '1px', height: '1px' }} onClick={handleRemoveClick}><CancelIcon sx={{ fontSize: 25 }} /></IconButton>
        </Stack>
    );
};
