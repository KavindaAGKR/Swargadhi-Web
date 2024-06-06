import React, {useState, useEffect} from 'react';
import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { updateItemBuyingCount, removeItemFromCart } from '../../redux/slices/cartSlice';



export const CartCard = ({ item}) => {

    const { itemName,  price, images, quantity , productItemID,buyingCount} = item;

    const dispatch = useDispatch();


     const [buyingCountt, setBuyingCount] = useState(buyingCount)
    const [error, setError] = useState(false)
    const productTotPrice = buyingCount*price;


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
         <Stack justifyContent='space-between' direction='row' sx={{ borderRadius: '20px', border: 'solid 1px #B1FDC5', boxShadow: ' 5px 10px 13px -6px rgba(0,0,0,0.2)', width:{xs:'90%',md:'80%'}, padding: '20px', height:{xs:'150px', sm:'120px'} }}>



<Grid container gap={2}>
    <Grid item xs={3.5} sm={2.5} margin='auto'>
    {Object.values(images).slice(0, 1).map((image, index) => (
        <img
        key={index}
        src={`http://localhost:5000/${image}`}
        alt={`Product Image ${index + 1}`}
        style={{ width: '100%', height: '120px', marginRight: 10 }}
        onError={(e) => {
            console.error(`Failed to load image ${index}: ${e.target.src}`);
            e.target.onerror = null;
        }}
    />

))}
    </Grid>
    <Grid container item xs={6.5} sm={8.0}>

    <Grid item xs={12} sm={6}>
    <Stack direction='column' width='100%'>
                <Typography noWrap fontWeight='bold' variant='h6'>{itemName.en}</Typography>
                <Typography noWrap>{itemName.si}</Typography>
                <Typography noWrap>Unit price: Rs. {price}</Typography>
            </Stack>
    </Grid>
    <Grid item xs={12} sm={3.5}>
    <Stack direction='column' minWidth='55%'>
                <Stack direction='row'>
                    <Typography>Quantity </Typography>
                    <TextField
                        type='number'
                        onChange={(e) => {handleBuyingCountChange(parseInt(e.target.value));
                        
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
    </Grid>
    <Grid item xs={12} sm={2}>
    <Typography variant='h6' color='success.main' width='40%'>Rs.{productTotPrice}</Typography>
    </Grid>
    


    </Grid>
    <Grid item xs={0.1} sm={0.2}>
    <IconButton color='error' sx={{ width: '1px', height: '1px' }} onClick={handleRemoveClick}><CancelIcon sx={{ fontSize: 25 }} /></IconButton>
        
    </Grid>
</Grid>













{/* 
            
            <Stack direction='row' gap={2} justifyContent='space-evenly'>
            
            
            <Stack sx={{width:'25%' }} margin='auto' >
            {Object.values(imageUrl).slice(0, 1).map((image, index) => (
    <img
        key={index}
        src={`http://localhost:5000${image}`} 
        alt={`Slide ${index + 1}`}
        style={{ width:'100%',height:'100px', borderRadius: '5px' }}
        onError={(e) => {
            console.error(`Failed to load image ${index}: ${e.target.src}`);
            e.target.onerror = null; 
        }}
    />
))}
            </Stack>


            <Stack direction={{xs:'column',sm:'row'}} width='auto' justifyContent='space-between' alignItems='center'>
            <Stack direction='column' minWidth='50%'>
                <Typography noWrap>{itemName}</Typography>
                <Typography noWrap>{itemName}</Typography>
                <Typography noWrap>Unit price: Rs. {price}</Typography>
            </Stack>
            
            <Stack direction='row'  gap={2} width='50%'>
            <Stack direction='column' minWidth='55%'>
                <Stack direction='row'>
                    <Typography>Quantity </Typography>
                    <TextField
                        type='number'
                        onChange={(e) => {handleBuyingCountChange(parseInt(e.target.value));
                        
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
            <Typography variant='h6' color='success.main' width='40%'>Rs.{productTotPrice}</Typography>
            </Stack>
            </Stack>
            </Stack>
            <IconButton color='error' sx={{ width: '1px', height: '1px' }} onClick={handleRemoveClick}><CancelIcon sx={{ fontSize: 25 }} /></IconButton>
         */}
        
        
        </Stack>



    );
};
