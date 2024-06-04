import React, { useRef, useState, useEffect } from 'react';
import { Header } from '../../Components/Header';
import { Footer } from '../../Components/Footer';
import { Button, CircularProgress, Container, List, Stack, Typography } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ScrollToTop from 'react-scroll-to-top';
import { SwiperSlider } from '../../Components/Swiper';
import { motion } from 'framer-motion';



export const DispensaryEn = () => {
  const [treatments, setTreatments] = useState([]);
  const [errorLoading, setErrorLoading] = useState('')
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(true);
    const fetchTreatments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/treatment/treatments');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setTreatments(data);
          
          
        } else {
          console.error('Expected data to be an array');
          
        }
        setLoading(false);
      } catch (error) {
        
        console.error('Error fetching treatments:', error);
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);
  

  const sectionRefs = useRef([]);
  sectionRefs.current = treatments.map(
    (item, i) => sectionRefs.current[i] ?? React.createRef()
  );
  // Function to scroll to a specific section
  const scrollToSection = (index) => {
    sectionRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
  };




  return (
    <React.Fragment >
<ScrollToTop smooth={true}/>
        <Header/>

<Stack minHeight='1000px'>
        <Stack  color='green'  direction='row' margin='25px' justifyContent='center' gap={2}>
                <MedicalInformationIcon sx={{fontSize:'60px'}} />
                <Typography variant='h3'  >
                Dispensary
                </Typography>
        </Stack>


        {
          loading ? (<Stack margin='auto'><Typography variant='body'>Loading Treatments... <CircularProgress color='success'/></Typography></Stack>):
          (
            <Stack direction={{xs:'column', md:'row'}} width='90%'  margin='auto' 
            component={motion.div}
              initial={{ opacity: 0 ,}}
    whileInView={{ opacity: 1  }}
    viewport={{ amount:0.3}}
    transition={{ duration: 2 }}
            
            >

              <Stack width={{xs:'70%', md:'40%'}}>
  
              <SwiperSlider
      imageArray={treatments.flatMap(treatment =>
    treatment.images.map((image, i) => ({
      src: `http://localhost:5000${image}`,
      alt: treatment.treatmentName,
    }))
  )}
  altName="Dispensary Treatments"
  styles={{
    margin: 'auto',
    width: '100%',
    '--swiper-navigation-color': '#0DFE0D',
    '--swiper-pagination-color': '#0DFE0D',
  }}
/>

  
              </Stack>
  
              
            <Stack sx={{backgroundColor:'#F9E8E8', margin:'10px 20px' , borderRadius:'15px' ,padding:'20px', width:{xs:'80%', md:'60%'}}} 
              >
                <Typography variant='h4' textAlign='center' margin='25px'>Available Treatments</Typography>
                <Stack gap={3}>
  
                  {
                    treatments.map(
                      (item, i) => 
                        (
                        <Stack key={i}
                        justifyContent='space-between' direction='row' 
                        sx={{backgroundColor:'white',
                        borderRadius:'15px',
                        fontWeight:'bold',
                        padding:'0 15px',}}
                        component={motion.div}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.3 }
                        }}
                        >
                          <Typography variant='h6' >{item.treatmentName} </Typography>
                          <Button onClick={() => scrollToSection(i)}>See More</Button>
                        </Stack>
                        
                      )
                    )
                  }
  
                </Stack>
  
                
              </Stack>
            </Stack>
  )
        }










          <Stack margin='auto' alignItems='center' width='95%'>
          


{
  treatments.map((item, i) => 

            (
              <motion.div 
              key={i} 
              ref={sectionRefs.current[i]}
             
              style={{width:'90%', justifyContent:'center', margin:'auto'}}
              initial={{ opacity: 0 , }}
  whileInView={{ opacity: 1,  }}
  viewport={{ amount:0.3}}
  transition={{ duration: 2 }}

              >
              <Stack 
              backgroundColor='#C6F6D4' sx={{borderRadius:'20px',margin:'25px auto ', padding:'20px',  height:'500px'}} >
              <Typography variant='h4'  textAlign='center' margin='20px 0px' noWrap>{item.treatmentName}</Typography>
              
              <Stack direction={{xs:'column', md:'row'}}  width='auto' height='auto' gap={2}>
              <Stack sx={{ width:{xs:'60%', md:'60%'}, height:{xs:'60%', md:'auto'}, margin:'auto'    }}>
              <img
                  src={`http://localhost:5000${item.images[0]}`}
                  style={{width:'100%', height:'100%'}}
                  alt={item.treatmentNameSi}
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
                    e.target.onerror = null; 
                  }}
                />
              </Stack>
            <Stack sx={{height:'80%'}}>
            
            <List
            sx={{
              width: '100%',
              height:'100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow:'auto',
              backgroundColor:'transparent'
              
            }}
            >
            {/* <Typography variant='body' textAlign='justify' >{item.description}</Typography> */}
            {item.description}
            </List>
            
            </Stack>
              </Stack>
              </Stack>
              </motion.div>
            )

  )
}

            
          </Stack>
          </Stack>


        <Footer/>
    </React.Fragment>
  )
}