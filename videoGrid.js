import React, {useState} from 'react';
import {  Row, Container } from 'react-bootstrap'
import './App.css';


function App() {

  const urlBase = 'https://www.youtube.com/embed/'

  const [videoList, setVideoList] = useState({
     "freeCodeCamp": [
       urlBase + "3PHXvlpOkf4", 
       urlBase + "n1mdAPFq2Os",
       urlBase + "4UZrsTqkcW4", 
       urlBase + "8xPsg6yv7TU",
       urlBase + "jFNHerJqvFw"
       ],
       
    "chillStep": [
      urlBase + "M5QY2_8704o",
      urlBase + "VQ5mH_hyKU0",
      urlBase + "3qiLI1ILMlU",
      urlBase + "lSAz2ONC1rk" ] 
  })
  

  return (
    <div>
    <input></input>
    <Container>   

   <Row>
         {videoList.freeCodeCamp.map(element => {
           return  <iframe width="400" height="315" src={element}> </iframe> 
         })}
         {videoList.chillStep.map(element => {
           return  <iframe width="400" height="315" src={element}> </iframe> 
         })}
   </Row>   
   </Container>             
   

      
    </div>

  );
}

export default App;


//React State Hooks/ React-BootStrap Practice 
//Render a grid of youtube screens that can be started and stopped independently.
// Elliott Arnold 10-16-20   Covid-19  DMS  Amazon PTO  
