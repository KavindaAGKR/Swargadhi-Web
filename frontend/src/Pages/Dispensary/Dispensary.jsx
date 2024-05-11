import React, {useRef } from 'react'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { Button, Container, Stack, Typography } from '@mui/material'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import slide1 from '../../Images/Slider1.jpg'
import slide2 from '../../Images/Slider2.png'
import slide3 from '../../Images/Slider3.png'
import ScrollToTop from "react-scroll-to-top";

import { SwiperSlider } from '../../Components/Swiper';

import { motion } from "framer-motion"





// dummy data
const ayurvedicTreatments = [
  {
      key: 1,
      treatmentNameEn: "Sinhasa Treatment",
      treatmentNameSi: "සිටුවල් ස්ථානය",
      price: "5000 LKR",
      descriptionEn: "Ayurvedic treatment for sinusitis involves nasal irrigation, herbal steam inhalation, and consumption of herbal formulations to reduce inflammation and clear congestion.Ayurvedic treatment for sinusitis involves nasal irrigation, herbal steam inhalation, and consumption of herbal formulations to reduce inflammation and clear congestion.Ayurvedic treatment for sinusitis involves nasal irrigation, herbal steam inhalation, and consumption of herbal formulations to reduce inflammation and clear congestion.Ayurvedic treatment for sinusitis involves nasal irrigation, herbal steam inhalation, and consumption of herbal formulations to reduce inflammation and clear congestion.Ayurvedic treatment for sinusitis involves nasal irrigation, herbal steam inhalation, and consumption of herbal formulations to reduce inflammation and clear congestion.Ayurvedic treatment for sinusitis involves nasal irrigation, herbal steam inhalation, and consumption of herbal formulations to reduce inflammation and clear congestion.Ayurvedic treatment for sinusitis involves nasal irrigation, herbal steam inhalation, and consumption of herbal formulations to reduce inflammation and clear congestion.",
      descriptionSi: "සිටුවල් ස්ථානය සඳහා ආයුර්වේද ප්‍රදේශය භාවිතයේ ජනවාරි අයිරිපාලය, රුසිරු හෝ සුළඟ වැනි අයුරික්‍රියකට භාවිතයේ බොහෝ විනිසුරු සහ පියතුමාලා ප්‍රදේශ හෝ සප්පාදු මල් වැනි රුත්‍රක් බහුලූණ ප්‍රකාශකාරකයා විසින් පහත ස්ථානයේ මූලික අයුරින් ස්වයංක්‍රීයයි පහසුකම් හා සිදුකරයි.",
      images: [slide1]
  },
  {
    key: 2,
      treatmentNameEn: "Ukka Treatment",
      treatmentNameSi: "උක්ට ස්ථානය",
      price: "7500 LKR",
      descriptionEn: "Ayurvedic treatment for arthritis involves massage with herbal oils, application of herbal poultices, and consumption of herbal formulations to reduce inflammation and alleviate pain.",
      descriptionSi: "ක්‍රීඩ්මුට් සඳහා ආයුර්වේද ප්‍රදේශය සහිත ස්වයංක්‍රීය බහුලූණ බොහෝ ප්‍රකාශකයි. එය පාතුවන් හෝ මීරුම ස්ථාන සඳහා හිරුම් තුනකට මස්වත් ස්වයංක්‍රීය හෝ ස්වයංක්‍රීය පොහොර භාවිතයේ හා බොහෝ අයුරින් ස්වයංක්‍රීය ප්‍රකාශකාරකයා විසින් ස්වයංක්‍රීයයි සහ බුද්ධි පියතුමාලා ප්‍රකාශකාරකයා සහිත ස්වයංක්‍රීය ප්‍රකාශකයි.",
      images: [slide2]
  },
  {
    key: 3,
      treatmentNameEn: "Ruka Treatment",
      treatmentNameSi: "රුක ස්ථානය",
      price: "6000 LKR",
      descriptionEn: "Ayurvedic treatment for eczema involves topical application of herbal pastes, internal consumption of herbal formulations, and dietary modifications to reduce inflammation and itching.",
      descriptionSi: "ඇයිඩාස් සඳහා ආයුර්වේද ප්‍රදේශය භාවිතයේ බොහෝ විනිසුරු ලෙස සුළඟ වැනි ප්‍රතිරූ භාවිතා කිරීම, අයුරින් ස්වයංක්‍රීය ප්‍රකාශ හෝ සප්පාදු ප්‍රකාශ හෝ වෙනත් සංස්කෘතියක් මඟින් සුළඟ හා සත්කාර වූවත් ප්‍රකාශකයා විසින් අයුරින් ස්වයංක්‍රීයයි.",
      images: [slide3]
  },
  {
    key: 4,
      treatmentNameEn: "Diwayina Treatment",
      treatmentNameSi: "දිවයින ස්ථානය",
      price: "8000 LKR",
      descriptionEn: "Ayurvedic treatment for diabetes involves dietary modifications, regular physical exercise, and consumption of herbal formulations to regulate blood sugar levels.",
      descriptionSi: "මගේ ඇයිඩාස් රෝගයට ප්‍රදේශයක් ලබා දීම පිළිබඳව, බොහෝ අයුරින් මගේ ඇයිඩාස් පහසුකම් හා නිර්මාණශීලී ප්‍රකාශකාරකයා සහිත අයුරින් ස්වයංක්‍රීයයි.",
      images: [slide1]
  },
  {
    key: 5,
      treatmentNameEn: "Asudhu Samanakarana Treatment",
      treatmentNameSi: "අසූදු සමානාකරණය ස්ථානය",
      price: "5500 LKR",
      descriptionEn: "Ayurvedic treatment for digestive disorders involves dietary modifications, consumption of herbal formulations, and lifestyle changes.",
      descriptionSi: "පාළි වර්ගයන්ට සඳහා ආයුර්වේද ප්‍රදේශය සහිත පොහොර හා ස්වයංක්‍රීය ප්‍රකාශ හෝ වෛරයෙහි වෙනස් වීම් සඳහා හා ප්‍රකාශිත විනිසුරු භාවිතයේ සිදුකරයි.",
      images: [slide2]
  },
  {
    key: 6,
      treatmentNameEn: "Nivsitha Treatment",
      treatmentNameSi: "නිව්සිත්ථා ස්ථානය",
      price: "7000 LKR",
      descriptionEn: "Ayurvedic treatment for insomnia involves relaxation techniques, consumption of herbal formulations, and establishing a consistent bedtime routine.",
      descriptionSi: "විශේෂඥයේදී, අයුරින් ස්වයංක්‍රීය ප්‍රකාශ හා සුවිශේෂිත ප්‍රකාශ ස්ථානය සහිත අයුරින් ස්වයංක්‍රීයයි.",
      images: [slide3]
  }
];











export const Dispensary = () => {



  const sectionRefs = useRef(Array(ayurvedicTreatments.length).fill(null).map(() => React.createRef()));

  // Function to scroll to a specific section
  const scrollToSection = (index) => {
    sectionRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <React.Fragment>
<ScrollToTop smooth={true}/>
        <Header/>

<Stack >
        <Stack  color='green'  direction='row' margin='25px' justifyContent='center' gap={2}>
                <MedicalInformationIcon sx={{fontSize:'60px'}} />
                <Typography variant='h2'  >
                  Dispensary
                </Typography>
        </Stack>




          <Stack direction={{xs:'column', md:'row'}} width='90%'  margin='auto' justifyContent='center' alignItems='center'>
            <Stack width={{xs:'70%', md:'40%'}}
            component={motion.div}
            initial={{ opacity: 0 , x:-40}}
  whileInView={{ opacity: 1,x:0,  }}
  viewport={{ amount:0.3}}
  transition={{ duration: 2 }}
  
            >

              <SwiperSlider imageArray={ayurvedicTreatments} altName='Dispensary Treatments' styles={{
                margin:'auto',
    width: '100%',
    '--swiper-navigation-color': '#0DFE0D',
    '--swiper-pagination-color': '#0DFE0D',
  }}/>

            </Stack>

            
            <Stack sx={{backgroundColor:'#F9E8E8', margin:'0px 20px' , borderRadius:'15px' ,padding:'20px', width:{xs:'80%', md:'60%'}}} 
            component={motion.div}
            initial={{ opacity: 0 , x:40}}
  whileInView={{ opacity: 1,x:0,  }}
  viewport={{ amount:0.3}}
  transition={{ duration: 1 }}
            >
              <Typography variant='h4' textAlign='center' margin='25px'>Available Treatments</Typography>
              <Stack gap={3}>

                {
                  ayurvedicTreatments.map(
                    (item, i) => 
                      (
                      <Stack key={item.key}
                      justifyContent='space-between' direction='row' 
                      sx={{backgroundColor:'white',
                      borderRadius:'15px',
                      fontWeight:'bold',
                      padding:'0 15px',}}
                      component={motion.div}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 }
                      }}>
                        <Typography variant='h6' >{item.treatmentNameEn} </Typography>
                        <Button onClick={() => scrollToSection(i)} 
  
  whileTap={{ scale: 0.9 }}>See More</Button>
                      </Stack>
                      
                    )
                  )
                }

              </Stack>

              
            </Stack>
          </Stack>







          <Stack margin='auto' alignItems='center' width='95%'>
          


{
  ayurvedicTreatments.map((item, i) => 

            (
              <motion.div 
              key={item.key} ref={sectionRefs.current[i]}
             
              style={{width:'70%', justifyContent:'center'}}
              initial={{ opacity: 0 , x:20}}
  whileInView={{ opacity: 1,x:0,  }}
  viewport={{ amount:0.3}}
  transition={{ duration: 2 }}
  
                >

              <Stack 
              backgroundColor='#C6F6D4' style={{borderRadius:'20px',margin:'25px auto ',  padding:'20px'}} >
              <Typography variant='h4'  textAlign='center'>{item.treatmentNameEn}</Typography>
              <Stack width='100%'>
              <Stack Stack direction={{xs:'column', md:'row'}} margin='20px' height='auto'>
              <img  src={item.images} style={{width:'40%' , height:'60%' }}/>
            <Stack sx={{textAlign:'justify'}}>
            
            
            <Typography variant='body'  >{item.descriptionEn}</Typography>
            
            </Stack>
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