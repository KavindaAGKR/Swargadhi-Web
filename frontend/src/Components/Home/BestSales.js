
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import './BestSales.css';
import React, { useState, useRef } from "react";
import slide1 from './Slider1.jpg';
import slide2 from './Slider2.png';
import slide3 from './Slider3.png';

const products = [
    {
        id: 1,
        name: 'Kurudu & Wasawasi - 100 g',
        description: 'Cinnamon was one of the first traded spices in the ancient world...',
        price: 'RS. 1599',
        image: slide1
      },
      {
        id: 2,
        name: 'Example Product 2',
        description: 'Description of Example Product 2...',
        price: 'RS. 1299',
        image: slide2
      },
      {
        id: 3,
        name: 'Example Product 3',
        description: 'Description of Example Product 3...',
        price: 'RS. 899',
        image: slide3
      },
      {
        id: 4,
        name: 'Example Product 4',
        description: 'Description of Example Product 4...',
        price: 'RS. 799',
        image: slide1
      },
      {
        id: 5,
        name: 'Example Product 5',
        description: 'Description of Example Product 5...',
        price: 'RS. 699',
        image: slide2
      },
      {
        id: 6,
        name: 'Example Product 6',
        description: 'Description of Example Product 6...',
        price: 'RS. 599',
        image: slide3
      },
      {
        id: 7,
        name: 'Example Product 7',
        description: 'Description of Example Product 7...',
        price: 'RS. 499',
        image: slide1
      },
      {
        id: 8,
        name: 'Example Product 8',
        description: 'Description of Example Product 8...',
        price: 'RS. 399',
        image: slide2
      },
      {
        id: 9,
        name: 'Example Product 9',
        description: 'Description of Example Product 9...',
        price: 'RS. 299',
        image: slide1
      },
      {
        id: 10,
        name: 'Example Product 10',
        description: 'Description of Example Product 10...',
        price: 'RS. 199',
        image: slide3
      }
];

export const BestSales =() => {
    const [currentPage, setCurrentPage] = useState(0);
    const containerRef = useRef(null);
  
    const nextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const prevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };
  
    const displayedProducts = products.slice(currentPage * 2, (currentPage + 1) * 15);
  
    return (
      <div className="content">
        <span className='best_sales'>Best Sales</span>
        <div className="product-list" ref={containerRef}>
          {displayedProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        <div className="pagination">
          <Button variant="outlined" onClick={prevPage} disabled={currentPage === 0}>
            Prev
          </Button>
          <Button variant="outlined" onClick={nextPage} disabled={currentPage === Math.floor(products.length / 2)}>
            Next
          </Button>
        </div>
      </div>
    );
  }
  
  function ProductItem({ product }) {
    return (
      <Box borderRadius={8} boxShadow={3} className="rounded-card">
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image={product.image}
              //alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardContent>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
            <Button variant="outlined" color="primary" style={{ marginLeft: '10px' }}>
              View More
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }