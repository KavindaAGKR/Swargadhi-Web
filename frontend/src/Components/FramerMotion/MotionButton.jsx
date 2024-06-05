import React from "react";
import {  motion } from "framer-motion"
import { Button } from "@mui/material";



export const MotionButton = ({ children, onClick,variant, color,style }) => {
    return (
        <Button
            component={motion.div} 
            whileHover={{
                scale: 1.15,
                transition: { duration: 0.2 },
                color:'black'
            }}
            variant={variant}
            color={color}
            onClick={onClick} 
            style={style}
            sx={{fontWeight:'550',  fontSize:'15px'}}

        >
            {children} 
        </Button>
    );
};
