import React, { useState, useEffect } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import {TabContext, TabList, TabPanel, } from '@mui/lab'
import { Tab, Box, Stack, tabsClasses } from '@mui/material'


import slide1 from '../Images/Slider3.png'; 
import slide2 from '../Images/Slider2.png';
import slide3 from '../Images/Slider1.jpg';
import {  ProductCatalog } from './ProductCatalog'



// const products = [
//   {
//     productItemID: "1",
//     itemName: { 
//         en: "Product 1", 
//         si: "නිෂ්පාදනය 1" 
//     },
//     price: 19.99,
//     description: { 
//         en: "DescDescription of Product 1Description of Product 1Description of Product 1Description of Product 1DescDescription of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1Description of Product 1", 
//         si: "නිෂ්පාදනය 1 විස්තර" 
//     },
//     quantity: 5,
//     category: { 
//         en: "Category 1", 
//         si: "ප්‍රවර්ගය 1" 
//     },
//     images: [slide1, slide2, slide3]
// },
// {
//     productItemID: "2",
//     itemName: { 
//         en: "Product 2", 
//         si: "නිෂ්පාදනය 2" 
//     },
//     price: 29.99,
//     description: { 
//         en: "Description of Product 2 Description of Product 2 Description of Product 2 Description of Product 2", 
//         si: "නිෂ්පාදනය 2 විස්තර" 
//     },
//     quantity: 8,
//     category: { 
//         en: "Category 2", 
//         si: "ප්‍රවර්ගය 2" 
//     },
//     images: [slide1, slide2, slide3]
// },
// {
//     productItemID: "3",
//     itemName: { 
//         en: "Product 3", 
//         si: "නිෂ්පාදනය 3" 
//     },
//     price: 24.99,
//     description: { 
//         en: "Description of Product 3", 
//         si: "නිෂ්පාදනය 3 විස්තර" 
//     },
//     quantity: 10,
//     category: { 
//         en: "Category 3", 
//         si: "ප්‍රවර්ගය 3" 
//     },
//     images: [slide1, slide2, slide3]
// },
// {
//     productItemID: "4",
//     itemName: { 
//         en: "Product 4", 
//         si: "නිෂ්පාදනය 4" 
//     },
//     price: 39.99,
//     description: { 
//         en: "Description of Product 4", 
//         si: "නිෂ්පාදනය 4 විස්තර" 
//     },
//     quantity: 15,
//     category: { 
//         en: "Category 4", 
//         si: "ප්‍රවර්ගය 4" 
//     },
//     images: [slide1, slide2, slide3]
// },
// {
//     productItemID: "5",
//     itemName: { 
//         en: "Product 5", 
//         si: "නිෂ්පාදනය 5" 
//     },
//     price: 49.99,
//     description: { 
//         en: "Description of Product 5", 
//         si: "නිෂ්පාදනය 5 විස්තර" 
//     },
//     quantity: 20,
//     category: { 
//         en: "Category 5", 
//         si: "ප්‍රවර්ගය 5" 
//     },
//     images: [slide1, slide2, slide3]
// },
// {
//     productItemID: "6",
//     itemName: { 
//         en: "Product 6", 
//         si: "නිෂ්පාදනය 6" 
//     },
//     price: 59.99,
//     description: { 
//         en: "Description of Product 6", 
//         si: "නිෂ්පාදනය 6 විස්තර" 
//     },
//     quantity: 25,
//     category: { 
//         en: "Category 6", 
//         si: "ප්‍රවර්ගය 6" 
//     },
//     images: [slide1, slide2, slide3]
// },
// {
//     productItemID: "7",
//     itemName: { 
//         en: "Product 7", 
//         si: "නිෂ්පාදනය 7" 
//     },
//     price: 69.99,
//     description: { 
//         en: "Description of Product 7", 
//         si: "නිෂ්පාදනය 7 විස්තර" 
//     },
//     quantity: 30,
//     category: { 
//         en: "Category 7", 
//         si: "ප්‍රවර්ගය 7" 
//     },
//     images: [slide1, slide2, slide3]
// },
// {
//     productItemID: "8",
//     itemName: { 
//         en: "Product 8", 
//         si: "නිෂ්පාදනය 8" 
//     },
//     price: 79.99,
//     description: { 
//         en: "Description of Product 8", 
//         si: "නිෂ්පාදනය 8 විස්තර" 
//     },
//     quantity: 35,
//     category: { 
//         en: "Category 8", 
//         si: "ප්‍රවර්ගය 8" 
//     },
//     images: [slide1, slide2, slide3]
// },
  

  
// ];




















export const Shop = () => {


  //To navigate Tab panel
  const [value, setValue] = useState('1')
  const handleChange = (event, Value) => {
    setValue(Value);
  }
  


//import data from backend

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
    <React.Fragment><Header/>
      
      <Stack sx={{margin:'auto', maxWidth:'90%',  display:'flex', justifyContent:'center', alignItems:'center'} } >
      <TabContext value={value} >
        <Box sx={{margin:'auto',    } }>
          <TabList onChange={handleChange}  variant="scrollable"
            scrollButtons allowScrollButtonsMobile 
            sx={{ width:{xs:'300px',sm:'500px',md:'auto'}} }
            
            >
            <Tab label='All Products' value='1' />
            <Tab label='Kalka' value='2'/>
            <Tab label='Thel' value='3'/>
            <Tab label='Paththu' value='4'/>
            <Tab label='Guli' value='5'/>
            <Tab label='Chuurna' value='6'/>
            <Tab label='Kashaya' value='7'/>
          </TabList>
        </Box>


        <TabPanel value='1'> <ProductCatalog products={products}/> </TabPanel>
        <TabPanel value='2'> <ProductCatalog products={products} /> </TabPanel>
        <TabPanel value='3'> <ProductCatalog products={products} /> </TabPanel>
        <TabPanel value='4'>Paththu</TabPanel>
        <TabPanel value='5'>Guli</TabPanel>
        <TabPanel value='6'>Chuurna</TabPanel>
        <TabPanel value='7'><ProductCatalog products={products} /></TabPanel>



      </TabContext>
      </Stack>



      
      <Footer/></React.Fragment>
  )
}







// const AllProducts = () =>{


//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
// //Tab panel page navigation


// const indexOfLastItem = currentPage * itemsPerPage;
// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

// const totalPages = Math.ceil(products.length / itemsPerPage);

// const nextPage = () => {
//   setCurrentPage(currentPage + 1);
// };

// const prevPage = () => {
//   setCurrentPage(currentPage - 1);
// };

//   return(

    
//     <Paper  sx={{  alignItems:'center', justifyContent:'center', backgroundColor:'#C6F6D4'} }>
//       <Typography variant='h3' sx={{textAlign:'center', margin:'25px'}}>AllProducts</Typography>
//       <Container  >
//       <Grid container spacing={5} >
//         {currentItems.map(product => (
//           <Grid item key={product.id} xs={12} sm={6}  lg={3}  >
//             {/* Adjust the Grid item breakpoints as per your layout requirements */}
//             {/* <ProductCard product={product} /> */}
//             <ProductCard product={product} /> 
//           </Grid>
//         ))}
//       </Grid>
//       <Stack direction='row' sx={{display:'flex', justifyContent:'center', margin:'20px'}}>
//         <Button variant="contained" onClick={prevPage} disabled={currentPage === 1}>
//           Previous Page
//         </Button>
//         <Button variant="contained" onClick={nextPage} disabled={currentPage === totalPages}>
//           Next Page
//         </Button>
//       </Stack>
//     </Container>
//     </Paper>
//   )
    
  
// }



// const Kalka = () =>{
//   return(

//     <Typography variant='h4' >Kalka</Typography>
//   )
    
  
// }





// const Thel = () =>{
//   return(

//     <Typography variant='h4' >Thel warga</Typography>
//   )
    
  
// }