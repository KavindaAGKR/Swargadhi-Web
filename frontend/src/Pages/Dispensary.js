import React, { useState } from 'react'
import { Header } from '../Components/Header'
import { Footer } from '../Components/Footer'
import { Button, Dialog, Stack, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'







export const Dispensary = () => {

  const [openn, setOpen] = useState(false);


  return (
    <React.Fragment>
        <Header/>

          <Stack>
            <Stack direction='row'>

            <Carousel>
              
            </Carousel>

            </Stack>
            <Stack direction='column'>
              <Typography variant='h3'>Available Tratments</Typography>
              <Typography>Fix Disabled joints</Typography>
<<<<<<< HEAD
              <Typography>Wakugadu Amaruwa</Typography>
              <Typography>Back Pain/Typography</Typography>
=======
    <Typography>Wakugadu Amaruwa</Typography>
    <Typography>Back Pain/Typography</Typography>

>>>>>>> f17dad5394a6b752b04ca4e92ff4ce13d7d069dd
            </Stack>
          </Stack>
        


        <Footer/>
    </React.Fragment>
  )
}
