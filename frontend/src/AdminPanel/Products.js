import React, { useState } from 'react';
import { Button, Grid, Stack, Typography, TextField, MenuItem, Dialog, DialogActions, DialogContent } from '@mui/material';

export const Products = () => {
    const [open, setOpen] = useState(false);
    const [productData, setProductData] = useState({
        productItemID: '',
        itemNameEn: '',
        itemNameSi: '',
        price: 0,
        descriptionEn: '',
        descriptionSi: '',
        quantity: 0,
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async () => {
      try {
          const formattedData = {
              productItemID: productData.productItemID,
              itemName: {
                  en: productData.itemNameEn,
                  si: productData.itemNameSi
              },
              price: productData.price,
              description: {
                  en: productData.descriptionEn,
                  si: productData.descriptionSi
              },
              quantity: productData.quantity,
              category: {
                  en: productData.category,
                  si: productData.category // Assuming the category is the same for both languages
              }
          };
  
          console.log('Formatted Data:', formattedData);
  
          const response = await fetch('http://localhost:5000/api/product/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formattedData)
          });
  
          const responseData = await response.json(); // Parse response JSON
  
          console.log('Response from backend:', responseData); // Log response from backend
  
          if (response.ok) {
              console.log('Product added successfully');
              // You can perform any action here after successful addition of product
          } else {
              console.error('Failed to add product');
          }
      } catch (error) {
          console.error('Error adding product:', error);
      }
      setOpen(false);
  };
  
  
    return (
        <Grid container>
            <Stack>
                <Typography>List of Products</Typography>
                <Button onClick={() => setOpen(true)}>Add Product</Button>
                <Dialog
                    open={open}
                    aria-labelledby='Dialog-title'
                    aria-describedby='Dialog-description'
                >
                    <DialogContent>
                        <Stack sx={{ width: '100%' }} justifyContent="center" alignItems="center" direction='column'>
                            <Typography variant='h3' color='success.main'>Add a new Product</Typography>
                            <TextField name='productItemID' type='text' label='Enter Product ID' value={productData.productItemID} onChange={handleChange} />
                            <TextField name='itemNameEn' type='text' label='Enter Name in English' value={productData.itemNameEn} onChange={handleChange} />
                            <TextField name='itemNameSi' type='text' label='Enter Name in Sinhala' value={productData.itemNameSi} onChange={handleChange} />
                            <TextField name='quantity' type='number' label='Enter the available quantity' value={productData.quantity} onChange={handleChange} />
                            <TextField name='price' type='number' label='Price' value={productData.price} onChange={handleChange} />
                            <TextField name='descriptionEn' type='text' label='Enter the product description in English' value={productData.descriptionEn} onChange={handleChange} />
                            <TextField name='descriptionSi' type='text' label='Enter the product description in Sinhala' value={productData.descriptionSi} onChange={handleChange} />
                            <TextField name='category' label='Select Category' select sx={{ width: "50%" }} value={productData.category} onChange={handleChange}>
                                <MenuItem value='kalka'>Kalka</MenuItem>
                                <MenuItem value='Paththu'>Paththu</MenuItem>
                                <MenuItem value='Guli'>Guli</MenuItem>
                            </TextField>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
                <Typography variant='h3'>List of Products shows here.</Typography>
            </Stack>
        </Grid>
    );
};
