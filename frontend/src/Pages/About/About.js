import React from 'react'
import { Grid, Paper,  Typography } from '@mui/material'
import { Header } from '../../Components/Header'
import { Footer } from '../../Components/Footer'

export const About = () => {
return (
    <React.Fragment>
        <Header/>
    <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10} >
        <Paper sx={{ margin:'50px', textAlign: 'center' }} elevation={20}>
        
            <Typography variant='h2' color='success.main' sx={{marginBottom:'50px'}}>About Us</Typography>
            <Typography variant='h5' sx={{marginBottom:'20px'}}>About Swargadhi</Typography>
            <Typography variant='body'>Products made from botanicals, or plants, that are used to treat diseases or to maintain health are called herbal products, botanical products, or phytomedicines. A product made from plants and used solely for internal use is called an herbal supplement. Many prescription drugs and over-the-counter medicines are also made from plant products, but these products contain only purified ingredients and are regulated by the FDA. Herbal supplements may contain entire plants or plant parts.</Typography>
            <Typography variant='h5'sx={{marginBottom:'20px',marginTop:'50px'}}>Doctors</Typography>
            <Typography variant='body'>Dr. Gayan Senanayake</Typography>
            <Typography variant='h5' sx={{marginBottom:'20px',marginTop:'50px'}}>Certificate of Scription</Typography>
            <Typography variant='body'>The FDA considers herbal supplements foods, not drugs. Therefore, they are not subject to the same testing, manufacturing, and labeling standards and regulations as drugs.
You can now see labels that explain how herbs can influence different actions in the body. However, herbal supplement labels can't refer to treating specific medical conditions. This is because herbal supplements are not subject to clinical trials or to the same manufacturing standards as prescription or traditional over-the-counter drugs.</Typography>
            <Typography variant='h5'sx={{marginBottom:'20px',marginTop:'50px'}}>Contact Us</Typography>
        
        </Paper>
        </Grid>
    </Grid>
    <Footer/>
    </React.Fragment>
)
}





