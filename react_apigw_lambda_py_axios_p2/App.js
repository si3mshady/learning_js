import React, {Component} from 'react';
import './App.css';
import Instance from  './component/Instance/Instance';
import axios from 'axios';

class App extends Component {
  state = {    
    metadata: [],
    showModal: false,
    current_instance: []
  }

  componentDidMount() {
    const url = "https://4ro3vwj0v0.execute-api.us-east-1.amazonaws.com/sandbox/get-instance-ids"
    axios.get(url).then(data => {
      
      const instances = data.data.body
      console.log(instances)
      this.setState({metadata: instances})
      
    }).catch(err =>{
      console.log(err)
    })
       
  }

  fetch_instance_metadata = (instance_id) => {
    const url = "https://4ro3vwj0v0.execute-api.us-east-1.amazonaws.com/sandbox/fetch-instance-data"
    var payload = {instance: instance_id}
    
    axios.post(url,payload).then(data =>{
      console.log(data.data)
     // set state which contains data for each instance once clicked 
     this.setState({ current_instance: data.data.body})

      alert(`      
      InstanceId = ${this.state.current_instance.InstanceId}
      ImageId = ${this.state.current_instance.ImageId}
      PrivateIpAddress =${this.state.current_instance.PrivateIpAddress}`      
      ) 

    }).catch(err => {console.log(err,"wtf") })
  }

  clickHandler = (event) => {  
    // event values are located between 'p' tags 
    var instance_id  =  event.target.innerText     
    this.fetch_instance_metadata(instance_id)    
   }

  render() {
  let transformed = this.state.metadata.map(insta => { 
     return <Instance click={this.clickHandler} instance_id={insta}/>
     })

    return (
      <div>        
            <h2>Inside my VPC </h2>
                {transformed}         
      </div>
    );
  }
}

export default App;

//AWS Apigateway Lambda Python React Components EC2 Event Listener practice 
// List Instance Id's, which event listener click element in DOM to fetch metadata about instance 
// React JS -> API Gateway -> Lambda -> Python 
//Elliott Arnold -  7-14-20  - Learning JS 
