
import { Card, CardActionArea, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import './BestSales.css';
import React, { useState, useRef } from "react";

const products = [
    {
        id: 1,
        name: 'Kurudu & Wasawasi - 100 g',
        description: 'Cinnamon was one of the first traded spices in the ancient world...',
        price: 'RS. 1599',
        image: 'http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQYALwFaLdWRO4aMfsfPYdnr2vD73VuUr0y1tTiFjYENDXf7XBEIqdYbX1TUPcNy44sYx1wMRrgSM6nBZM4QSU'
      },
      {
        id: 2,
        name: 'Example Product 2',
        description: 'Description of Example Product 2...',
        price: 'RS. 1299',
        image: 'https://imageproxy.wolt.com/menu/menu-images/6232fbddfd94b76280835288/581dbbda-ebf6-11ec-8c8a-46f95fff0415_img_20220322_wa0009.jpeg?w=300'
      },
      {
        id: 3,
        name: 'Example Product 3',
        description: 'Description of Example Product 3...',
        price: 'RS. 899',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr_oNciqO3SCY33DCxiW8vGYWVKMlm2JCKNA&usqp=CAU'
      },
      {
        id: 4,
        name: 'Example Product 4',
        description: 'Description of Example Product 4...',
        price: 'RS. 799',
        image: 'https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'
      },
      {
        id: 5,
        name: 'Example Product 5',
        description: 'Description of Example Product 5...',
        price: 'RS. 699',
        image: 'https://a.cdn-hotels.com/gdcs/production5/d888/1b61cd53-b152-4c82-b438-be4d52e5d918.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'
      },
      {
        id: 6,
        name: 'Example Product 6',
        description: 'Description of Example Product 6...',
        price: 'RS. 599',
        image: 'https://a.cdn-hotels.com/gdcs/production172/d1780/0301035b-e96e-470d-918a-89aff704bca4.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'
      },
      {
        id: 7,
        name: 'Example Product 7',
        description: 'Description of Example Product 7...',
        price: 'RS. 499',
        image: 'https://a.cdn-hotels.com/gdcs/production97/d1248/df9e1345-b8c6-4824-8c98-fe114ec8d56c.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'
      },
      {
        id: 8,
        name: 'Example Product 8',
        description: 'Description of Example Product 8...',
        price: 'RS. 399',
        image: 'https://a.cdn-hotels.com/gdcs/production115/d1481/96ce5193-1a57-4808-ae88-fbb94146a212.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'
      },
      {
        id: 9,
        name: 'Example Product 9',
        description: 'Description of Example Product 9...',
        price: 'RS. 299',
        image: 'https://a.cdn-hotels.com/gdcs/production142/d1383/05e29ff5-2a5f-44f3-a56f-354624ee463b.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'
      },
      {
        id: 10,
        name: 'Example Product 10',
        description: 'Description of Example Product 10...',
        price: 'RS. 199',
        image: 'https://a.cdn-hotels.com/gdcs/production192/d442/cb882fb9-d84b-4b9f-ba3f-4273f66c2258.jpg?impolicy=fcrop&w=1600&h=1066&q=medium'
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