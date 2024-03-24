import React from 'react'
import {  Stack } from '@mui/material'
//import { useNavigate } from 'react-router-dom'
import ImageSlider from '../Components/Home/ImageSlider'
import { HomeText } from '../Components/Home/HomeText'
import ShopNow from '../Components/Home/ShopNow'
import { BestSales } from '../Components/Home/BestSales'
import slider1 from '../Images/Slider1.jpg'
import slider2 from '../Images/Slider2.png'
import slider3 from '../Images/Slider3jpg.png'
import { Header } from '../Components/Header'
import { Footer } from '../Components/Footer'



export const Home = () => {
    //const navigate = useNavigate()


    //Images For Image Slider
    const images = [
      slider1,slider2,slider3
          ];

  return (
    <React.Fragment>
        <Header/>
        <Stack >
        <ImageSlider images={images} />
        <HomeText/>
        <ShopNow/>
        <BestSales/>
        </Stack>
        <Footer/>
    </React.Fragment>
  )
}
