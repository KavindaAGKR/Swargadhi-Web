import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardActionArea, CardContent, CardMedia, Button, Grid } from '@mui/material';
// import slide1 from '../Images/Slider1.jpg';
// import slide2 from '../Images/Slider2.png';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export const ShopOsama = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]); // Define products state
  const productsPerPage = 10; // Number of products to display per page
  const [currentPage, setCurrentPage] = useState(0);
  const categories = ['Paththu', 'Kalka', 'Kashaya', 'Talkola', 'Guli', 'Moadaka'];

  useEffect(() => {
    fetchProductsByCategory(0); // Fetch products for the initial category
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





  const fetchProductsByCategory = async (categoryIndex) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/category/en/${categories[categoryIndex].toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchProductsByCategory(newValue); // Fetch products for the selected category
    setCurrentPage(0); // Reset currentPage when changing the category
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    fetchProductsByCategory(index); // Fetch products for the selected category when swiping
    setCurrentPage(0); // Reset currentPage when changing the category
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '80%', margin: 'auto' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="full width tabs example"
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {categories.map((category, index) => (
          <TabPanel key={index} value={value} index={index} dir={theme.direction}>
            <Grid container spacing={3}>
              {displayedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductItem product={product} />
                </Grid>
              ))}
            </Grid>
            <div>
              <Button variant="outlined" onClick={prevPage} disabled={currentPage === 0}>
                Prev
              </Button>
              <Button variant="outlined" onClick={nextPage} disabled={currentPage === totalPages - 1}>
                Next
              </Button>
            </div>
          </TabPanel>
        ))}
      </SwipeableViews>
    </Box>
  );
}

// function ProductItem({ product }) {
//   return (
//     <Box>
//       <Card sx={{ maxWidth: 340, maxHeight: 500, margin: 'auto' }}>
//         <CardActionArea>
//           {typeof product.image === 'object' ? (
//             <CardMedia
            
//               component="img"
//               height="250"
//               width="20"
//               image={product.image.en} // Assuming 'en' is the key for English image URL
//               alt={product.name}
//             />
//           ) : (
//             <CardMedia
//               component="img"
//               height="250"
//               width="20"
//               image={product.image} // Assuming 'product.image' is already a string URL
//               alt={product.name}
//             />
//           )}
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {product.name}
//             </Typography>
//             <Typography variant="h6" color="text.primary">
//               {product.price}
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//         <CardContent>
//           <Button variant="contained" color="primary">
//             Add to Cart
//           </Button>
//           <Button variant="outlined" color="primary" sx={{ marginLeft: '10px' }}>
//             View More
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }


function ProductItem({ product }) {
  return (
    <Box>
      <Card sx={{ maxWidth: 340, maxHeight: 500, margin: 'auto' }}>
        <CardActionArea>
          {product.images.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="250"
              width="20"
              image={image} // Assuming each image in product.images is base64-encoded
              alt={product.name}
            />
          ))}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.itemName.si} {/* Assuming 'itemName' contains the name of the product */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description.si} {/* Assuming 'description' contains the description of the product */}
            </Typography>
            <Typography variant="h6" color="text.primary">
              {product.price} {/* Assuming 'price' contains the price of the product */}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
          <Button variant="outlined" color="primary" sx={{ marginLeft: '10px' }}>
            View More
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
