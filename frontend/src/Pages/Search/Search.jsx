import React, { useState, useEffect } from 'react';
import { FetchAdminProducts } from '../../AdminPanel/AdminApis/FetchAdminProducts';
import { Paper, Typography, Container, Grid, CircularProgress, Stack, TextField } from '@mui/material';
import ProductCard from '../Shop/ProductCard';
import ProCard from './ProCard';

export const Search = () => {
 //const [products, setProducts] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);


  const {products} = FetchAdminProducts();
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const fetchedProducts = await FetchAdminProducts();
  //       setProducts(fetchedProducts);
  //       setFilteredProducts(fetchedProducts); // Initially display all products
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const filterProducts = (search) => {
      if (!Array.isArray(products)) return []; // Ensure products is an array

      return products.filter(product => (
        product.itemName.en.toLowerCase().includes(search.toLowerCase()) ||
        product.itemName.si.toLowerCase().includes(search.toLowerCase()) ||
        product.description.en.toLowerCase().includes(search.toLowerCase()) ||
        product.description.si.toLowerCase().includes(search.toLowerCase()) ||
        product.category.si.toLowerCase().includes(search.toLowerCase()) ||
        product.category.en.toLowerCase().includes(search.toLowerCase())
      ));
    };

    const filtered = filterProducts(searchTerm);
    setFilteredProducts(filtered);
    console.log("Filtered products:", filtered);
  }, [products, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Paper sx={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: '100%', padding: '0px 0px 100px 0px', boxShadow: 'none' }}>
      <Typography variant="h3" sx={{ textAlign: 'center', margin: '5px', color: 'green' }}>Search Results</Typography>
      <Container>
        <TextField 
          fullWidth
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: '20px' }}
        />
      </Container>
      <Stack margin='40px'>
        {loading ? (
          <CircularProgress />
        ) : (
          filteredProducts.length > 0 ? (
            <Grid container spacing={5}>
              {filteredProducts.map(product => (
                <Grid item key={product.productItemID} xs={12} sm={6} lg={3}>
                  <ProCard product={product} />
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
