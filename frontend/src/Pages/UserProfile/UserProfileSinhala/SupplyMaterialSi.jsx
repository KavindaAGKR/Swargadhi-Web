import React, { useState } from 'react';
import { Alert, Button, Dialog, DialogActions, DialogContent, Snackbar, Stack, TextField, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';


export const SupplyMaterialSi = ({ user }) => {
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
        const { name, value } = e.target;
        setMaterialData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setMaterialData((prevData) => ({ ...prevData, images: Array.from(e.target.files) }));
    };

    const handleSubmit = async () => {

        if(!user.mobileNumber){
            setSnackbarOpen(true);
            setSnackMessage("ඔබ 'මගේ විස්තර'හි දුරකථන අංකයක් සපයා නොමැත.");
            return;
        }

        if (!materialData.materialName || !materialData.quantity || !materialData.price) {
            setError(true);
            return;
        }

        const formData = new FormData();
        formData.append('materialName', materialData.materialName);
        formData.append('price', materialData.price);
        formData.append('description', materialData.description);
        formData.append('quantity', materialData.quantity);
        formData.append('givenBy', materialData.givenBy);
        materialData.images.forEach((image) => {
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
            setSnackMessage("පෝරමය සුරකින ලදි");
        } catch (error) {
            setSnackbarOpen(true);
            setSnackMessage("යම් කිසි දෝෂයක් ඇති විය");
        }
    };

    return (
        <Stack gap={2} sx={{ margin: '0 15px' }}>
            <Typography variant='h5'>අමුද්‍රව්‍ය සපයන්න</Typography>
            <Typography variant='body1'>ඔබට ඔසු වර්ගයක් සැපයිය හැකි නම් අප හා සම්බන්ධ වන්න!</Typography>
            <Typography variant='body1' textAlign='justify' mb='50px'>
                ඔබ ප්‍රදේශයේ ආයුර්වේද බෙහෙත් නිෂ්පාදන සැකසිය හැකි ඕනෑම වර්ගයක ඖෂද පැලෑටි/අමුද්‍රව්‍ය
                ආදිය තිබේ නම් අප හා සම්බන්ද වන්න. ඒ සදහා අප ඔබට වටිනා මිලක් ලබා දෙන්නෙමු. පහත පෝරමය පුරවා හෝ අපගේ දුරකථන අංකයට ඇමතීමෙන් අපව සම්බන්ද කර ගන්න.
            </Typography>
            {
                !user.mobileNumber ? (<Stack direction='row' ><ErrorIcon color='error'/><Typography variant='body' color="error" textAlign='left' >ද්‍රව්‍ය පෝරමයක් ඉදිරිපත් කිරීමට පෙර "මගේ විස්තර"හි දුරකථන අංකයක් යොදන්න</Typography>
                                </Stack>) :('')
            }
            <Button variant='contained' sx={{ alignSelf: 'start' }} onClick={() => setOpen(true)}>අමුද්‍රව්‍ය සපයන්න</Button>
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
                        <Typography variant='h5' color='success.main' margin='20px auto'>අමුද්‍රව්‍ය සපයන්න</Typography>
                        <TextField
                            required
                            error={error && !materialData.materialName}
                            helperText={error ? 'අමුද්‍රව්‍ය නම සදහන් කරන්න' : ''}
                            name='materialName'
                            type='text'
                            label='ද්‍රව්‍යයේ නම සදහන් කරන්න'
                            sx={{ width: "100%" }}
                            value={materialData.materialName}
                            onChange={handleChange}
                        />
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                            <TextField
                                required
                                error={error && !materialData.quantity}
                                helperText={error ? 'ප්‍රමාණය සදහන් කරන්න' : ''}
                                name='quantity'
                                type='text'
                                label='සැපයිය හැකි ප්‍රමාණය සදහන් කරන්න'
                                sx={{ width: "100%" }}
                                value={materialData.quantity}
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                error={error && !materialData.price}
                                helperText={error ? 'මිල කොපමණද' : ''}
                                name='price'
                                type='number'
                                label='ඔබ බලාපොරොත්තු වන මිල කොපමණද? (LKR)'
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
                            label='ඔබට යම් විස්තරයක් සදහන් කිරීමට තිබේ නම් මෙහි ලියන්න'
                            sx={{ width: "100%" }}
                            value={materialData.description}
                            onChange={handleChange}
                        />
                        <Button
                            variant="outlined"
                            component="label"
                            sx={{width:'200px'}}
                        >
                            පින්තූර ‍යොදන්න
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
                    <Button onClick={() => setOpen(false)}>ඉවත් වන්න</Button>
                    <Button variant='contained' color='success' onClick={handleSubmit}>සුරකින්න</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => { setSnackbarOpen(false); }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                sx={{ marginTop: "50px", width: '100%' }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackMessage === "පෝරමය සුරකින ලදි" ? 'success' : 'error'}
                    variant="filled"
                >
                    {snackMessage}
                </Alert>
            </Snackbar>
        </Stack>
    );
};
