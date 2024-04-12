import React, { useState, useEffect } from 'react';
import { Paper, Stack, Typography, Container, Grid, Button } from '@mui/material';
import ProductCard from './ProductCard';

export const ProductCatalog = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/product/products/english/all');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            console.log('Fetched products:', data); // Log fetched data for debugging
            setProducts(data); // Assuming data is an array of products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <Paper sx={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#C6F6D4', width: { lg: '1250px' } }}>
            <Typography variant="h3" sx={{ textAlign: 'center', margin: '25px' }}>All Products</Typography>
            <Container>
                <Grid container spacing={5}>
                    {products.map(product => (
                        <Grid item key={product.productItemID} xs={12} sm={6} lg={3}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Paper>
    );
};
