import React, { useState } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import {TabContext, TabList, TabPanel, } from '@mui/lab'
import { Tab, Box, Stack, Typography, Paper, Container, Grid, Button } from '@mui/material'


import slide1 from '../Images/Slider3.png'; 
import slide2 from '../Images/Slider2.png';
import Slide3 from '../Images/Slider1.jpg';
import ProductCard from './ProductCard'




const products = [
  {
    id: 1,
    name: "The Product1",
    Sname: "කරබ්මු නාකරබ්මු නා",
    price: 4856,
    imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
{
  id: 2,
  name: "The Product1",
  Sname: "කරබ්මු නාකරබ්මු නා",
  price: 4856,
  imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
{
  id: 3,
  name: "The Product1",
  Sname: "කරබ්මු නාකරබ්මු නා",
  price: 4856,
  imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
{
  id: 4,
  name: "The Product1",
  Sname: "කරබ්මු නාකරබ්මු නා",
  price: 4856,
  imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
{
  id: 5,
  name: "The Product1",
  Sname: "කරබ්මු නාකරබ්මු නා",
  price: 4856,
  imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
{id: 6,
  name: "The Product1",
  Sname: "කරබ්මු නාකරබ්මු නා",
  price: 4856,
  imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
{
  id: 7,
  name: "The Product1",
  Sname: "කරබ්මු නාකරබ්මු නා",
  price: 4856,
  imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
{id: 8,
  name: "The Product1",
  Sname: "කරබ්මු නාකරබ්මු නා",
  price: 4856,
  imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
{
  id: 9,
  name: "The Product1",
  Sname: "කරබ්මු නාකරබ්මු නා",
  price: 4856,
  imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
{
  id: 10,
  name: "The Product1",
  Sname: "කරබ්මු නාකරබ්මු නා",
  price: 4856,
  imageUrl: [slide1, slide2, slide1, Slide3] // Example array with multiple images
},
];















export const Shop = () => {


  //To navigate Tab panel
  const [value, setValue] = useState('1')
  const handleChange = (event, Value) => {
    setValue(Value);
  }
  









  return (
    <React.Fragment><Header/>
      
      <Stack sx={{margin:'25px', display:'flex', justifyContent:'center', alignItems:'center'}} >
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label='All Products' value='1' />
            <Tab label='Kalka' value='2'/>
            <Tab label='Thel' value='3'/>
            <Tab label='Paththu' value='4'/>
            <Tab label='Guli' value='5'/>
            <Tab label='Chuurna' value='6'/>
            <Tab label='Kashaya' value='7'/>
          </TabList>
        </Box>


        <TabPanel value='1'> <AllProducts/> </TabPanel>
        <TabPanel value='2'> <Kalka/> </TabPanel>
        <TabPanel value='3'> <Thel/> </TabPanel>
        <TabPanel value='4'>Paththu</TabPanel>
        <TabPanel value='5'>Guli</TabPanel>
        <TabPanel value='6'>Chuurna</TabPanel>
        <TabPanel value='7'>kashaya</TabPanel>



      </TabContext>
      </Stack>



      
      <Footer/></React.Fragment>
  )
}







const AllProducts = () =>{
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
//Tab panel page navigation


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

  return(

    
    <Paper  sx={{ width:'90%', margin:'25px auto', alignItems:'center', justifyContent:'center', backgroundColor:'#C6F6D4'} }>
      <Typography variant='h3' sx={{textAlign:'center', margin:'25px'}}>AllProducts</Typography>
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
  )
    
  
}



const Kalka = () =>{
  return(

    <Typography variant='h4' >Kalka</Typography>
  )
    
  
}





const Thel = () =>{
  return(

    <Typography variant='h4' >Thel warga</Typography>
  )
    
  
}