import React, { useState, useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const AdminDashboard = () => {
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

    const columns = [
        { field: 'id', headerName: 'Product ID', width: 150 },
        { field: 'name_en', headerName: 'Name (English)', width: 200 },
        { field: 'name_si', headerName: 'Name (Sinhala)', width: 200 },
        { field: 'description_en', headerName: 'Description (English)', width: 300 },
        { field: 'description_si', headerName: 'Description (Sinhala)', width: 300 },
        { field: 'price', headerName: 'Price (LKR)', width: 300 },
        { field: 'quantity', headerName: 'Available Quantity', width: 300 },
        { field: 'category', headerName: 'Category', width: 300 },
        { field: 'image', headerName: 'Image', width: 300, renderCell: (params) => params.value && params.value.length > 0 ? <img src={params.value[0]} alt="Product" style={{ width: '50px', height: 'auto' }} /> : null },
    ];

    const rows = products.map(product => ({
        id: product.productItemID,
        name_en: product.itemName.en,
        name_si: product.itemName.si,
        description_en: product.description.en,
        description_si: product.description.si,
        price: product.price,
        quantity: product.quantity,
        category: product.category.en,
        image: product.images ? product.images : [], 
    }));

    return (
        <Grid container>
            <Grid item xs={9}>
                <Box sx={{ backgroundColor: '#C8FFDB', borderRadius: '25px', margin: '20px', height: '100%' }}>
                    <Stack>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </div>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};
