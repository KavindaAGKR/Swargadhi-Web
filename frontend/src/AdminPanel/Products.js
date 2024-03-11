import { Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Products = () => {
    const navigate = useNavigate();

  return (
    <Grid container >
        
        <Stack >
          <Typography>List of Products</Typography>
            <Button variant='contained' onClick={()=>{navigate('/admin/addproduct')}} >AddProduct</Button>
        </Stack>

    </Grid>
  )
}
