import React, { useState, useEffect } from 'react';
import { Button, Stack, Typography, TextField, MenuItem, Dialog, DialogActions, DialogContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete'; // Imported DeleteIcon only, EditIcon is not used
import IconButton from '@mui/material/IconButton';

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
        category: '',
        images:[]
    });
   
    const handleChange = (e) => {
        setProductData({...productData, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        const imagesArray = Array.from(e.target.files);
        setProductData({...productData, images: imagesArray});
    }
    
    
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('productItemID', productData.productItemID);
            formData.append('itemNameEn', productData.itemNameEn);
            formData.append('itemNameSi', productData.itemNameSi);
            formData.append('price', productData.price);
            formData.append('descriptionEn', productData.descriptionEn);
            formData.append('descriptionSi', productData.descriptionSi);
            formData.append('quantity', productData.quantity);
            formData.append('category', productData.category);
    
            // Append each file to the FormData
            productData.images.forEach(file => {
                formData.append('images', file);
            });
    
            const response = await fetch('http://localhost:5000/api/product/', {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
            console.log('Response from backend:', responseData);
            if (response.ok) {
                console.log('Product added successfully');
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
        setOpen(false);
    };
    

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/product/all');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete product: ${errorMessage}`);
            }
    
            // Refresh your data or update UI as necessary
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    
    const columns = [
        { field: 'id ', headerName: 'Product ID', width: 100 },
        { field: 'name_en', headerName: 'Name (English)', width: 200 },
        { field: 'name_si', headerName: 'Name (Sinhala)', width: 200 },
        { field: 'description_en', headerName: 'Description (English)', width: 300 },
        { field: 'description_si', headerName: 'Description (Sinhala)', width: 300 },
        { field: 'price', headerName: 'Price (LKR)', width: 150 },
        { field: 'quantity', headerName: 'Available Quantity', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        { 
            field: 'images', 
            headerName: 'Images',
            width: 200,
            renderCell: (params) => {
                const product = params.row;
                return (
                    <div>
                    {product.images.map((images, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000${images}`} 
                            alt={`Product Image ${index + 1}`} 
                            style={{ width: 100, height: 100, marginRight: 10 }}
                            onError={(e) => {
                                console.error(`Failed to load image ${index}: ${e.target.src}`);
                                e.target.onerror = null;
                            }}
                        />
                    ))}
                </div>
                );
            },
        },
        { 
            field: 'actions', 
            headerName: 'Edit/Delete', 
            width: 150, 
            renderCell: (params) => (
                <div>
                    {/* <IconButton onClick={() => handleEdit(params.row.id)}>
                        <EditIcon color="primary" />
                    </IconButton> */}
                    <IconButton onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                    {console.log("Row ID:", params.row._id)}
                </div>
            ),
        },
    ];
    
    
    const rows = products.map(product => ({
        id: product._id,
        name_en: product.itemName.en,
        name_si: product.itemName.si,
        description_en: product.description.en,
        description_si: product.description.si,
        price: product.price,
        quantity: product.quantity,
        category: product.category.en,
        images: product.images // Assuming each product object contains an array of image URLs
    }));
    
    
    return (
        <Stack>
            <Stack gap={2}>
                <Typography variant='h3' sx={{ margin:'20px auto'}}>List of Products</Typography>
                <Button variant='contained' sx={{width:'30%', margin:'auto'}} onClick={() => setOpen(true)}>Add New Product</Button>
                <Dialog
                    open={open}
                    aria-labelledby='Dialog-title'
                    aria-describedby='Dialog-description'
                >
                    <DialogContent>
                        <Stack gap={2} sx={{ width: '100%' }} justifyContent='space-between' direction='column'>
                            <Typography variant='h3' color='success.main' margin='auto'>Add New Product</Typography>
                            <Stack direction='row' gap={2}>
                                <TextField name='productItemID' type='text' label='Enter Product ID' value={productData.productItemID} onChange={handleChange} />
                                <TextField name='category' label='Select Category' select sx={{ width: "50%" }} value={productData.category} onChange={handleChange}>
                                    <MenuItem value='kalka'>Kalka</MenuItem>
                                    <MenuItem value='Paththu'>Paththu</MenuItem>
                                    <MenuItem value='Guli'>Guli</MenuItem>
                                </TextField>
                            </Stack>
                            <Stack direction='row' gap={2}>
                                <TextField name='itemNameEn' type='text' label='Enter Name in English' value={productData.itemNameEn} onChange={handleChange} />
                                <TextField name='itemNameSi' type='text' label='Enter Name in Sinhala' value={productData.itemNameSi} onChange={handleChange} />
                            </Stack>
                            <Stack direction='row' gap={2}>
                                <TextField name='quantity' type='number' label='Enter the available quantity' value={productData.quantity} onChange={handleChange} />
                                <TextField name='price' type='number' label='Price' value={productData.price} onChange={handleChange} />
                            </Stack>
                            <Stack direction='row' gap={2}>
                                <TextField name='descriptionEn' type='text' label='Enter the product description in English' value={productData.descriptionEn} onChange={handleChange} />
                                <TextField name='descriptionSi' type='text' label='Enter the product description in Sinhala' value={productData.descriptionSi} onChange={handleChange} />
                            </Stack>
                            <input 
                                    type="file" 
                                    accept=".png, .jpg, .jpeg"
                                    name="photo"
                                    multiple onChange={handlePhoto}
                                />


                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
                <Typography variant='h5'>List of Products shows here.</Typography>
                <Box sx={{ backgroundColor: 'white', margin: '0 25px ', height: '100%' }}>
                    <Stack>
                        <Stack style={{ height: '100%', width: '100%' }}>   
                        <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10} // You can adjust the pageSize as per your requirement
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    );
};

