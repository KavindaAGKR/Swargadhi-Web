import React, { useState } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { Box, Button, Container, Dialog, Stack, Typography } from '@mui/material'
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
        <Stack  color='green'  direction='row' margin='25px' justifyContent='center'>
                <MedicalInformationIcon sx={{fontSize:'60px'}} />
                <Typography variant='h2'  >
                Dispensary
                </Typography>
        </Stack>
<Stack>
  
  
</Stack>



          <Stack direction='row' height='500px' margin='50px'>
            <Stack width='40%'>

            {/* <Carousel>
              {
                slides.map( (item, i) => (<img key={i} src={item} width='100%' height='auto' style={{borderRadius:'25px'}}/>) )
            }
            </Carousel> */}
             <Swiper
      style={{width:'100%'}}
      spaceBetween={30}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      
            {
                slides.map( (item, i) => (<SwiperSlide><img key={i} src={item} width='100%' height='auto' style={{borderRadius:'25px'}}/></SwiperSlide>) )
            }
            
    </Swiper>

            </Stack>
            <Stack direction='column'>
              <Typography variant='h3'>Available Tratments</Typography>
              <Typography>Fix Disabled joints</Typography>
              <Typography>Wakugadu Amaruwa</Typography>
              <Typography>Back Pain/Typography</Typography>
    <Typography>Wakugadu Amaruwa</Typography>
    <Typography>Back Pain/Typography</Typography>

            </Stack>
          </Stack>
        


        <Footer/>
    </React.Fragment>
  )
}
