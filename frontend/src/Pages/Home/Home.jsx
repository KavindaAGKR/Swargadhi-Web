import React from 'react'
import {  Stack } from '@mui/material'
//import { useNavigate } from 'react-router-dom'

import { HomeText } from '../../Components/Home/HomeText'
import ShopNow from '../../Components/Home/ShopNow'
import { BestSales } from '../../Components/Home/BestSales'
import slider1 from '../../Images/Slider1.jpg'
import slider2 from '../../Images/Slider2.png'
import slider3 from '../../Images/Slider3.png'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
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
        <Stack width='50%' margin='50px auto '>
        <SwiperSlider imageArray={images} altName='Slider Images' styles={{
    width: '100%',
    '--swiper-navigation-color': '#0DFE0D',
    '--swiper-pagination-color': '#0DFE0D',
  }}/>
        </Stack>
        <HomeText/>
        <ShopNow/>
        <BestSales/>
        </Stack>
        <Footer/>
    </React.Fragment>
  )
}
