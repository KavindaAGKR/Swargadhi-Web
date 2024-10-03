import React, { useEffect, useState } from 'react';
import { Paper, Typography, Container, Grid, CircularProgress, Stack } from '@mui/material';
import ProductCard from './ProductCard';


import { FetchAdminProducts } from '../../AdminPanel/AdminApis/FetchAdminProducts';


const ProductCatalog = ({ category }) => {


    const {products, loading} = FetchAdminProducts();

    const [productsByCategory, setProductsByCategory ] = useState([]);

    useEffect(() => {
        const filterProducts = (category) => {
    
        return products.filter(product => (
            product.category.si.toLowerCase().includes(category.toLowerCase()) ||
            product.category.en.toLowerCase().includes(category.toLowerCase())
        ));
        };
    
        const categorised = filterProducts(category);
        setProductsByCategory(categorised);
        if(category === 'all') { setProductsByCategory(products);} 
        console.log("Filtered products:", categorised);
    }, [products, category]);
    

    return (
        <Paper sx={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width:'100%', padding:'0px 0px 100px 0px ' , boxShadow:'none'}}>
            <Typography variant="h3" sx={{ textAlign: 'center', margin:'5px' , color:'green' }}>{category === 'all' ? 'All Products' : category}</Typography>
            <Stack margin='40px'>
                {loading ? (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress color='success' value={50}/></Typography>
                ) : (
                    productsByCategory.length > 0 ? (
                        <Grid container spacing={5  } >
                            {productsByCategory.map(product => (
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
