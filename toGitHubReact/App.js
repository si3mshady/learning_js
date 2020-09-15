import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {    
    allDataArray: []
  } 

  componentDidMount(){
     const apiGatewayUrl = "https://06xluu9pu2.execute-api.us-east-1.amazonaws.com/testing/instances"
     axios.get(apiGatewayUrl).then(data => {       

       const keys = Object.keys(data.data)
       this.setState({         
         allDataArray: data.data.data                
       })       
       
       this.makeFilterButtons(this.state.allDataArray)      
       this.populate_div(this.state.allDataArray)
       this.get_Unique_AvailibilityZones(this.state.allDataArray)
       const allBtns = document.querySelectorAll('.btn')
       
       allBtns.forEach((button) => {
         button.addEventListener('click',event => {
           /* get region using the dataset property 
           use the filter method to retun all matching objects
           into a new variable -> clearscreen -> pass argument to populate_div */
          
           let region = event.currentTarget.dataset.region                     

           const filtered = this.state.allDataArray.filter((item) => {
             if (region === item.region) {
               return item
             }
           })
           
           let containerHandler = document.querySelector('.container')
           containerHandler.innerHTML = ''
           this.populate_div(filtered)    
         })

       } )
         

     })

}

makeFilterButtons = (data) => {  
   const buttonContainerHandler = document.querySelector('.button-container')   
   const unique = this.get_Unique_AvailibilityZones(data)  
  for (let i = 0; i < unique.length; i++ ) {
       var region = unique[i]       
       buttonContainerHandler.innerHTML += `<button type="button" class='btn btn-primary btn-formatting' data-region="${region}">${region}</button>`
   }    
}

populate_div = (data) => {  
  const containerHandler = document.querySelector('.container') // sele
  console.log(data.length)  
  for (let i = 0; i < data.length; i++ ) {    
      containerHandler.innerHTML += `<div class='tiles ${data[i].state.Name}'> <p> ${data[i].instance_id} </p> </div>`                                                 
                               
    }     
   
}

get_Unique_AvailibilityZones(data) {
 
 const az = []
 // load all az into array in order to use reduce to filter unique values 
 for (let i = 0; i < data.length; i++ ) {    
  az.push(data[i].region)
 }

 //acc refers to the resulting list, value references the current iteration of the "az" array
 const unique_az = az.reduce((acc,val) => {
    if (!acc.includes(val)) {
      acc.push(val)
    }
    return acc
 },[])
 console.log(unique_az)
 return unique_az
}

render() { 
  
  return (     
    <div >        
      <div className="button-container"> </div>    
      <div className="container"></div>   
     </div>
  );
}


}

export default App;

//AWS ApiGateway Python Lambda rookie react code practice  
//Learning to use filter and reduce functions along with dataset property to add functionality to app
//Populate screen with instances from multiple regions along with filtering buttons
//When buttons are clicked, they filter the intances to show only the desired region
//Elliott Arnold 9-14-20 DFW DMS Learning JS Babysteps 
