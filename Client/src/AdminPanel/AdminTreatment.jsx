import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

export const AdminTreatment = () => {
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [treatmentData, setTreatmentData] = useState({
        treatmentNameEn: '',
        treatmentNameSi: '',
        price: '',
        descriptionEn: '',
        descriptionSi: '',
        images: []
    });
    const navigate = useNavigate();

    const handleEdit = (id) => {
        console.log(`Edit button clicked for row with id ${id}`);
        navigate(`/admin/home/treatment/${id}/edit`);
    };


    const handleChange = (e) => {
        setTreatmentData({...treatmentData, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        const imagesArray = Array.from(e.target.files);
        setTreatmentData({...treatmentData, images: imagesArray});
    }
    
    
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('treatmentNameEn', treatmentData.treatmentNameEn);
            formData.append('treatmentNameSi', treatmentData.treatmentNameSi);
            formData.append('price', treatmentData.price);
            formData.append('descriptionEn', treatmentData.descriptionEn);
            formData.append('descriptionSi', treatmentData.descriptionSi);
            treatmentData.images.forEach(file => {
                formData.append('images', file);
            });
    
            const response = await fetch('http://localhost:5000/api/treatment/add', {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
            console.log('Response from backend:', responseData);
            if (response.ok) {
                console.log('Treatment added successfully');
            } else {
                console.error('Failed to add treatment');
            }
        } catch (error) {
            console.error('Error adding treatment:', error);
        }
        setOpen(false);
    };
    

    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
        fetchAllTreatments();
    }, []);


    const fetchAllTreatments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/treatment/');
            const data = await response.json();
            if (response.ok) {
                console.log(data.data)
                setTreatments(data.data);
            } else {
                console.error('Error fetching treatments:', data.message);
            }
        } catch (error) {
            console.error('Error fetching treatments:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/treatment/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete treatment: ${errorMessage}`);
            }
    
        } catch (error) {
            console.error('Error deleting treatment:', error);
        }
    };
    
    
    
    
    const rows = treatments.map(treatment => ({
        id: treatment._id,
        treatmentName_en: treatment.treatmentName.en,
        treatmentName_si: treatment.treatmentName.si,
        description_en: treatment.description.en,
        description_si: treatment.description.si,
        price: treatment.price,
        images: treatment.images 
    }));
    


    
    const columns = [
        { field: 'id', headerName: 'Treatment ID', width: 100 },
        { field: 'treatmentName_en', headerName: 'Treatment Name (English)', width: 250 },
        { field: 'treatmentName_si', headerName: 'Treatment Name (Sinhala)', width: 250 },
        { field: 'description_en', headerName: 'Description (English)', width: 300 },
        { field: 'description_si', headerName: 'Description (Sinhala)', width: 300 },
        { field: 'price', headerName: 'Price (LKR)', width: 150 },
        { 
            field: 'images', 
            headerName: 'Images',
            width: 200,
            renderCell: (params) => {
                const treatment = params.row;
                return (
                    <div>
                        {treatment.images.map((image, index) => (
                            <img
                                key={index}
                                src={`http://localhost:5000/${image}`} 
                                alt={`Treatment Image ${index + 1}`} 
                                style={{ width: 100, height: 100, marginRight: 10 }}
                                onError={(e) => {
                                    console.error(`Failed to load image ${index}: ${e.target.src}`);
                                    e.target.onerror = null;
                                }}
                            />
                        ))}
                    </div>
                );
            },
        },
        { 
            field: 'actions', 
            headerName: 'Edit/Delete', 
            width: 150, 
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => setOpenDelete(true)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                    {console.log("Row ID:", params.row.id)}
                    <IconButton onClick={() => handleEdit(params.row.id)}> 
                        <EditIcon color="primary" />
                    </IconButton>
                    <Dialog open={openDelete} sx={{backgroundColor:'white'}} >
                        <DialogTitle width={{xs:'250px', sm:'400px'}}> Do you want to delete the treatment method? </DialogTitle>
                        <DialogActions>
                            <Button  onClick={()=>setOpenDelete(false)}>Cancel</Button>
                            <Button onClick={() => {handleDelete(params.row.id);setOpenDelete(false);}}>Yes</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            ),
        },
    ];


    return (
        <Stack>
            <Stack gap={2}>
                <Typography variant='h4' sx={{ margin:'20px auto'}}>List of Treatments</Typography>
                <Button variant='contained' sx={{width:'30%', margin:'auto'}} onClick={() => setOpen(true)}>Add New Treatment</Button>
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
                            <Typography variant='h3' color='success.main' margin='auto'>Add New Treatment</Typography>
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField name='treatmentNameEn' type='text' sx={{ width: "100%" }}  label='Enter Treatment Name in English' value={treatmentData.treatmentNameEn} onChange={handleChange} />
                                <TextField name='treatmentNameSi' type='text' sx={{ width: "100%" }}  label='Enter Treatment Name in Sinhala' value={treatmentData.treatmentNameSi} onChange={handleChange} />
                            </Stack>
                          
                            <Stack direction={{xs:'column', sm:'row'}} gap={2}>
                                <TextField name='descriptionEn' type='text' sx={{ width: "100%" }}  label='Enter the treatment description in English' value={treatmentData.descriptionEn} onChange={handleChange} />
                                <TextField name='descriptionSi' type='text' sx={{ width: "100%" }}  label='Enter the treatment description in Sinhala' value={treatmentData.descriptionSi} onChange={handleChange} />
                            </Stack>

                                <TextField name='price' type='number' sx={{ width: "100%" }}  label='Enter the price' value={treatmentData.price} onChange={handleChange} />

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
                <Typography variant='h6' margin='0 25px '>List of Treatments shows here.</Typography>
                <Box sx={{ backgroundColor: 'white', margin:{xs:'0px 5px', sm:'0 25px '}, height: '100%' }}> 
                            <DataGrid
                                rows={rows}
                                getRowHeight={() => 'auto'}
                                columns={columns}
                                pageSize={10} 
                                
                            />
                </Box>
            </Stack>
        </Stack>
    );
};
