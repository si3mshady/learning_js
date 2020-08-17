import React from 'react';
import Aux from './Aux'
import './App.css';

const lambda = (props) => (

        <Aux>
             <div className="lambda-wrapper">
                  <div className="front">
                      <i style={{padding: "10px"}} className="fas fa-3x fa-server"> </i>       
                <h2> Lambda <br/ > <span>Function <br/ > Count</span> </h2>        
            </div> 
            <div className="back">
                <h2> Count # {props.count} </h2>
            </div>     
        </div>
        </Aux>   
)

export default lambda;


//CSS Animation rookie ReactJS AWS Apigateway Practice 
//Fetch data from API gateway and use in 3D animation using CSS
//Elliott Arnold 8-16-20  
//DMS DFW Covid-19