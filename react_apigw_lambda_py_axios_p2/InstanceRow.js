import React from 'react';

const instanceRow = (props) => {
   return (<tr>
                 <td>
                        <p onClick={props.click}> 
     						{props.children}
						</p>
                </td>
            </tr> 
    )};

export default instanceRow;


//AWS Apigateway Lambda Python React Components EC2 Event Listener practice 
// List Instance Id's, which event listener click element in DOM to fetch metadata about instance 
// React JS -> API Gateway -> Lambda -> Python 
//Elliott Arnold -  7-14-20  - Learning JS 