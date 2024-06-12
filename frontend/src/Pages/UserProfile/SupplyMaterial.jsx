// import React, { useState } from 'react'
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField, Typography } from '@mui/material';


// export const SupplyMaterial = () => {

//     const [open, setOpen] = useState(false);
//     const [materialData, setMaterialData] = useState({
//         materialName: '',
//         price: 0,
//         description: '',
//         quantity: 0,
//         images:[]
//     });

//     const handleChange = (e) => {
//         setMaterialData({...materialData, [e.target.name]: e.target.value});
//     }



//     return (
//     <Stack gap={2}>
//         <Typography variant='h5' mb='20px'> Supply Materials</Typography>
//     <Typography variant='body'>If you can supply any kind of herbals, connect with us!</Typography>
//     <Typography variant='body'>Swargadhi ready to give a valueble offer for your supplies. Contact us if you have
//         any herbal materials that can produce ayurvedic products. Fill below form with your material. We will contact you asap.
//     </Typography>
    





//     <Button variant='contained' sx={{alignSelf:'start' , m:'50px 0px'}} onClick={() => setOpen(true)}>Supply Materials</Button>
//                 <Dialog
//                     open={open}
//                     onClose={() => setOpen(false)}
//                     aria-labelledby='Dialog-title'
//                     aria-describedby='Dialog-description'
//                     fullWidth
//                     maxWidth='md'
                    
//                 >
//                     <DialogContent>
//                         <Stack gap={2} sx={{ width: '100%' }} justifyContent='space-between' direction='column'>
//                             <Typography variant='h5' color='success.main' margin='auto'>Materials</Typography>
                            
                            
//                                 <TextField name='itemNameEn' type='text' label='Enter Material Name '  sx={{ width: "100%" }}  value={materialData.materialName} onChange={handleChange} />
                          
//                             <Stack direction={{xs:'column', sm:'row'}} gap={2}>
//                                 <TextField name='quantity' type='number' label='Enter the available quantity'  sx={{ width: "100%" }}  value={materialData.quantity} onChange={handleChange} />
//                                 <TextField name='Price' type='number' label='Your Price for Materials'  sx={{ width: "100%" }}  value={materialData.price} onChange={handleChange} />
//                             </Stack>
                            
//                                 <TextField name='description' type='text' label='Enter any description about materials' sx={{ width: "100%" }}  value={materialData.descriptionEn} onChange={handleChange} />
                                
                            
//                             <input 
//                                     type="file" 
//                                     accept=".png, .jpg, .jpeg"
//                                     name="photo"
//                                     onChange={handleChange}
//                                 />


//                         </Stack>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={() => setOpen(false)}>Cancel</Button>
//                         <Button  >Submit</Button>
//                     </DialogActions>
//                 </Dialog>
//     </Stack>
//   )
// }


import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';

export const SupplyMaterial = ({ userId }) => { // Assuming userId is passed as a prop
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
            <Typography variant='h5' > Supply Materials</Typography>
            <Typography variant='body1'>If you can supply any kind of herbals, connect with us!</Typography>
            <Typography variant='body1' textAlign='justify'>Swargadhi is ready to give a valuable offer for your supplies. Contact us if you have
                any herbal materials that can produce ayurvedic products. Fill out the form below with your material. We will contact you asap.
            </Typography>
            <Button variant='contained' sx={{ alignSelf: 'start', m: '50px 0px' }} onClick={() => setOpen(true)}>Supply Materials</Button>
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
                        <Typography variant='h5' color='success.main' margin='auto'>Supply Materials</Typography>
                        <TextField name='materialName' type='text' label='Enter Material Name' sx={{ width: "100%" }} value={materialData.materialName} onChange={handleChange} />
                        <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
                            <TextField name='quantity' type='number' label='Enter the available quantity' sx={{ width: "100%" }} value={materialData.quantity} onChange={handleChange} />
                            <TextField name='price' type='number' label='Your Price for Materials' sx={{ width: "100%" }} value={materialData.price} onChange={handleChange} />
                        </Stack>
                        <TextField name='description' type='text' label='Enter any description about materials' sx={{ width: "100%" }} value={materialData.description} onChange={handleChange} />
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="images"
                            multiple
                            onChange={handleFileChange}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

