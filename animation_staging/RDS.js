import React from 'react';
import Aux from './Aux'
import './App.css';


const ec2 = (props) => (
        <Aux>
             <div className="rds-wrapper">
                  <div className="front">
                      <i style={{padding: "10px"}} className="fas fa-3x fa-database"> </i>       
                <h2> RDS <br/ > <span>Instance <br/ > Count</span> </h2>        
            </div> 
            <div className="back">
                <h2> Count # {props.count}</h2>
            </div>     
        </div>
        </Aux>   
)
export default ec2;



//CSS Animation rookie ReactJS AWS Apigateway Practice 
//Fetch data from API gateway and use in 3D animation using CSS
//Elliott Arnold 8-16-20  
//DMS DFW Covid-19