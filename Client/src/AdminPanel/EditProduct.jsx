import { Button, Container, Input, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditProduct = () => {

  const navigate = useNavigate();


  const { id } = useParams();
  const [product, setProduct] = useState({
    itemName: { en: '', si: '' },
    description: { en: '', si: '' },
    category: { en: '', si: '' },
    productItemID: '',
    price: 0,
    quantity: 0,
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setCurrentImages(data.images);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);



  const handleInputChange = (field, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value
    }));
  };



  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };



  const handleSaveChanges = async () => {

    try {
      const formData = new FormData();



      formData.append('productItemID', product.productItemID);
      formData.append('price', product.price);
      formData.append('quantity', product.quantity);
      formData.append('itemNameEn', product.itemName.en);
      formData.append('itemNameSi', product.itemName.si);
      formData.append('descriptionEn', product.description.en);
      formData.append('descriptionSi', product.description.si);
      formData.append('categoryEn', product.category.en);
      formData.append('categorySi', product.category.si);


      imageFiles.forEach((file, index) => {
        formData.append(`images`, file);
      });

      const response = await fetch(`http://localhost:5000/api/product/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      

      console.log('Product updated successfully');
      navigate(-1);
    } catch (error) {
      console.error('Error updating product:', error.message);
    }
    
  };


  return (

<Stack p='25px' gap={3}>
  
  <Typography variant='h4' textAlign='center'>Edit product details</Typography>
<Typography variant='h6'>Current images:</Typography>
<Container>
{currentImages.map((imageUrl, index) => (
              <img
                key={index}
                src={`http://localhost:5000${imageUrl}`}
                alt={`Image ${index}`}
                style={{ width: '150px', height: '150px', marginRight: '10px' }}
              />
            ))}
</Container>

<Stack gap={5} sx={{ width: '100%' }} justifyContent='space-between' direction='column'>
                            
                            <TextField name='productItemID' type='text' label='Enter Product ID' value={product.productItemID} onChange={(e) => handleInputChange('productItemID', e.target.value)} />
                            
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField  variant="filled" name='itemNameEn' type='text' label='Enter Name in English'  sx={{ width: "100%", }}  value={product.itemName.en}
            onChange={(e) => handleInputChange('itemName', { ...product.itemName, en: e.target.value })} />
                                <TextField name='itemNameSi' type='text' label='Enter Name in Sinhala' sx={{ width: "100%" }}  value={product.itemName.si}
            onChange={(e) => handleInputChange('itemName', { ...product.itemName, si: e.target.value })} />
                            </Stack>
                            
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField multiline maxRows={5} name='descriptionEn' type='text' label='Product description in English' sx={{ width: "100%" }}  value={product.description.en}
            onChange={(e) => handleInputChange('description', { ...product.description, en: e.target.value })}/>
                                <TextField multiline maxRows={5} name='descriptionSi' type='text' label='Product description in Sinhala'  sx={{ width: "100%" }}  value={product.description.si}
            onChange={(e) => handleInputChange('description', { ...product.description, si: e.target.value })} />
                            </Stack>
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                
                                <TextField name='categoryEn' label='Select Category in English' select sx={{ width: "100%" }} 
                                value={product.category.en} onChange={(e) => handleInputChange('category', { ...product.category, en: e.target.value })}>
                                    <MenuItem value='kalka'>Kalka</MenuItem>
                                    <MenuItem value='Paththu'>Paththu</MenuItem>
                                    <MenuItem value='Guli'>Guli</MenuItem>
                                    <MenuItem value='Thel'>Thel</MenuItem>
                                    <MenuItem value='Chuurna'>Chuurna</MenuItem>
                                    <MenuItem value='Kashay'>Kashay</MenuItem>
                                </TextField>
                                <TextField name='categorySi' label='Select Category in Sinhala' select sx={{ width: "100%" }} 
                                value={product.category.si} onChange={(e) => handleInputChange('category', { ...product.category, si: e.target.value })}>
                                    <MenuItem value='කල්ක'>කල්ක</MenuItem>
                                    <MenuItem value='පත්තු'>පත්තු</MenuItem>
                                    <MenuItem value='ගුලි'>ගුලි</MenuItem>
                                    <MenuItem value='තෙල්'>තෙල්</MenuItem>
                                    <MenuItem value='චූර්න'>චූර්න</MenuItem>
                                    <MenuItem value='කසාය'>කසාය</MenuItem>
                                </TextField>
                            </Stack>
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField name='quantity' type='number' label='Enter the available quantity'  sx={{ width: "100%" }}  value={product.quantity}
            onChange={(e) => handleInputChange('quantity', e.target.value)} />
                                <TextField name='price' type='number' label='Price (LKR)'  sx={{ width: "100%" }}  value={product.price}
            onChange={(e) => handleInputChange('price', e.target.value)} />
                            </Stack>

                        </Stack>
{/* Upload new images */}
<Typography>Upload New Image: <input type="file" multiple  onChange={handleImageUpload} /></Typography>
          
          
          <Typography >New Image Preview:</Typography>
          {/* New image previews */}
          {imageFiles.length > 0 && (
            
            <Container>
              
              {imageFiles.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`New Image ${index}`}
                  style={{ width: '150px', height: '150px', marginRight: '10px' }}
                />
              ))}
            </Container>
          )}
          <Stack direction='row' sx={{width:'300px',margin:'auto'}} gap={5}>
            <Button variant='contained' onClick={()=>navigate(-1)}>Cancel</Button>
          <Button variant='contained'  onClick={handleSaveChanges} >Save Changes</Button>
          </Stack>


                        </Stack>

    

  );
};
