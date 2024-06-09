import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const EditTreatment = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [treatment, setTreatment] = useState({
    treatmentName: { en: '', si: '' },
    price: 0,
    description: { en: '', si: '' },
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/treatment/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch treatment');
        }
        const data = await response.json();
        setTreatment(data);
        setCurrentImages(data.images);
      } catch (error) {
        console.error('Error fetching treatment:', error);
      }
    };

    fetchTreatment();
  }, [id]);

  const handleInputChange = (field, value) => {
    setTreatment((prevTreatment) => ({
      ...prevTreatment,
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


      formData.append('treatmentNameEn', treatment.treatmentName.en);
      formData.append('treatmentNameSi', treatment.treatmentName.si);
      formData.append('price', treatment.price);
      formData.append('descriptionEn', treatment.description.en);
      formData.append('descriptionSi', treatment.description.si);


      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch(`http://localhost:5000/api/treatment/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update treatment');
      }

      console.log('Treatment updated successfully');
      navigate(-1)
    } catch (error) {
      console.error('Error updating treatment:', error.message);
    }
  };

  return (

<Stack p='25px' gap={3}>
  
  <Typography variant='h4' textAlign='center'>Edit treatment details</Typography>
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
                            
                            {/* <TextField name='productItemID' type='text' label='Enter Product ID' value={product.productItemID} onChange={(e) => handleInputChange('productItemID', e.target.value)} />
                             */}
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField  variant="filled" name='treatmentNameEn' type='text' label='Enter treatment name in English'  sx={{ width: "100%", }}  value={treatment.treatmentName.en}
            onChange={(e) => handleInputChange('treatmentName', { ...treatment.treatmentName, en: e.target.value })}/>
                                <TextField name='treatmentNameSi' type='text' label='Enter treatment name in Sinhala' sx={{ width: "100%" }}  value={treatment.treatmentName.si}
            onChange={(e) => handleInputChange('treatmentName', { ...treatment.treatmentName, si: e.target.value })}/>
                            </Stack>
                            
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField multiline maxRows={5} name='descriptionEn' type='text' label='Treatment description in English' sx={{ width: "100%" }}  value={treatment.description.en}
            onChange={(e) => handleInputChange('description', { ...treatment.description, en: e.target.value })}/>
                                <TextField multiline maxRows={5} name='descriptionSi' type='text' label='Treatment description in Sinhala'  sx={{ width: "100%" }}  value={treatment.description.si}
            onChange={(e) => handleInputChange('description', { ...treatment.description, si: e.target.value })} />
                            </Stack>

                              <TextField name='price' type='number' label='Price (LKR)'   value={treatment.price}
            onChange={(e) => handleInputChange('price', e.target.value)}/>
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
