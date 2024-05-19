import React from 'react';
import { Paper, Typography, Container, Grid, CircularProgress, Stack } from '@mui/material';
import ProductCard from './ProductCard';
import { FetchProducts } from '../../API/FetchProducts';

const ProductCatalog = ({ category }) => {


    const {products, loading} = FetchProducts(category);

    return (
        <Paper sx={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width:'100%', padding:'0px 0px 100px 0px ' , boxShadow:'none'}}>
            <Typography variant="h3" sx={{ textAlign: 'center', margin:'5px' , color:'green' }}>{category === 'all' ? 'All Products' : category}</Typography>
            <Stack margin=' 100px'>
                {loading ? (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>Loading products...<CircularProgress value={50}/></Typography>
                ) : (
                    products.length > 0 ? (
                        <Grid container spacing={5  } >
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
            </Stack>
        </Paper>
    );
};

export default ProductCatalog;
