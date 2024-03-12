import React from "react";
import "./HomeText.css";

export const HomeText = () =>{

    const Wtext = 'WE PROVIDE BEST ';
    const line2text = 'HEALTH CARE';
    
    
    return(
        <div className="text-container">
            <span>
                {Wtext}
                <br />
                <span className="line2">{line2text}</span>
            </span>
        </div>
    );
}



