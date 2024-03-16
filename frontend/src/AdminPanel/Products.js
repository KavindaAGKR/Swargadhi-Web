import React, { useState } from 'react';
import { Button, Grid, Stack, Typography, TextField, MenuItem, Dialog, DialogActions, DialogContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import slider1 from '../Images/Slider1.jpg';
import slider2 from '../Images/Slider2.png';
import slider3 from '../Images/Slider3jpg.png';

export const Products = () => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    englishName: '',
    sinhalaName: '',
    quantity: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  // Define items array here
  const [items, setItems] = useState([
    {
      id: 1,
      englishName: 'Product 1',
      sinhalaName: 'නිෂ්පාදිත 1',
      quantity: 10,
      price: 100,
      description: 'This is product 1 description.',
      category: 'kalka',
      image: slider1,
    },
    {
      id: 2,
      englishName: 'Product 2',
      sinhalaName: 'නිෂ්පාදිත 2',
      quantity: 20,
      price: 20,
      description: 'This is product 2 description.',
      category: 'Paththu',
      image: slider2,
    },
  ]);

  const handleChange = (prop) => (event) => {
    setNewProduct({ ...newProduct, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    const updatedItems = [...items, { ...newProduct, id: items.length + 1 }];
    setItems(updatedItems);
    setOpen(false);
  };

  return (
    <Grid container>
      <Stack width="100%">
        <Typography>List of Products</Typography>
        <Button onClick={() => setOpen(true)}>Add Product</Button>

        <Dialog open={open} aria-labelledby="Dialog-title" aria-describedby="Dialog-description">
          <DialogContent>
            <Stack sx={{ width: '100%' }} justifyContent="center" alignItems="center" direction="column">
              <Typography variant="h3" color="success.main">
                Add a new Product
              </Typography>
              <TextField type="file" onChange={handleChange('image')} />
              <TextField type="text" label="Enter Name in English" onChange={handleChange('englishName')} />
              <TextField type="text" label="Enter Name in Sinhala" onChange={handleChange('sinhalaName')} />
              <TextField type="number" label="Enter the available quantity" onChange={handleChange('quantity')} />
              <TextField type="number" label="Price" onChange={handleChange('price')} />
              <TextField type="text" label="Enter the product description" onChange={handleChange('description')} />
              <TextField
                label="Select Category"
                select
                sx={{ width: '50%' }}
                onChange={handleChange('category')}
                value={newProduct.category}
              >
                <MenuItem value="kalka">Kalka</MenuItem>
                <MenuItem value="Paththu">Paththu</MenuItem>
                <MenuItem value="Guli">Guli</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h3">List of Products shows here.</Typography>

        <div style={{ height: '80%', width: '100%' }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'id', sort: 'asc' }],
              },
            }}
            rows={items}
            columns={[
              { field: 'id', headerName: 'ID', width: 90 },
              { field: 'englishName', headerName: 'Title', width: 150 },
              { field: 'sinhalaName', headerName: 'Content', width: 250 },
              { field: 'quantity', headerName: 'Content', width: 250 },
              { field: 'price', headerName: 'Content', width: 250 },
              { field: 'description', headerName: 'Content', width: 250 },
              { field: 'category', headerName: 'Content', width: 250 },
              {
                field: 'image',
                headerName: 'Image',
                width: 150,
                renderCell: (params) => <img src={params.value} alt={params.row.title} style={{ width: '100px', height: 'auto' }} />,
              },
            ]}
            
            
          />
        </div>
      </Stack>
    </Grid>
  );
};


