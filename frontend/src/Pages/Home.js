import React from 'react'
import {  Stack, Typography } from '@mui/material'
//import { useNavigate } from 'react-router-dom'
import ImageSlider from '../Components/Home/ImageSlider'
import { HomeText } from '../Components/Home/HomeText'
import ShopNow from '../Components/Home/ShopNow'
import { BestSales } from '../Components/Home/BestSales'
import slider1 from '../Images/Slider1.jpg'
import slider2 from '../Images/Slider2.png'
import slider3 from '../Images/Slider3jpg.png'



export const Home = () => {
    //const navigate = useNavigate()

    const images = [
      slider1,slider2,slider3
          ];

  return (
    <Stack>

        <Stack >
        <ImageSlider images={images} />
        <HomeText/>
        <ShopNow/>
        <BestSales/>
        </Stack>
    </Stack>
  )
}
