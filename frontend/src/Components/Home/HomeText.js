import React from "react";
import {  motion } from "framer-motion"
import { Typography } from "@mui/material";



export const HomeText = ({isSinhalaTrue}) =>{


    return(
        <motion.div className="text-container"


        animate={{
            scale: 1.1,
            
        }}

        transition={{

            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0,
            duration: 1,
            
          }}
          style={{margin:'0px auto',textAlign:'center'}}

 >
    
    {
        isSinhalaTrue? (
            <>
            <Typography variant="h4">අපි හොඳම සෞඛ්ය සත්කාර</Typography>
            <Typography variant="h2" color='blue'>ඔබට සපයන්නෙමු</Typography>
            </>
        ):(
            <>
            <Typography variant="h4">WE PROVIDE BEST</Typography>
            <Typography variant="h2" color='blue'>HEALTH CARE</Typography>
            </>
        )
    }
        </motion.div>
    );
}



