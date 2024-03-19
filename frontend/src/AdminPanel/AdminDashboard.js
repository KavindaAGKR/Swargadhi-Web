import React, { useState, useEffect } from 'react';
import { Box, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import logo from '../Images/logo.png';

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

    return (
        <Grid container>
            <Grid item xs={9}>
                <Box sx={{ backgroundColor: '#C8FFDB', borderRadius: '25px', margin: '20px', height: '100%' }}>
                    <Stack>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell>Name (English)</TableCell>
                                        <TableCell>Name (Sinhala)</TableCell>
                                        <TableCell>Description (English)</TableCell>
                                        <TableCell>Description (Sinhala)</TableCell>
                                        <TableCell>Images</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell>{product.productItemID}</TableCell>
                                            <TableCell>{product.itemName.en}</TableCell>
                                            <TableCell>{product.itemName.si}</TableCell>
                                            <TableCell>{product.description.en}</TableCell>
                                            <TableCell>{product.description.si}</TableCell>
                                            <TableCell>
                                                {product.images.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={`Product ${index}`}
                                                        width={100}
                                                        height={100}
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};