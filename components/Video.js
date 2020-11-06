import React from 'react'
import FallBack from '../components/video/fallBack.mp4'

export default function video() {
    return (
        <div>
             <video className="video" autoPlay loop muted 
             style={{  position: "absolute",
                        width: "100%",
                        left: "50%",
                        top: "50%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "translate( -50%, -50%)",
                        zIndex:  "-1"  
                     }}  >  
            
                <source src={FallBack}    type='video/mp4'></source>
            </video>
                   
           
        </div>
    )
}
