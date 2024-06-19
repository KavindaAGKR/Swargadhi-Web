import React, { useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, Snackbar, Stack, TextField, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';


export const SupplyMaterial = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [materialData, setMaterialData] = useState({
        materialName: '',
        price: '',
        description: '',
        quantity: '',
        images: [],
        givenBy: user._id
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setMaterialData({ ...materialData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setMaterialData({ ...materialData, images: Array.from(e.target.files) });
    };

    const handleSubmit = async () => {

        if(!user.mobileNumber){
            setSnackbarOpen(true);
            setSnackMessage("Fill the mobile number field in the User details window");
            return;
        }

        if(!materialData.materialName || !materialData.quantity || !materialData.price){
            setError(true)
            return;
        }

        const formData = new FormData();
        formData.append('materialName', materialData.materialName);
        formData.append('price', materialData.price);
        formData.append('description', materialData.description);
        formData.append('quantity', materialData.quantity);
        formData.append('givenBy', materialData.givenBy);
        materialData.images.forEach(image => {
            formData.append('images', image);
        });

       

        try {
            const response = await fetch('http://localhost:5000/api/material/supplymaterial', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setOpen(false);
            setSnackbarOpen(true);
            setSnackMessage("Form successfully submitted");
        } catch (error) {
            setSnackbarOpen(true);
            setSnackMessage("The form not submitted");
        }
    };

    return (
        <Stack gap={2} sx={{ margin: '0 15px' }}>
            <Typography variant='h5' >Supply Materials</Typography>
            <Typography variant='body1'>If you can supply any kind of herbals, connect with us!</Typography>
            <Typography variant='body1' textAlign='justify' mb='50px'>
                Swargadhi is ready to give a valuable offer for your supplies. Contact us if you have
                any herbal materials that can produce ayurvedic products. Fill out the form below with your material. We will contact you asap.
            </Typography>

            {
                !user.mobileNumber ? (<Stack direction='row' ><ErrorIcon color='error'/><Typography variant='body' color="error" textAlign='left' >Fill the mobile number before submit a material form</Typography>
                                </Stack>) :('')
            }
            
            <Button variant='contained' sx={{ alignSelf: 'start',  }} onClick={() => setOpen(true)}>Supply Materials</Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby='Dialog-title'
                aria-describedby='Dialog-description'
                fullWidth
                maxWidth='md'
                PaperProps={{ sx: { borderRadius: "25px" } }}
            >
                <DialogContent>
                    <Stack gap={2} sx={{ width: '100%' }} justifyContent='space-between' direction='column'>
                        <Typography variant='h5' color='success.main' margin='20px auto'>Supply Materials</Typography>
                        <TextField
                        required
                        error={error && !materialData.materialName}
              helperText={error ? 'Enter the material name' : ''}
                            name='materialName'
                            type='text'
                            label='Enter Material Name'
                            sx={{ width: "100%" }}
                            value={materialData.materialName}
                            onChange={handleChange}
                        />
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                            <TextField
                            required
                            error={error && !materialData.quantity}
              helperText={error ? 'Enter the quantity' : ''}
                                name='quantity'
                                type='text'
                                label='Enter the available quantity'
                                sx={{ width: "100%" }}
                                value={materialData.quantity}
                                onChange={handleChange}
                            />
                            <TextField
                            required
                            error={error && !materialData.price}
              helperText={error ? 'Enter the price' : ''}
                                name='price'
                                type='number'
                                label='Your expected Price (LKR)'
                                sx={{
                                    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": { display: "none" },
                                    width: "100%"
                                }}
                                value={materialData.price}
                                onChange={handleChange}
                            />
                        </Stack>
                        <TextField
                            name='description'
                            type='text'
                            label='Enter any description about materials'
                            sx={{ width: "100%" }}
                            value={materialData.description}
                            onChange={handleChange}
                        />
                        
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{width:'200px'}}
                        >
                            Select Photos
                            <input
                                accept=".png, .jpg, .jpeg"
                                type="file"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </Button>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                            {materialData.images.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt={`preview-${index}`} width='100px' height='100px' />
                            ))}
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{margin:'15px'}}>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => { setSnackbarOpen(false);} }
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                sx={{ marginTop: "50px", width: '100%' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackMessage === "Form successfully submitted" ? 'success' : 'error'}
                    variant="filled"
                >
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Stack>
    );
};
