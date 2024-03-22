

import React, {useState} from 'react';
import { Container, Grid, Button, Paper, Typography } from '@mui/material'; // Importing Container and Grid for layout
//import { ProductCard } from './Shop/ProductCard'; 

import slide1 from './Images/Slider1.jpg'; 
import slide2 from './Images/Slider2.png';
import slide3 from './Images/Slider1.jpg';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header';
import ProductCard from './Shop/ProductCard';

const products = [
  {
    id: 11,
    name: 'New Product 1',
    description: 'Description of New Product 1...',
    price: 'RS. 1499',
    image: slide1
  },
  {
    id: 12,
    name: 'New Product 2',
    description: 'Description of New Product 2...',
    price: 'RS. 1199',
    image: slide2
  },
  {
    id: 13,
    name: 'New Product 3',
    description: 'Description of New Product 3...',
    price: 'RS. 999',
    image: slide3
  },
  {
    id: 14,
    name: 'New Product 4',
    description: 'Description of New Product 4...',
    price: 'RS. 899',
    image: slide1
  },
  {
    id: 15,
    name: 'New Product 5',
    description: 'Description of New Product 5...',
    price: 'RS. 799',
    image: slide2
  },
  {
    id: 16,
    name: 'New Product 6',
    description: 'Description of New Product 6...',
    price: 'RS. 699',
    image: slide3
  },
  {
    id: 17,
    name: 'New Product 7',
    description: 'Description of New Product 7...',
    price: 'RS. 599',
    image: slide1
  },
  {
    id: 18,
    name: 'New Product 8',
    description: 'Description of New Product 8...',
    price: 'RS. 499',
    image: slide2
  },
  {
    id: 19,
    name: 'New Product 9',
    description: 'Description of New Product 9...',
    price: 'RS. 399',
    image: slide1
  },
  {
    id: 20,
    name: 'New Product 10',
    description: 'Description of New Product 10...',
    price: 'RS. 299',
    image: slide3
  },
  {
    id: 21,
    name: 'Premium Product A',
    description: 'Description of Premium Product A...',
    price: 'RS. 1999',
    image: slide1
  },

];



const itemsPerPage = 12; // Number of items to display per page

export const Dispensary = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
    <React.Fragment>
      <Header/>
    <Paper  sx={{ width:'90%', margin:'25px auto', alignItems:'center', justifyContent:'center', backgroundColor:'#C6F6D4'} }>
      <Typography variant='h3' sx={{textAlign:'center', margin:'25px'}}>Paththu</Typography>
      <Container >
      <Grid container spacing={5} >
        {currentItems.map(product => (
          <Grid item key={product.id} xs={12} sm={6}  lg={3}  >
            {/* Adjust the Grid item breakpoints as per your layout requirements */}
            {/* <ProductCard product={product} /> */}
            <ProductCard product={product} /> 
          </Grid>
        ))}
      </Grid>
      <div>
        <Button variant="contained" onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button variant="contained" onClick={nextPage} disabled={currentPage === totalPages}>
          Next Page
        </Button>
      </div>
    </Container>
    </Paper>
    <Footer/>
    </React.Fragment>
  );
};
