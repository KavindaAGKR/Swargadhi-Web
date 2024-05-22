import React from 'react'
import { Swiper,SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation, Pagination   } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {  Box, Typography } from '@mui/material';
import ProductCard from '../Shop/ProductCard';
import { FetchProducts } from '../../API/FetchProducts';







export const BestSales = () => {



    const {products, loading} = FetchProducts('all')


return(
    <Box margin='50px auto' width='90%'>
        <Typography variant='h5'>Best Sales</Typography>
<Swiper
                
                spaceBetween={50}
                slidesPerView={4}

                autoplay={{ delay: 1000}}
                
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                speed={1200}
                loop={true}
                style={{
                    width: '100%',
                    '--swiper-navigation-color': 'black',
                    '--swiper-pagination-color': '#0DFE0D',
                    
                }}
                breakpoints={{
                    0:{slidesPerView:1},
                    500:{slidesPerView:2},
                    900:{slidesPerView:3},
                    1200:{slidesPerView:4},
                
                }}
                >
                            {products.map((product,i) => (
                                <SwiperSlide key={i} style={{padding:'25px 0px'}}>
                                
                                    <ProductCard product={product} />
                                    
                                
                                </SwiperSlide>
                            ))}
            </Swiper>
            </Box>

)

}




export const HomeSwiper = ({imageArray}) => {
    return (
        <Swiper
                
                spaceBetween={15}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{ delay: 1000,}}
                
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                speed={1200}
                loop={true}
                style={{
                    width: '100%',
                    '--swiper-navigation-color': '#0DFE0D',
                    '--swiper-pagination-color': '#0DFE0D',
                    borderRadius:'25px',
                    minHeight:'100%'
                }}
                >

                {
                imageArray.map( (item, i) => (<SwiperSlide key={item.key}><img alt={item.key} src={item.images}  width='100%' height='100%'  style={{borderRadius:'25px'}}/></SwiperSlide>) )
                }
            </Swiper>
    )
}

