import { MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

export const AddProduct = () => {
return (

    <Paper sx={{width:'80%',height:'100%', margin:'auto'}} elevation={15} justifyContent='center' alignContent='center'>
        <Stack  sx={{width:'auto', margin:'auto'}} justifyContent="center" alignItems="center" direction='column'>
            <Typography variant='h3' color='success.main'>Add a new Product</Typography>
            <TextField type='file'></TextField>
            <TextField type='text' label='Enter Name in English'/>
            <TextField type='text' label='Enter Name in Sinhala'/>
            <TextField type='number' label='Enter the available quantity'/>
            <TextField type='number' label='Price'/>
            <TextField type='text' label='Enter the product description'/>
            <TextField label='Select Catogory' select sx={{width:"50%"}}>
                <MenuItem value='kalka'>Kalka</MenuItem>
                <MenuItem value='Paththu'>Paththu</MenuItem>
                <MenuItem value='Guli'>Guli</MenuItem>
            </TextField>
        </Stack>

    </Paper>
    

    
)
}
