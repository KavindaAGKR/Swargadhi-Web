import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




export const SwiperSlider = ({imageArray, altName,styles}) => {
  return (
    <Swiper
                
                spaceBetween={25}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{ delay: 4000,}}
                pagination={{clickable: true,}}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                speed={1200}
                loop={true}
                style={styles}
                >

                {
                imageArray.map( (item, i) => (<SwiperSlide key={i}><img alt={altName}  src={item.src} width='100%' height='100%' style={{borderRadius:'15px'}}/></SwiperSlide>) )
                }
            </Swiper>
  )
}
