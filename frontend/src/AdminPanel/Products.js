import React, { useState, useEffect } from 'react';
import { Button, Grid, Stack, Typography, TextField, MenuItem, Dialog, DialogActions, DialogContent } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import Firebase storage functions

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
        const urls = [];

        // Upload each image
        for (let i = 0; i < productData.images.length; i++) {
            const image = productData.images[i];
            const imageName = image.name;
            const imageRef = ref(storageRef, imageName);
            const metadata = { contentType: image.type };
            const uploadTask = uploadBytesResumable(imageRef, image, metadata);
            
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Handle upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload ${imageName} is ${progress}% done`);
                },
                (error) => {
                    // Handle upload errors
                    console.error(`Error uploading ${imageName}:`, error);
                },
                async () => {
                    // Handle successful upload completion
                    try {
                        const downloadURL = await getDownloadURL(imageRef);
                        urls.push(downloadURL);
                        console.log(`File ${imageName} uploaded successfully. URL:`, downloadURL);
                        setProductData(prevData => ({
                            ...prevData,
                            images: urls
                        }));
                    } catch (error) {
                        console.error(`Error retrieving download URL for ${imageName}:`, error);
                    }
                }
            );
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

    useEffect(() => {
        return () => {
            productData.images.forEach((image) => {
                if (typeof image !== 'string') {
                    URL.revokeObjectURL(image);
                }
            });
        };
    }, [productData.images]);

    return (
        <Grid container>
            <Stack>
                <Typography>List of Products</Typography>
                <Button onClick={() => setOpen(true)}>Add Product</Button>
                <Dialog
                    open={open}
                    aria-labelledby='Dialog-title'
                    aria-describedby='Dialog-description'
                >
                    <DialogContent>
                        <Stack sx={{ width: '100%' }} justifyContent="center" alignItems="center" direction='column'>
                            <Typography variant='h3' color='success.main'>Add a new Product</Typography>
                            <TextField name='productItemID' type='text' label='Enter Product ID' value={productData.productItemID} onChange={handleChange} />
                            <TextField name='itemNameEn' type='text' label='Enter Name in English' value={productData.itemNameEn} onChange={handleChange} />
                            <TextField name='itemNameSi' type='text' label='Enter Name in Sinhala' value={productData.itemNameSi} onChange={handleChange} />
                            <TextField name='quantity' type='number' label='Enter the available quantity' value={productData.quantity} onChange={handleChange} />
                            <TextField name='price' type='number' label='Price' value={productData.price} onChange={handleChange} />
                            <TextField name='descriptionEn' type='text' label='Enter the product description in English' value={productData.descriptionEn} onChange={handleChange} />
                            <TextField name='descriptionSi' type='text' label='Enter the product description in Sinhala' value={productData.descriptionSi} onChange={handleChange} />
                            <TextField name='category' label='Select Category' select sx={{ width: "50%" }} value={productData.category} onChange={handleChange}>
                                <MenuItem value='kalka'>Kalka</MenuItem>
                                <MenuItem value='Paththu'>Paththu</MenuItem>
                                <MenuItem value='Guli'>Guli</MenuItem>
                            </TextField>
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
                <Typography variant='h3'>List of Products shows here.</Typography>
            </Stack>
        </Grid>
    );
};

export default Products;

