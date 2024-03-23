import React, { useState, useEffect } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import {TabContext, TabList, TabPanel, } from '@mui/lab'
import { Tab, Box, Stack } from '@mui/material'


import slide1 from '../Images/Slider3.png'; 
import slide2 from '../Images/Slider2.png';
import slide3 from '../Images/Slider1.jpg';
import {  ProductCatalog } from './ProductCatalog'



// const products = [
//   {
//     id: 1,
//     name_en: "Product 1",
//     name_si: "වෙළඳ 1",
//     description_en: "Description of Product 1 in English",
//     description_si: "වෙළඳ 1 හි විස්තරය සිංහලෙන්",
//     price: 22.49,
//     quantity: 75,
//     category: "Category 3",
//     images: [slide1, slide2, slide3]
//   },
//   {
//     id: 2,
//     name_en: "Product 2",
//     name_si: "වෙළඳ 2",
//     description_en: "Description of Product 2 in English",
//     description_si: "වෙළඳ 2 හි විස්තරය සිංහලෙන්",
//     price: 34.99,
//     quantity: 50,
//     category: "Category 1",
//     images: [slide1, slide2, slide3]
//   },
//   {
//     id: 3,
//     name_en: "Product 3",
//     name_si: "වෙළඳ 3",
//     description_en: "Description of Product 3 in English",
//     description_si: "වෙළඳ 3 හි විස්තරය සිංහලෙන්",
//     price: 49.99,
//     quantity: 30,
//     category: "Category 2",
//     images: [slide1, slide2, slide3]
//   },
//   {
//     id: 4,
//     name_en: "Product 4",
//     name_si: "වෙළඳ 4",
//     description_en: "Description of Product 4 in English",
//     description_si: "වෙළඳ 4 හි විස්තරය සිංහලෙන්",
//     price: 19.99,
//     quantity: 100,
//     category: "Category 3",
//     images: [slide1, slide2, slide3]
//   },
//   {
//     id: 4,
//     name_en: "Product 4",
//     name_si: "වෙළඳ 4",
//     description_en: "Description of Product 4 in English",
//     description_si: "වෙළඳ 4 හි විස්තරය සිංහලෙන්",
//     price: 19.99,
//     quantity: 100,
//     category: "Category 3",
//     images: [slide1, slide2, slide3]
//   },
//   {
//     id: 4,
//     name_en: "Product 4",
//     name_si: "වෙළඳ 4",
//     description_en: "Description of Product 4 in English",
//     description_si: "වෙළඳ 4 හි විස්තරය සිංහලෙන්",
//     price: 19.99,
//     quantity: 100,
//     category: "Category 3",
//     images: [slide1, slide2, slide3]
//   },
//   {
//     id: 4,
//     name_en: "Product 4",
//     name_si: "වෙළඳ 4",
//     description_en: "Description of Product 4 in English",
//     description_si: "වෙළඳ 4 හි විස්තරය සිංහලෙන්",
//     price: 19.99,
//     quantity: 100,
//     category: "Category 3",
//     images: [slide1, slide2, slide3]
//   },
//   {
//     id: 4,
//     name_en: "Product 4",
//     name_si: "වෙළඳ 4",
//     description_en: "Description of Product 4 in English",
//     description_si: "වෙළඳ 4 හි විස්තරය සිංහලෙන්",
//     price: 19.99,
//     quantity: 100,
//     category: "Category 3",
//     images: [slide1, slide2, slide3]
//   },

//   // Add more objects here...
// ];




















export const Shop = () => {


  //To navigate Tab panel
  const [value, setValue] = useState('1')
  const handleChange = (event, Value) => {
    setValue(Value);
  }
  


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