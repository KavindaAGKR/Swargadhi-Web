
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';

export const SupplyMaterialSi = ({ userId }) => { 
    const [open, setOpen] = useState(false);
    const [materialData, setMaterialData] = useState({
        materialName: '',
        price: 0,
        description: '',
        quantity: 0,
        images: [],
        givenBy: userId
    });

    const handleChange = (e) => {
        setMaterialData({ ...materialData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setMaterialData({ ...materialData, images: e.target.files });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('materialName', materialData.materialName); // Ensure correct field name
        formData.append('price', materialData.price);
        formData.append('description', materialData.description);
        formData.append('quantity', materialData.quantity);
        formData.append('givenBy', materialData.givenBy);
        Array.from(materialData.images).forEach(image => {
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
            // Reset form or show success message
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error
        }
    };
    
    return (
        <Stack gap={2} sx={{margin:'0 15px'}}>
            <Typography variant='h5' > අමුද්‍රව්‍ය සපයන්න</Typography>
            <Typography variant='body1'>ඔබට ඔසු වර්ගයක් සැපයිය හැකි නම් අප හා සම්බන්ධ වන්න!</Typography>
            <Typography variant='body1' textAlign='justify'>ඔබ ප්‍රදේශයේ ආයුර්වේද බෙහෙත් නිෂ්පාදන සැකසිය හැකි ඕනෑම වර්ගයක ඖෂද පැලෑටි/අමුද්‍රව්‍ය 
                ආදිය තිබේ නම් අප හා සම්බන්ද වන්න. ඒ සදහා අප ඔබට වටිනා මිලක් ලබා දෙන්නෙමු. පහත පෝරමය පුරවා හෝ අපගේ දුරකථන අංකයට ඇමතීමෙන් අපව සම්බන්ද කර ගන්න.</Typography>
            <Button variant='contained' sx={{ alignSelf: 'start', m: '50px 0px' }} onClick={() => setOpen(true)}>අමුද්‍රව්‍ය සපයන්න</Button>
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
                        <Typography variant='h5' color='success.main' margin='auto'>අමුද්‍රව්‍ය සපයන්න</Typography>
                        <TextField name='materialName' type='text' label='ද්‍රව්‍යයේ නම සදහන් කරන්න' sx={{ width: "100%" }} value={materialData.materialName} onChange={handleChange} />
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                            <TextField name='quantity' type='number' label='සැපයිය හැකි ප්‍රමාණය සදහන් කරන්න' sx={{ width: "100%" }} value={materialData.quantity} onChange={handleChange} />
                            <TextField name='price' type='number' label='ඔබ බලාපොරොත්තු වන මිල කොපමණද?' sx={{ width: "100%" }} value={materialData.price} onChange={handleChange} />
                        </Stack>
                        <TextField name='description' type='text' label='ඔබට යම් විස්තරයක් සදහන් කිරීමට තිබේ නම් මෙහි ලියන්න' sx={{ width: "100%" }} value={materialData.description} onChange={handleChange} />
                        <Button
                            variant="outlined"
                            component="label">
                            පින්තූරයක් ‍යොදන්න
                            <input
                            accept=".png, .jpg, .jpeg"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        </Button>
                        
                        
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>ඉවත් වන්න</Button>
                    <Button onClick={handleSubmit}>සුරකින්න</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

