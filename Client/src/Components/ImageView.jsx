import React from 'react';
import { Button, Dialog } from '@mui/material';
import config from '../config';

export const ImageView = ({ image, open , onClose}) => {
    return (
        <Dialog
            open={open}  
            onClose={onClose}
            PaperProps={{
                style: { position: 'relative', padding: 0 } 
            }}

        >
            <Button onClick={onClose} sx={{position: 'absolute', backgroundColor:"white", top:6 , right:6,color:'red', opacity:0.6, 
            ":hover": {
                backgroundColor:"white",
            opacity: 1,  // Optional: Reset opacity on hover
        }}}>
                ✖
            </Button>
            <img
                src={`${config.baseURL}${image}`} 
                alt="Material image" 
                style={{ maxWidth: '100%', height: 'auto' }} 
            />
        </Dialog>
    );
};
