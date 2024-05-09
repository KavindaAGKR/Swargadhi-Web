import React, {useState, useEffect} from 'react'
import { Swiper,SwiperSlide } from 'swiper/react';
import { Autoplay,Navigation, Pagination   } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Paper, Typography, Container, Grid, CircularProgress, Box } from '@mui/material';
import ProductCard from '../Shop/ProductCard';







export const BestSales = (fetchData) => {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const category = 'all'



    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                let response;
                if (category === 'all') {
                    response = await fetch('http://localhost:5000/api/product/products/english/all');
                } else {
                    response = await fetch(`http://localhost:5000/api/product/category/en/${encodeURIComponent(category)}`);
                }
    
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
    
                const data = await response.json();
                console.log(`Fetched ${category} products:`, data);
    
    
                const extractedProducts = extractProducts(data);
    
                if (Array.isArray(extractedProducts)) {
                    setProducts(extractedProducts);
                } else {
                    throw new Error('Invalid data format');
                }
    
                setLoading(false);
            } catch (error) {
                console.error(`Error fetching ${category} products:`, error);
                setProducts([]);
                setLoading(false);
            }
        };
    
    
        fetchData();
    },[fetchData]);

    const extractProducts = (data) => {
        if (category === 'all') {

            return Array.isArray(data) ? data : [];
        } else {

            if (data && data.data && Array.isArray(data.data)) {
                return data.data;
            }
            return [];
        }
    };



return(
    <Box margin='50px 0px'>
<Swiper
                
                spaceBetween={50}
                slidesPerView={4}

                autoplay={{ delay: 100}}
                
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                speed={10200}
                loop={true}
                style={{
                    width: '100%',
                    '--swiper-navigation-color': 'transparent',
                    '--swiper-pagination-color': '#0DFE0D',
                  }}
                  >

                  
                  {/* imageArray.map( (item, i) => ( key={item.key}><img alt={item.key} src={item.images} width='100%' height='auto' style={{borderRadius:'25px'}}/></SwiperSlide>) )
                   */}
                    
                        
                            {products.map(product => (
                                <SwiperSlide key={product.productItemID} style={{padding:'25px 0px'}}>
                                
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
                autoplay={{ delay: 4000,}}
                
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                speed={1200}
                loop={true}
                style={{
                    width: '100%',
                    '--swiper-navigation-color': '#0DFE0D',
                    '--swiper-pagination-color': '#0DFE0D',
                  }}
                  >

                  {
                  imageArray.map( (item, i) => (<SwiperSlide key={item.key}><img alt={item.key} src={item.images} width='100%' height='auto' style={{borderRadius:'25px'}}/></SwiperSlide>) )
                  }
              </Swiper>
    )
  }
  
