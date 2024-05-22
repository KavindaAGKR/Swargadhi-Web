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
                color:'rgb(34,139,34)'
            }}
            variant={variant}
            color={color}
            onClick={onClick} 
            style={style}

        >
            {children} 
        </Button>
    );
};
