import './App.css';
import React, { Component } from 'react';
import InstanceID from './InstanceId/InstanceId'

class App extends Component {
  state = {
    instance_ids:
      [{id:"i-0a8888034600171"},
      {id:"i-0e54a9cd32888283d"},
      {id:"i-01888f01ad4a3e02d4"},
      {id:"i-0d30fe188811ce04f"}],
      showInstances: false    
     }

   showInstances = () => {
     const show = this.state.showInstances
     this.setState({showInstances: !show})
   }
 
  render() {
    let  show_instances = null;

    if (this.state.showInstances) {
      show_instances = (
          <div>
            {this.state.instance_ids.map((instance,index) =>{
              return <InstanceID instance_id={this.state.instance_ids[index].id} />
            } )}
          </div>
        )
    }

    return (
      <div className="App">        
         <h1>Hello Elliott!</h1>       
         <button onClick={this.showInstances}>Show Instances</button>
         {show_instances}            
      </div>
    );
  }
}

export default App;
