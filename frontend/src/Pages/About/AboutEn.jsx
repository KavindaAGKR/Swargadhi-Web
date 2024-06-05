import React from 'react'
import { Button, Grid, Paper,  Stack,  Typography } from '@mui/material'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'
import { Call, Email, Facebook, WhatsApp } from '@mui/icons-material'
import LocationCityIcon from '@mui/icons-material/LocationCity';


export const AboutEn = () => {
return (
    <React.Fragment>
        <Header/>
    
        <Stack sx={{ margin:'50px', textAlign: 'center', }} >
        
        <Stack direction='row' margin="auto" color='green'>
                <LocationCityIcon sx={{fontSize:'60px'}} />
                <Typography variant='h2' color='success.main' sx={{marginBottom:'50px'}}>About Us</Typography>
                </Stack>
            
            <Typography variant='h5' sx={{marginBottom:'20px'}}>About Swargadhi</Typography>
            <Typography variant='body'>Products made from botanicals, or plants, that are used to treat diseases or to maintain health are called herbal products, botanical products, or phytomedicines. A product made from plants and used solely for internal use is called an herbal supplement. Many prescription drugs and over-the-counter medicines are also made from plant products, but these products contain only purified ingredients and are regulated by the FDA. Herbal supplements may contain entire plants or plant parts.</Typography>
            <Typography variant='h5'sx={{marginBottom:'20px',marginTop:'50px'}}>Doctors</Typography>
            <Typography variant='body'>Dr. Gayan Senanayake</Typography>
            <Typography variant='h5' sx={{marginBottom:'20px',marginTop:'50px'}}>Certificate of Scription</Typography>
            <Typography variant='body'>The FDA considers herbal supplements foods, not drugs. Therefore, they are not subject to the same testing, manufacturing, and labeling standards and regulations as drugs.
You can now see labels that explain how herbs can influence different actions in the body. However, herbal supplement labels can't refer to treating specific medical conditions. This is because herbal supplements are not subject to clinical trials or to the same manufacturing standards as prescription or traditional over-the-counter drugs.</Typography>
            <Typography variant='h5'sx={{marginBottom:'20px',marginTop:'50px'}}>Contact Us</Typography>
            <Stack direction='column' spacing={1} justifyContent="center" padding="25px" alignItems='center'>
                    
                    <Button variant='text' startIcon={<Call/>} sx={{justifyContent:'left'}}>081 7822142</Button>
                    <Button variant='text' startIcon={<Email/>} sx={{justifyContent:'left'}}>swargadhi@gmail.com</Button>
                    <Button variant='text' startIcon={<WhatsApp/>} sx={{justifyContent:'left'}}>071 1947550</Button>
                    <Button variant='text' startIcon={<Facebook/>} sx={{justifyContent:'left'}} href='https://web.facebook.com/profile.php?id=100063950014549'>ස්වර්ගධී ආයුර්වේද නිෂ්පාදන</Button>
                    </Stack>
        </Stack>
        
    <Footer/>
    </React.Fragment>
)
}





