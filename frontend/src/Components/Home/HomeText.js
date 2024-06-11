import React from "react";
import {  motion } from "framer-motion"
import { Stack, Typography } from "@mui/material";



export const HomeText = ({isSinhalaTrue}) =>{


    return(
//         <motion.div className="text-container"


//         animate={{
//             scale: 0.9,
            
//         }}

//         transition={{

//             ease: 'easeInOut',
//             repeat: Infinity,
//             repeatType: 'reverse',
//             repeatDelay: 0,
//             duration: 1,
            
//           }}
//           style={{margin:'0px auto',textAlign:'center'}}

//  >
    <Stack textAlign='center' width='100%'>
    {
        isSinhalaTrue? (
            <>
            <Typography variant="h5">අපි හොඳම සෞඛ්‍ය සත්කාර</Typography>
            <Typography variant="h4" color='blue'>ඔබට සපයන්නෙමු</Typography>
            </>
        ):(
            <>
            <Typography variant="h5">WE PROVIDE BEST</Typography>
            <Typography variant="h4" color='blue'>HEALTH CARE</Typography>
            </>
        )
    }
    </Stack>
         //</motion.div>
    );
}



