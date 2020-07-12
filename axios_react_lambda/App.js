import React, { Component } from 'react';
import axios from 'axios';
import MyInstances from './components/MyInstances/MyInstances'


class App extends Component {

  state = {
    running: []
  }

  componentDidMount () {
    axios.get("https://ug1jzed7v9.execute-api.us-east-1.amazonaws.com/dev/instance-status").then(response => {   
      
      const instance_data = response.data.body      
      const keys = Object.keys(instance_data)          

      const running_instances  = keys.map((insta) => {
         if (instance_data[insta]['Name'] === 'running' ) { return insta } else {
           return null
         }
        }).filter(val => val != null) // exclude null or undefined values 
        
		//setting state saves new variables that can be used to update the UI 
         this.setState({running: running_instances})      
      }).catch(err => {
        console.log("WTF")
      })
    }

    stopInstance(instance) {
      axios.post("https://ug1jzed7v9.execute-api.us-east-1.amazonaws.com/dev/modify-instance",{
        insta_id: instance
      })
    }
        
  render() { //pass props and command reference to MyInstance Component 
    const instance_status = this.state.running.map(instance => {
      return <MyInstances key={instance} running={instance} stop={()=> this.stopInstance(instance)}/> 
    })      

    return (     
      <div >        
       {instance_status}
      </div>
    );
  }
}
export default App;

//APIGateway React Axios Ec2
//Generate list of Running Ec2 instances w/ button to stop instance
//Sending Http requests via API gateway to control EC2 instance  
//Elliott Arnold 7-12-20   
//Learning React JS in babysteps 
//Covid19Quarantine 