import React, { Component} from 'react';

class MyInstances extends Component {


    render () {
        return(
            <div>                
                <ul>Running Instances
                <li>{this.props.running}</li>
                <button onClick={this.props.stop}>Stop Instance</button>                
                </ul>                         
            </div>  

        )  
    }
}

export default  MyInstances;
