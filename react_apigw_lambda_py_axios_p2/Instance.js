import React from 'react';
import InstanceRow from './InstanceRow'

const instance = (props) => {

    return (
        <div>          
                <table>
                        <tr>    
                            <th>Instance ID</th>    
                            <InstanceRow click={props.click}>{props.instance_id} </InstanceRow>     
                        </tr>
                        
                </table>  
        </div>
    )

};

export default instance;

//AWS Apigateway Lambda Python React Components EC2 Event Listener practice 
// List Instance Id's, which event listener click element in DOM to fetch metadata about instance 
// React JS -> API Gateway -> Lambda -> Python 
//Elliott Arnold -  7-14-20  - Learning JS 