

import React, {useState} from 'react';
import { Container, Grid, Button } from '@mui/material'; // Importing Container and Grid for layout
import { ProductCard } from './Shop/ProductCard'; // Importing the ProductCard component
import slide1 from './Images/Slider1.jpg'; // Importing images for products
import slide2 from './Images/Slider2.png';
import slide3 from './Images/Slider1.jpg';

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
  {
    id: 22,
    name: 'Premium Product B',
    description: 'Description of Premium Product B...',
    price: 'RS. 1799',
    image: slide2
  },
  {
    id: 23,
    name: 'Premium Product C',
    description: 'Description of Premium Product C...',
    price: 'RS. 1599',
    image: slide3
  },
  {
    id: 24,
    name: 'Premium Product D',
    description: 'Description of Premium Product D...',
    price: 'RS. 1399',
    image: slide1
  },
  {
    id: 25,
    name: 'Premium Product E',
    description: 'Description of Premium Product E...',
    price: 'RS. 1199',
    image: slide2
  },
  {
    id: 26,
    name: 'Premium Product F',
    description: 'Description of Premium Product F...',
    price: 'RS. 999',
    image: slide3
  },
  {
    id: 27,
    name: 'Premium Product G',
    description: 'Description of Premium Product G...',
    price: 'RS. 899',
    image: slide1
  },
  {
    id: 28,
    name: 'Premium Product H',
    description: 'Description of Premium Product H...',
    price: 'RS. 799',
    image: slide2
  },
  {
    id: 29,
    name: 'Premium Product I',
    description: 'Description of Premium Product I...',
    price: 'RS. 699',
    image: slide3
  },
  {
    id: 30,
    name: 'Premium Product J',
    description: 'Description of Premium Product J...',
    price: 'RS. 599',
    image: slide1
  },
  {
    id: 31,
    name: 'Exclusive Product X',
    description: 'Description of Exclusive Product X...',
    price: 'RS. 1499',
    image: slide2
  },
  {
    id: 32,
    name: 'Exclusive Product Y',
    description: 'Description of Exclusive Product Y...',
    price: 'RS. 1299',
    image: slide3
  },
  {
    id: 33,
    name: 'Exclusive Product Z',
    description: 'Description of Exclusive Product Z...',
    price: 'RS. 1099',
    image: slide1
  },
  {
    id: 34,
    name: 'Exclusive Product W',
    description: 'Description of Exclusive Product W...',
    price: 'RS. 999',
    image: slide2
  },
  {
    id: 35,
    name: 'Exclusive Product V',
    description: 'Description of Exclusive Product V...',
    price: 'RS. 899',
    image: slide3
  },
  {
    id: 36,
    name: 'Exclusive Product U',
    description: 'Description of Exclusive Product U...',
    price: 'RS. 799',
    image: slide1
  },
  {
    id: 37,
    name: 'Exclusive Product T',
    description: 'Description of Exclusive Product T...',
    price: 'RS. 699',
    image: slide2
  },
  {
    id: 38,
    name: 'Exclusive Product S',
    description: 'Description of Exclusive Product S...',
    price: 'RS. 599',
    image: slide3
  },
  {
    id: 39,
    name: 'Exclusive Product R',
    description: 'Description of Exclusive Product R...',
    price: 'RS. 499',
    image: slide1
  },
  {
    id: 40,
    name: 'Exclusive Product Q',
    description: 'Description of Exclusive Product Q...',
    price: 'RS. 399',
    image: slide2
  },
  {
    id: 41,
    name: 'Elite Product M',
    description: 'Description of Elite Product M...',
    price: 'RS. 1799',
    image: slide3
  },
  {
    id: 42,
    name: 'Elite Product N',
    description: 'Description of Elite Product N...',
    price: 'RS. 1699',
    image: slide1
  },
  {
    id: 43,
    name: 'Elite Product O',
    description: 'Description of Elite Product O...',
    price: 'RS. 1599',
    image: slide2
  },
  {
    id: 44,
    name: 'Elite Product P',
    description: 'Description of Elite Product P...',
    price: 'RS. 1499',
    image: slide3
  },
  {
    id: 45,
    name: 'Elite Product L',
    description: 'Description of Elite Product L...',
    price: 'RS. 1399',
    image: slide1
  }
];



const itemsPerPage = 10; // Number of items to display per page

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
    <Container>
      <Grid container spacing={3}>
        {currentItems.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            {/* Adjust the Grid item breakpoints as per your layout requirements */}
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
  );
};
