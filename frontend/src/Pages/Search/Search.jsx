import React, { useState, useEffect } from 'react';
import { FetchAdminProducts } from '../../AdminPanel/AdminApis/FetchAdminProducts';
import { Paper, Typography, Container, Grid, CircularProgress, Stack, TextField } from '@mui/material';
import ProductCard from '../Shop/ProductCard';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { useLocation } from 'react-router-dom';

export const Search = () => {
    const [loading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { products } = FetchAdminProducts();
    const location = useLocation();

    // Extract search query from URL
    const searchQuery = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const filterProducts = (search) => {
            return products.filter(
                (product) =>
                    product.itemName.en.toLowerCase().includes(search.toLowerCase()) ||
                    product.itemName.si.toLowerCase().includes(search.toLowerCase()) ||
                    product.description.en.toLowerCase().includes(search.toLowerCase()) ||
                    product.description.si.toLowerCase().includes(search.toLowerCase()) ||
                    product.category.si.toLowerCase().includes(search.toLowerCase()) ||
                    product.category.en.toLowerCase().includes(search.toLowerCase())
            );
        };

        if (searchQuery) {
            const filtered = filterProducts(searchQuery);
            setFilteredProducts(filtered);
        }
    }, [products, searchQuery]);

    return (
        <>
            <Header />
            <Paper
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: '100%',
                    padding: '0px 0px 100px 0px',
                    boxShadow: 'none',
                }}
            >
                <Typography variant="h5" sx={{ textAlign: 'center', margin: '5px', color: 'green' }}>
                    Search Results
                </Typography>
                {/* <Container>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        value={searchQuery}
                        sx={{ marginBottom: '20px' }}
                        disabled
                    />
                </Container> */}
                <Stack margin="40px">
                    {loading ? (
                        <CircularProgress />
                    ) : filteredProducts.length > 0 ? (
                        <Grid container spacing={5}>
                            {filteredProducts.map((product) => (
                                <Grid item key={product.productItemID} xs={12} sm={6} lg={3}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
                            No products available
                        </Typography>
                    )}
                </Stack>
            </Paper>
            <Footer />
        </>
    );
};
