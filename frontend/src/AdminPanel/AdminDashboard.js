import React, { useState, useEffect } from 'react';
import { Box, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import logo from '../Images/logo.png';

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
            {/* <Grid item xs={3}>
                <Box gap='50px' sx={{ backgroundColor: '#A1FEC0', borderRadius: '25px', margin: '20px', height: '100%', textAlign: 'center' }}>
                    <Stack>
                        <img src={logo} alt='Swargadhi logo' style={{ margin: '20px' }} />
                        <Typography variant='h4' style={{ margin: '20px' }}>Admin Panel</Typography>
                        <Stack direction='column' gap='50px' width='80%' justifyContent='center' alignContent='center' margin='auto'>
                            <Button variant='contained' color='success'>Dashboard</Button>
                            <Button variant='contained' color='success'>Admin Profile</Button>
                            <Button variant='contained' color='success'>Orders</Button>
                            <Button variant='contained' color='success'>Products</Button>
                            <Button variant='contained' color='success'>Sales Report</Button>
                            <Button variant='contained' color='success'>Users</Button>
                            <Button variant='contained' color='success'>Messages</Button>
                            <Button variant='contained' color='success'>Settings</Button>
                            <Button variant='contained' color='success'>Sign Out</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Grid> */}
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
