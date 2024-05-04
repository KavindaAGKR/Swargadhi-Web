import React, { useState } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { Box, Button, Container, Dialog, Grid, Stack, Typography } from '@mui/material'
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

const customStack = {
    backgroundColor:'white',
    borderRadius:'15px',
    fontWeight:'bold',
    padding:'0 15px',
};



export const Dispensary = () => {

  




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
                spaceBetween={30000}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{ delay: 4000,}}
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
              <Typography variant='h4' textAlign='center' margin='25px'>Available Treatments</Typography>
              <Stack gap={3}>
              <Stack justifyContent='space-between' direction='row' sx={customStack}>
                <Typography variant='h6'>Fracture Healing </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack justifyContent='space-between' direction='row' sx={customStack}>
                <Typography variant='h6'>Neurological Diseases </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack justifyContent='space-between' direction='row' sx={customStack}>
                <Typography variant='h6'>Skin Deseases </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack  justifyContent='space-between' direction='row' sx={customStack}>
                <Typography variant='h6'>Respiration Disorders </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack justifyContent='space-between' direction='row' sx={customStack}>
                <Typography variant='h6'>Chronic Diseases </Typography>
                <Button>See More</Button>
              </Stack>
              <Stack  justifyContent='space-between' direction='row' sx={customStack}>
                <Typography variant='h6'>Other Treatments </Typography>
                <Button>See More</Button>
              </Stack>
              </Stack>

              
            </Container>
          </Stack>
          <Container>
            <Stack>
              <Typography variant='h6'>Fracture Healing</Typography>
              <Typography variant='body'>Ayurveda, the ancient Indian system of medicine, offers holistic approaches to fracture healing that focus on restoring balance to the body's natural energies. In Ayurveda, fractures are understood as disruptions in the flow of vital energy, or "prana," within the body. To facilitate healing, Ayurvedic practitioners employ a combination of herbal remedies, dietary recommendations, and therapeutic techniques tailored to each individual's constitution, or "dosha."
Herbal remedies commonly used in Ayurveda for fracture healing include substances such as Ashwagandha, Guggulu, and Shatavari, known for their anti-inflammatory and bone-strengthening properties. Additionally, external applications of herbal pastes or oils containing ingredients like turmeric and garlic may be employed to promote tissue regeneration and reduce pain and inflammation at the site of the fracture.
Ayurvedic dietary guidelines for fracture healing emphasize the consumption of nutrient-rich foods that support bone health, such as dairy products, green leafy vegetables, and bone broth. Moreover, lifestyle modifications, including adequate rest and gentle exercise, are recommended to enhance the body's natural healing processes and prevent complications during the recovery period.
Therapeutic techniques such as Panchakarma, which involves detoxification and rejuvenation therapies, may also be utilized in Ayurveda to support fracture healing by removing toxins and restoring equilibrium to the body-mind system. Additionally, specific yoga asanas and pranayama (breathing exercises) tailored to the individual's condition may be prescribed to promote circulation, flexibility, and overall well-being during the recovery phase.
By addressing the underlying imbalances contributing to the fracture and employing a comprehensive approach that integrates herbal remedies, dietary modifications, and therapeutic interventions, Ayurveda offers a holistic framework for promoting optimal healing and restoring mobility and function to the affected area.</Typography>
            </Stack>
          </Container>
        


        <Footer/>
    </React.Fragment>
  )
}
