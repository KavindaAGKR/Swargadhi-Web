import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation,Pagination   } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Typography } from '@mui/material';
import config from '../../config';




export const ProductSwiper = ({imageUrl}) => {

    if (imageUrl && imageUrl.length > 0) {
        return (
            

            <Swiper
            style={{width:'100%', color:'green', '--swiper-navigation-color': ' #B2BEB5',
            '--swiper-navigation-size': '25px',borderRadius: '10px',
            '--swiper-pagination-color': '#0DFE0D',
            }}
            spaceBetween={15}
            slidesPerView={1}
            autoplay={{ delay: 5000,}}
            navigation={false}
            pagination={{clickable: true,}}
            modules={[Autoplay,Navigation,Pagination]}
            className="mySwiper"
            speed={1200}
            loop={true}
            
            >
            
            {imageUrl.map((image, index) => (
                <SwiperSlide key={index} style={{display:'flex' ,alignItems:'center', justifyContent:'center', margin:'auto'}} >
                    <img
                                key={index}
                                src={`${config.baseURL}/${image}`}
                                alt={`Product ${index + 1}`}
                                style={{ width: '100%', height: '100%',borderRadius: '10px', objectFit:'cover'}}
                                onError={(e) => {
                                    console.error(`Failed to load image ${index}: ${e.target.src}`);
                                    e.target.onerror = null;
                                }}
                            />
                    </SwiperSlide>
                ))}
        </Swiper>
        );
    } else {
        return <Typography variant="body1">No images available</Typography>;
    }
    
    
};
