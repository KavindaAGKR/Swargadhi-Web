import React, { useState } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { Box, Button, Container, Dialog, Grid, Stack, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import slide1 from '../../Images/Slider1.jpg'
import slide2 from '../../Images/Slider2.png'
import slide3 from '../../Images/Slider3.png'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation, Pagination   } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const slides = [
slide1,slide2,slide3
]
  





export const Dispensary = () => {

  const [openn, setOpen] = useState(false);




  return (
    <React.Fragment>
        <Header/>
        <Stack  color='green'  direction='row' margin='25px' justifyContent='center' gap={2}>
                <MedicalInformationIcon sx={{fontSize:'60px'}} />
                <Typography variant='h2'  >
                 Dispensary
                </Typography>
        </Stack>
<Stack>
  
  
</Stack>



          <Stack direction='row' height='500px' margin='50px'>
            <Stack width='40%'>

            
              <Swiper
                style={{width:'100%', color:'green'}}
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{ delay: 2500,}}
                pagination={{clickable: true,}}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                >
                {
                  slides.map( (item, i) => (<SwiperSlide><img key={i} src={item} width='100%' height='auto' style={{borderRadius:'25px'}}/></SwiperSlide>) )
                }
              </Swiper>

            </Stack>

            
            <Container sx={{backgroundColor:'#F9E8E8', margin:'0px 20px' , borderRadius:'15px'}} >
              <Typography variant='h4' textAlign='center'>Available Treatments</Typography>
              <Stack gap={3}>
              <Stack direction='row' justifyContent='space-between' sx={{backgroundColor:'white', borderRadius:'15px', fontWeight:'bold', padding:'0 15px '}}>
                <Typography variant='h6'>Fracture Healing </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack direction='row' justifyContent='space-between' sx={{backgroundColor:'white', borderRadius:'15px', fontWeight:'bold', padding:'0 15px'}}>
                <Typography variant='h6'>Neurological Diseases </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack direction='row' justifyContent='space-between' sx={{backgroundColor:'white', borderRadius:'15px', fontWeight:'bold', padding:'0 15px'}}>
                <Typography variant='h6'>Skin Deseases </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack direction='row' justifyContent='space-between' sx={{backgroundColor:'white', borderRadius:'15px', fontWeight:'bold', padding:'0 15px'}}>
                <Typography variant='h6'>Respiration Disorders </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack direction='row' justifyContent='space-between' sx={{backgroundColor:'white', borderRadius:'15px', fontWeight:'bold', padding:'0 15px'}}>
                <Typography variant='h6'>Chronic Diseases </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack direction='row' justifyContent='space-between' sx={{backgroundColor:'white', borderRadius:'15px', fontWeight:'bold', padding:'0 15px'}}>
                <Typography variant='h6'>Other Treatments </Typography>
                <Button>See More</Button>
              </Stack>
              </Stack>

              
            </Container>
          </Stack>
        


        <Footer/>
    </React.Fragment>
  )
}
