import { Button, Grid, Stack, Typography,TextField,MenuItem,Dialog,DialogActions,DialogContent } from '@mui/material'
import React, {useState} from 'react'


export const Products = () => {
    
    const [open, setOpen] = useState(false);

  return (
    <Grid container >

        <Stack >
          <Typography>List of Products</Typography>
          <Button onClick={()=>setOpen(true)}>Add Product</Button>
                        <Dialog
                              open= {open}
                              aria-labelledby = 'Dialog-title'
                              aria-describedby = 'Dialog-description'>
                            <DialogContent>
                              <Stack sx={{width:'100%'}} justifyContent="center" alignItems="center" direction='column'>
                                <Typography variant='h3' color='success.main'>Add a new Product</Typography>
                                <TextField type='file'></TextField>
                                <TextField type='text' label='Enter Name in English'/>
                                <TextField type='text' label='Enter Name in Sinhala'/>
                                <TextField type='number' label='Enter the available quantity'/>
                                <TextField type='number' label='Price'/>
                                <TextField type='text' label='Enter the product description'/>
                                <TextField label='Select Catogory' select sx={{width:"50%"}}>
                                  <MenuItem value='kalka'>Kalka</MenuItem>
                                  <MenuItem value='Paththu'>Paththu</MenuItem>
                                  <MenuItem value='Guli'>Guli</MenuItem>
                                </TextField>
                              </Stack>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={()=>setOpen(false)}>Cancel</Button>
                                <Button>Submit</Button>
                            </DialogActions>
                          </Dialog>

                          
            <Typography variant='h3'>List of Products shows here.</Typography>
            
        </Stack>
        
    </Grid>
  )
}
