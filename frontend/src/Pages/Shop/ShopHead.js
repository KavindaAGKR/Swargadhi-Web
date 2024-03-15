import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardActionArea, CardContent, CardMedia, Button, Grid } from '@mui/material';
import slide1 from '../Images/Slider1.jpg'
import slide2 from '../Images/Slider2.png'


const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description of Product 1',
    price: 'RS. 100',
    image: slide1
  },
  
  {
    id: 2,
    name: 'Product 2',
    description: 'Description of Product 2',
    price: 'RS. 200',
    image: slide2
  },
  // Add more products as needed
];

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




export const Shop = ()=> {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const productsPerPage = 10; // Number of products to display per page
  const [currentPage, setCurrentPage] = React.useState(0);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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

  return (
    <Box sx={{ bgcolor: 'background.paper', width: 1800 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="red"
          textColor="inherit"
          // variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Paththu" {...a11yProps(0)} />
          <Tab label="IKalka" {...a11yProps(1)} />
          <Tab label="Kashaya" {...a11yProps(2)} />
          <Tab label="Talkola" {...a11yProps(3)} />
          <Tab label="Gulikalka" {...a11yProps(4)} />
          <Tab label="Moadaka" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
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
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}





function ProductItem({ product }) {
  return (
    <Box>
      <Card sx={{ maxWidth: 340, maxHeight: 500, margin: 'auto' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            width="20"
            image={product.image}
            alt={product.name}
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
          <Button variant="outlined" color="primary" sx={{ marginLeft: '10px' }}>
            View More
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
