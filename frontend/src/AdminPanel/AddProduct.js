// import { MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
// import React,{ useState } from 'react'
// import axios from 'axios';

// export const AddProduct = () => {
//     const [formData, setFormData] = useState({
//         productItemID: '',
//         itemName: '',
//         price: 0,
//         availability: false,
//         description: '',
//         quantity: 0,
//         productDetails: '',
//         category: '',
//         images: []
//     });

//     // Function to handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault(); // Prevent default form submission behavior

//         try {
//             // Send a POST request to the backend endpoint with form data
//             const response = await axios.post('http://localhost:5000/api/product/', formData);
            
//             // Handle successful response from the backend
//             console.log('Product added successfully:', response.data);

//             // Optionally, you can reset the form after successful submission
//             setFormData({
//                 productItemID: '',
//                 itemName: '',
//                 price: 0,
//                 availability: false,
//                 description: '',
//                 quantity: 0,
//                 productDetails: '',
//                 category: '',
//                 images: []
//             });
//         } catch (error) {
//             // Handle errors
//             console.error('Error adding product:', error);
//         }
//     };

//     // Function to handle input changes
//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

// return (

//     <Paper sx={{width:'80%',height:'100%', margin:'auto'}} elevation={15} justifyContent='center' alignContent='center'>
//         <Stack  sx={{width:'auto', margin:'auto'}} justifyContent="center" alignItems="center" direction='column'>
//             <Typography variant='h3' color='success.main'>Add a new Product</Typography>
//            ///// <TextField type='file'></TextField>
//             <TextField type='text' label='Enter Name in English'/>
//             <TextField type='text' label='Enter Name in Sinhala'/>
//             <TextField type='number' label='Price'/>
//             <TextField type='text' label='Enter the product description sinhala'/>
//             <TextField type='text' label='Enter the product description english'/>
//             <TextField type='number' label='Enter the quantity'/>
//             <TextField type='number' label='Quantity'/>
//             ///////<TextField type='text' label='Enter the product description'/>
//             <TextField label='Select Catogory' select sx={{width:"50%"}}>
//                 <MenuItem value='kalka'>Kalka</MenuItem>
//                 <MenuItem value='Paththu'>Paththu</MenuItem>
//                 <MenuItem value='Guli'>Guli</MenuItem>
//             </TextField>
//         </Stack>

//     </Paper>
    

    
// )
// }
