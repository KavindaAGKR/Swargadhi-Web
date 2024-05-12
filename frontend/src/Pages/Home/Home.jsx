import React from 'react'
import {  Button, Container, Stack } from '@mui/material'
//import { useNavigate } from 'react-router-dom'

import { HomeText } from '../../Components/Home/HomeText'

import slider1 from '../../Images/Slider1.jpg'
import slider2 from '../../Images/Slider2.png'
import slider3 from '../../Images/Slider3.png'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { BestSales, HomeSwiper } from './BestSales'
import { MotionButton } from '../../Components/FramerMotion/MotionButton'
import { motion } from "framer-motion"
import { SwiperSlider } from '../../Components/Swiper'





export const Home = () => {
    //const navigate = useNavigate()


    //Images For Image Slider
    const images = [
      {key: 6,images:slider1},
      {key: 2,images:slider2},
      {key: 1,images:slider3}
          
    ];




          
  return (
    <React.Fragment>
        <Header/>

        <Stack >
        <Stack width={{xs:'80%', sm:'70%', md:'60%'}} margin='50px auto '
              component={motion.div}
              initial={{ opacity: 0 , y:40}}
              animate={{ opacity: 1,y:0,  }}
              transition={{ duration: 2 }} >
        <HomeSwiper imageArray={images} />
        
        </Stack>

        <HomeText/>

        <MotionButton 
        style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                width:'150px',
                borderRadius: '3px',
                height: '48px',
                margin:'auto',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white'
        }}> 
          Shop Now
        </MotionButton>

        <Container >
          <BestSales/>
        </Container>

        </Stack>
        <Footer/>
    </React.Fragment>
  )
}
