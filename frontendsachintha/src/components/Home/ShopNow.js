import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './ShopNow.css'; // Import the CSS file

export default function ShopNow() {
  return (
    <div className="container">
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" className="custom-button">
          Shop Now
        </Button>
      </Stack>
    </div>
  );
}
