
import DeleteIcon from '@mui/icons-material/Delete'; // Imported DeleteIcon only, EditIcon is not used
import { Button, Dialog, DialogActions, DialogContent, MenuItem, Stack, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';


export const AdminDoctor = () => {
    const [open, setOpen] = useState(false);
    const [doctorData, setDoctorData] = useState({
        doctorID: '',
        nameEn: '',
        nameSi: '',
        descriptionEn: '',
        descriptionSi: '',
        time:'0',
        images:[]
    });
   
    const handleChange = (e) => {
        setDoctorData({...doctorData, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        const imagesArray = Array.from(e.target.files);
        setDoctorData({...doctorData, images: imagesArray});
    }
    const navigate = useNavigate();
    const handleEdit = (id) => {
        console.log(`Edit button clicked for row with id ${id}`);
        navigate(`/admin/home/doctor/${id}/edit`);
    };
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('doctorID', doctorData.doctorID);
            formData.append('nameEn', doctorData.nameEn);
            formData.append('nameSi', doctorData.nameSi);
            formData.append('descriptionEn', doctorData.descriptionEn);
            formData.append('descriptionSi', doctorData.descriptionSi);
            formData.append('time', doctorData.time);

            doctorData.images.forEach(file => {
                formData.append('images', file);
            });
    
            const response = await fetch('http://localhost:5000/api/doctor/add', {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
            
            if (response.ok) {
                console.log('Product added successfully');
            } else {
                console.error('Failed to add doctor');
            }
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
        setOpen(false);
    };
    

    const [doctors, setDoctors] = useState([]);



    const fetchAllDoctors = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/doctor/');
            const data = await response.json();
            if (response.ok) {
                
                setDoctors(data.data);
            } else {
                console.error('Error fetching doctosr products:', data.message);
            }
        } catch (error) {
            console.error('Error fetching doctors products:', error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/doctor/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to delete doctor: ${errorMessage}`);
            }
    
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };
    
    useEffect(() => {
        fetchAllDoctors();
    }, []);



    const columns = [
        { field: 'id ', headerName: 'Doctor ID', width: 100 },
        { field: 'name_en', headerName: 'Name (English)', width: 200 },
        { field: 'name_si', headerName: 'Name (Sinhala)', width: 200 },
        { field: 'description_en', headerName: 'Description (English)', width: 300 },
        { field: 'description_si', headerName: 'Description (Sinhala)', width: 300 },
        { field: 'time', headerName: 'Price (LKR)', width: 150 },
        { 
            field: 'images', 
            headerName: 'Images',
            width: 200,
            renderCell: (params) => {
                const doctor = params.row;
                console.log(doctor)
                return (
                    <div>
                    {doctor.images.map((images, index) => (

                        <img
                            key={index}
                            src={`http://localhost:5000/${images}`} 
                            alt={`Product Image ${index + 1}`} 
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
                    {/* <IconButton onClick={() => handleEdit(params.row.id)}>
                        <EditIcon color="primary" />
                    </IconButton> */}
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon color="error" />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(params.row.id)}> {/* Call handleEdit function with row id */}
                        <EditIcon color="primary" />
                    </IconButton>
         
                    {console.log("Row ID:", params.row.id)}
                </div>
            ),
        },
    ];
    
    
    const rows = doctors.map(doctor => ({
        id: doctor._id,
        name_en: doctor.name.en,
        name_si: doctor.name.si,
        description_en: doctor.description.en,
        description_si: doctor.description.si,
        time:doctor.time,
        images: doctor.images // Assum object contains an array of image URLs
    }));
    
    return (
        <Stack>
            <Stack gap={2}>
                <Typography variant='h3' sx={{ margin:'20px auto'}}>List of Doctor</Typography>
                <Button variant='contained' sx={{width:'30%', margin:'auto'}} onClick={() => setOpen(true)}>Add New Product</Button>
                <Dialog
                    open={open}
                    aria-labelledby='Dialog-title'
                    aria-describedby='Dialog-description'
                >
                    <DialogContent>
                        <Stack gap={2} sx={{ width: '100%' }} justifyContent='space-between' direction='column'>
                            <Typography variant='h3' color='success.main' margin='auto'>Add New Product</Typography>
                            <Stack direction='row' gap={2}>
                                <TextField name='doctorID' type='text' label='Enter  ID' value={doctorData.doctorID} onChange={handleChange} />
                               
                            </Stack>
                            <Stack direction='row' gap={2}>
                                <TextField name='nameEn' type='text' label='Enter Name in English' value={doctorData.nameEn} onChange={handleChange} />
                                <TextField name='nameSi' type='text' label='Enter Name in Sinhala' value={doctorData.nameSi} onChange={handleChange} />
                            </Stack>
                          
                            <Stack direction='row' gap={2}>
                                <TextField name='descriptionEn' type='text' label='Enter the doctor description in English' value={doctorData.descriptionEn} onChange={handleChange} />
                                <TextField name='descriptionSi' type='text' label='Enter the doctor description in Sinhala' value={doctorData.descriptionSi} onChange={handleChange} />
                            </Stack>
                            <Stack direction='row' gap={2}>
                                <TextField name='time' type='number' label='Enter the available time' value={doctorData.time} onChange={handleChange} />
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
                <Typography variant='h5'>List of Doctor shows here.</Typography>
                <Box sx={{ backgroundColor: 'white', margin: '0 25px ', height: '100%' }}>
                    <Stack>
                        <Stack style={{ height: '100%', width: '100%' }}>   
                        <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10} 
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    );
};
