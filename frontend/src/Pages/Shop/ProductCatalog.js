import React, { useState, useEffect } from 'react';
import { Paper, Typography, Container, Grid, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';

const ProductCatalog = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                let response;
                if (category === 'all') {
                    response = await fetch('http://localhost:5000/api/product/products/english/all');
                } else {
                    response = await fetch(`http://localhost:5000/api/product/category/en/${encodeURIComponent(category)}`);
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                console.log(`Fetched ${category} products:`, data);

                // Process the data based on the expected format
                const extractedProducts = extractProducts(data);

                if (Array.isArray(extractedProducts)) {
                    setProducts(extractedProducts);
                } else {
                    throw new Error('Invalid data format');
                }

                setLoading(false);
            } catch (error) {
                console.error(`Error fetching ${category} products:`, error);
                setProducts([]);
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    // Function to extract products from the API response based on category
    const extractProducts = (data) => {
        if (category === 'all') {
            // Handle the 'all' category response
            return Array.isArray(data) ? data : [];
        } else {
            // Handle specific category response (e.g., 'Guli')
            if (data && data.data && Array.isArray(data.data)) {
                return data.data;
            }
            return [];
        }
    };

    return (
        <Paper sx={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#C6F6D4', width: { lg: '1250px' } }}>
            <Typography variant="h3" sx={{ textAlign: 'center', margin: '25px' }}>{category === 'all' ? 'All Products' : category}</Typography>
            <Container>
                {loading ? (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>Loading products...<CircularProgress value={50}/></Typography>
                ) : (
                    products.length > 0 ? (
                        <Grid container spacing={5}>
                            {products.map(product => (
                                <Grid item key={product.productItemID} xs={12} sm={6} lg={3}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>No products available</Typography>
                    )
                )}
            </Container>
        </Paper>
    );
};

export default ProductCatalog;
