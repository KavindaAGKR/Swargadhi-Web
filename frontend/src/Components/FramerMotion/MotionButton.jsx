import React from "react";
import {  motion } from "framer-motion"
import { Button } from "@mui/material";



export const MotionButton = ({ children, onClick,variant, color,stylee }) => {
    return (
        <Button
            component={motion.div} 
            whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
                color:'hsl(0, 0, 0)'
            }}
            variant={variant}
            color={color}
            onClick={onClick} 
            sx={stylee}
            style={{fontWeight:'bold', fontSize:'15', textAlign:'center', textTransform:'none'}}
            
        >
            {children} 
        </Button>
    );
};
