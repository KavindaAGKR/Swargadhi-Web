import React, { useState, useEffect } from 'react';
import { Button, Grid, Stack, Typography, TextField, MenuItem, Dialog, DialogActions, DialogContent } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import Firebase storage functions
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import ConvertToBase64 from './constants/convertToBase64';
import { auto } from '@popperjs/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




export const Products = () => {
    const [open, setOpen] = useState(false);
    const [productData, setProductData] = useState({
        productItemID: '',
        itemNameEn: '',
        itemNameSi: '',
        price: 0,
        descriptionEn: '',
        descriptionSi: '',
        quantity: 0,
        category: '',
        images: [] // Changed to an array
    });

    const firebaseConfig = {
        // Your Firebase config here
        apiKey: "AIzaSyCwTnB-5-JNu-wu4S-jejIBZ4ylcAiWzH0",
        authDomain: "swargadi-3250a.firebaseapp.com",
        projectId: "swargadi-3250a",
        storageBucket: "swargadi-3250a.appspot.com",
        messagingSenderId: "991902590983",
        appId: "1:991902590983:web:329754a966b8b39e0ee2a2",
        measurementId: "G-0KGDYEWK6L"
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const storageRef = ref(storage, "images");

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setProductData({ ...productData, images: selectedFiles });
    };

    const handleUpload = async () => {
        try {
            const urls = [];
    
            // Upload each image
            for (let i = 0; i < productData.images.length; i++) {
                const image = productData.images[i];
                const imageName = image.name;
                const imageRef = ref(storageRef, imageName);
                const metadata = { contentType: image.type };
                const uploadTask = uploadBytesResumable(imageRef, image, metadata);
                
                const snapshot = await uploadTask;
    
                // Get download URL for the uploaded image
                const downloadURL = await getDownloadURL(snapshot.ref);
                urls.push(downloadURL);
                console.log(`File ${imageName} uploaded successfully. URL:`, downloadURL);
            }
    
            // Update the state with all download URLs
            setProductData(prevData => ({
                ...prevData,
                images: urls
            }));
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const formattedData = {
                productItemID: productData.productItemID,
                itemName: {
                    en: productData.itemNameEn,
                    si: productData.itemNameSi
                },
                price: productData.price,
                description: {
                    en: productData.descriptionEn,
                    si: productData.descriptionSi
                },
                quantity: productData.quantity,
                category: {
                    en: productData.category,
                    si: productData.category 
                },
                images: productData.images, // Only storing image names
            };

            console.log('Formatted Data:', formattedData);

            const response = await fetch('http://localhost:5000/api/product/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            });

            const responseData = await response.json();

            console.log('Response from backend:', responseData);

            if (response.ok) {
                console.log('Product added successfully');
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
        setOpen(false);
    };


//Fetch Data To DataGrid from The Backend
const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    useEffect(() => {
        return () => {
            productData.images.forEach((image) => {
                if (typeof image !== 'string') {
                    URL.revokeObjectURL(image);
                }
            });
        };
    }, [productData.images]);




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

    const columns = [
        { field: 'id', headerName: 'Product ID', width: 100 },
        { field: 'name_en', headerName: 'Name (English)', width: 200 },
        { field: 'name_si', headerName: 'Name (Sinhala)', width: 200 },
        { field: 'description_en', headerName: 'Description (English)', width: 300 },
        { field: 'description_si', headerName: 'Description (Sinhala)', width: 300 },
        { field: 'price', headerName: 'Price (LKR)', width: 150 },
        { field: 'quantity', headerName: 'Available Quantity', width: 150 },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'image', headerName: 'Image', width: 150, renderCell: (params) => 
        params.value && params.value.length > 0 ? 
        <img src={params.value[0]} alt="Product {id}" style={{ width: '100%', height: 'auto' }} /> 
        : null },
        { 
            field: 'actions', 
            headerName: 'Edit/Delete', 
            width: 150, 
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <EditIcon color="primary" />
                    <DeleteIcon color="error" />
                </Stack>
            ),
        },

    ];

    const rows = products.map(product => ({
        id: product.productItemID,
        name_en: product.itemName.en,
        name_si: product.itemName.si,
        description_en: product.description.en,
        description_si: product.description.si,
        price: product.price,
        quantity: product.quantity,
        category: product.category.en,
        image: product.images ? product.images : [], 
    }));







    return (
        <Stack>
            <Stack gap={2}>
                <Typography variant='h3' sx={{ margin:'20px auto'}}>List of Products</Typography>
                <Button variant='contained' sx={{width:'30%', margin:'auto'}} onClick={() => setOpen(true)}>Add New Product</Button>
                <Dialog
                    open={open}
                    aria-labelledby='Dialog-title'
                    aria-describedby='Dialog-description'
                >
                    <DialogContent>
                        <Stack gap={2} sx={{ width: '100%' }} justifyContent='space-between' direction='column'>
                            <Typography variant='h3' color='success.main'>Add a new Product</Typography>
                            <Stack direction='row' gap={2}>
                            <TextField name='productItemID' type='text' label='Enter Product ID' value={productData.productItemID} onChange={handleChange} />
                            <TextField name='category' label='Select Category' select sx={{ width: "50%" }} value={productData.category} onChange={handleChange}>
                                <MenuItem value='kalka'>Kalka</MenuItem>
                                <MenuItem value='Paththu'>Paththu</MenuItem>
                                <MenuItem value='Guli'>Guli</MenuItem>
                            </TextField>

                            </Stack >
                            <Stack direction='row' gap={2}>
                                <TextField name='itemNameEn' type='text' label='Enter Name in English' value={productData.itemNameEn} onChange={handleChange} />
                                <TextField name='itemNameSi' type='text' label='Enter Name in Sinhala' value={productData.itemNameSi} onChange={handleChange} />
                            
                            </Stack>
                            <Stack direction='row' gap={2}>
                                <TextField name='quantity' type='number' label='Enter the available quantity' value={productData.quantity} onChange={handleChange} />
                                <TextField name='price' type='number' label='Price' value={productData.price} onChange={handleChange} />
                            

                            </Stack>
                            <Stack direction='row' gap={2}>
                                <TextField name='descriptionEn' type='text' label='Enter the product description in English' value={productData.descriptionEn} onChange={handleChange} />
                                <TextField name='descriptionSi' type='text' label='Enter the product description in Sinhala' value={productData.descriptionSi} onChange={handleChange} />
                            
                            </Stack>
                            
                            {/* <Stack direction='row' gap={2}>
                            <label>Add a Image:</label>
                            <input name='images' type='file' label='Enter the image' onChange={handleFileUpload} multiple />
                            </Stack> */}


                            <div>
                                <h2>Upload Images</h2>
                                <input type="file" onChange={handleImageChange} multiple />
                                <button onClick={handleUpload}>Upload</button>
                                {/* Image preview */}
                                <div>
                                    {productData.images.map((image, index) => (
                                        <img key={index} src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt={`image-${index}`} width="100" />
                                    ))}
                                </div>
                            </div>


                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
                <Typography variant='h5'>List of Products shows here.</Typography>




                <Stack style={{ height: '100%',    }}>
                {products.length > 0 ? (


        <Box sx={{ backgroundColor: 'white', margin: '0 25px ', height: '100%' }}>
            <Stack>
                <div style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        
                        rows={rows}
                        columns={columns}
                        pageSize={auto}
                        
                        
                        getRowHeight={() => auto}
                        // checkboxSelection
                        // disableSelectionOnClick
                    />
                </div>
            </Stack>
        </Box>





) : (
    <Typography>No products available</Typography>
)}











        </Stack>


            </Stack>
        </Stack>
    );
};




