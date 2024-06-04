import DeleteIcon from '@mui/icons-material/Delete'; 
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';



export const Products = () => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [productData, setProductData] = useState({
        productItemID: '',
        itemNameEn: '',
        itemNameSi: '',
        price: 0,
        descriptionEn: '',
        descriptionSi: '',
        quantity: 0,
        categoryEn: '',
        categorySi: '',
        images:[]
    });
    const navigate = useNavigate();

    const handleEdit = (id) => {
        console.log(`Edit button clicked for row with id ${id}`);
        navigate(`/admin/home/products/${id}/edit`);
    };
      
    const handleChange = (e) => {
        setProductData({...productData, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        const imagesArray = Array.from(e.target.files);
        setProductData({...productData, images: imagesArray});
    }
  
    
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('productItemID', productData.productItemID);
            formData.append('itemNameEn', productData.itemNameEn);
            formData.append('itemNameSi', productData.itemNameSi);
            formData.append('price', productData.price);
            formData.append('descriptionEn', productData.descriptionEn);
            formData.append('descriptionSi', productData.descriptionSi);
            formData.append('quantity', productData.quantity);
            formData.append('categoryEn', productData.categoryEn);
            formData.append('categorySi', productData.categorySi);


            productData.images.forEach(file => {
                formData.append('images', file);
            });
    
            const response = await fetch('http://localhost:5000/api/product/', {
                method: 'POST',
                body: formData
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
    

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts();
    }, []);


    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/product/all');
            const data = await response.json();
            if (response.ok) {
                console.log(data.data)
                setProducts(data.data);
            } else {
                console.error('Error fetching Ayurvedic products:', data.message);
            }
        } catch (error) {
            console.error('Error fetching Ayurvedic products:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete product: ${errorMessage}`);
            }
    

        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    
    
    const columns = [
        { field: 'productid', headerName: 'Product ID', width: 100 },
        { field: 'name_en', headerName: 'Name (English)', width: 200 },
        { field: 'name_si', headerName: 'Name (Sinhala)', width: 200 },
        { field: 'description_en', headerName: 'Description (English)', width: 300 },
        { field: 'description_si', headerName: 'Description (Sinhala)', width: 300 },
        { field: 'price', headerName: 'Price (LKR)', width: 150 },
        { field: 'quantity', headerName: 'Available Quantity', width: 150 },
        { field: 'category_en', headerName: 'Category (English)', width: 150 },
        { field: 'category_si', headerName: 'Category (Sinhala)', width: 150 },
        {
            field: 'actions',
            headerName: 'Edit/Delete',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={()=> setOpenDelete(true)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(params.row.id)}> 
                        <EditIcon color="primary" />
                    </IconButton>
                    <Dialog open={openDelete}  >
                        <DialogTitle width={{xs:'250px', sm:'400px'}}> Do you want to delete the product? </DialogTitle>
                        <DialogActions>
                            <Button  onClick={()=>setOpenDelete(false)}>Cancel</Button>
                            <Button onClick={() => {handleDelete(params.row.id);setOpenDelete(false);}}>Yes</Button>
                        </DialogActions>
                    </Dialog>
                </>
            ),
        },
        {
            field: 'images',
            headerName: 'Images',
            width: 200,
            renderCell: (params) => {
                const product = params.row;
                return (
                    <Stack direction='row'>
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000/${image}`}
                                alt={`Product Image ${index + 1}`}
                                style={{ width: '100', height: 100, marginRight: 10 }}
                                onError={(e) => {
                                    console.error(`Failed to load image ${index}: ${e.target.src}`);
                                    e.target.onerror = null;
                                }}
                            />
                        ))}
                    </Stack>
                );
            },
        },
        
    ];
    
    
    
    const rows = products.map(product => ({
        productid: product.productItemID,
        id: product._id,
        name_en: product.itemName.en,
        name_si: product.itemName.si,
        description_en: product.description.en,
        description_si: product.description.si,
        price: product.price,
        quantity: product.quantity,
        category_en: product.category.en,
        category_si: product.category.si,
        images: product.images 
    }));
    
    
    return (
        <Stack>
            <Stack gap={2}>
                <Typography variant='h3' sx={{ margin:'20px auto'}}>List of Products</Typography>
                <Button variant='contained' sx={{width:'30%', margin:'auto'}} onClick={() => setOpen(true)}>Add New Product</Button>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby='Dialog-title'
                    aria-describedby='Dialog-description'
                    fullWidth
                    maxWidth='md'
                    
                >
                    <DialogContent>
                        <Stack gap={2} sx={{ width: '100%' }} justifyContent='space-between' direction='column'>
                            <Typography variant='h3' color='success.main' margin='auto'>Add New Product</Typography>
                            <TextField name='productItemID' type='text' label='Enter Product ID' value={productData.productItemID} onChange={handleChange} />
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                
                                <TextField name='categoryEn' label='Select Category in English' select sx={{ width: "100%" }} value={productData.categoryEn} onChange={handleChange}>
                                    <MenuItem value='kalka'>Kalka</MenuItem>
                                    <MenuItem value='Paththu'>Paththu</MenuItem>
                                    <MenuItem value='Guli'>Guli</MenuItem>
                                    <MenuItem value='Thel'>Thel</MenuItem>
                                    <MenuItem value='Chuurna'>Chuurna</MenuItem>
                                    <MenuItem value='Kashay'>Kashay</MenuItem>
                                </TextField>
                                <TextField name='categorySi' label='Select Category in Sinhala' select sx={{ width: "100%" }} value={productData.categorySi} onChange={handleChange}>
                                    <MenuItem value='කල්ක'>කල්ක</MenuItem>
                                    <MenuItem value='පත්තු'>පත්තු</MenuItem>
                                    <MenuItem value='ගුලි'>ගුලි</MenuItem>
                                    <MenuItem value='තෙල්'>තෙල්</MenuItem>
                                    <MenuItem value='චූර්න'>චූර්න</MenuItem>
                                    <MenuItem value='කසාය'>කසාය</MenuItem>
                                </TextField>
                            </Stack>
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField name='itemNameEn' type='text' label='Enter Name in English'  sx={{ width: "100%" }}  value={productData.itemNameEn} onChange={handleChange} />
                                <TextField name='itemNameSi' type='text' label='Enter Name in Sinhala' sx={{ width: "100%" }}  value={productData.itemNameSi} onChange={handleChange} />
                            </Stack>
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField name='quantity' type='number' label='Enter the available quantity'  sx={{ width: "100%" }}  value={productData.quantity} onChange={handleChange} />
                                <TextField name='price' type='number' label='Price'  sx={{ width: "100%" }}  value={productData.price} onChange={handleChange} />
                            </Stack>
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField name='descriptionEn' type='text' label='Product description in English' sx={{ width: "100%" }}  value={productData.descriptionEn} onChange={handleChange} />
                                <TextField name='descriptionSi' type='text' label='Product description in Sinhala'  sx={{ width: "100%" }}  value={productData.descriptionSi} onChange={handleChange} />
                            </Stack>
                            <input 
                                    type="file" 
                                    accept=".png, .jpg, .jpeg"
                                    name="photo"
                                    multiple onChange={handlePhoto}
                                />


                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                </Dialog>
                <Typography variant='h5'>List of Products shows here.</Typography>
                        <DataGrid
                                rows={rows}
                                getRowHeight={() => 'auto'}
                                columns={columns}
                                pageSize={10} 
                                sx={{ backgroundColor: 'white', margin: '0 25px '}}
                            />
            </Stack>
        </Stack>
    );
};

