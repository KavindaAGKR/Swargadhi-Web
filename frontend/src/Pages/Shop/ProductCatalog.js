import React, { useState } from 'react';
import { Stack, Typography, Paper, Container, Grid, Button } from '@mui/material';
import ProductCard from './ProductCard';

export const ProductCatalog = ({ products }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <Paper fullWidth sx={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#C6F6D4' }}>
            <Typography variant="h3" sx={{ textAlign: 'center', margin: '25px' }}>All Products</Typography>
            <Container>
                <Grid container spacing={5}>
                    {currentItems.map(product => (
                        <Grid item key={product.id} xs={12} sm={6} lg={3}>

                            <ProductCard product={product} />


                        </Grid>
                    ))}
                </Grid>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                    <Button variant="contained" onClick={prevPage} disabled={currentPage === 1}>
                        Previous Page
                    </Button>
                    <Button variant="contained" onClick={nextPage} disabled={currentPage === totalPages}>
                        Next Page
                    </Button>
                </Stack>
            </Container>
        </Paper>
    );
};
