import React, {useState} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import Fade from 'react-reveal/Fade'


export default function WebForm(props) {

    const [formData, updateForm] = useState({      
        fname:"",
        lname:"",
        address1: "",
        address2: "",
        email: "",
        city: ''
    })
  
    function processFormData(event) {          
      localStorage.setItem("custData",JSON.stringify(formData)) 
      props.showCal()        
      event.preventDefault()          
      
    }

    function changeHandler(e) {     
     const {name,value}  = e.target
     updateForm( previous => { return {  ...previous, [name]:value  } } )        
    }
    
    return (
       <div id='form' className="" >
      <Fade left cascade>
      
        <Form style={{zIndex:-1}} onSubmit={processFormData} className='form'>
        <Form.Row>
        
        <Form.Group as={Col} controlId="firstName">
          <Form.Label style={{marginLeft:"10px",fontSize:'1rem'}}>First Name</Form.Label>
          <Form.Control autoComplete='off' onChange={changeHandler} type="text" name='fname' placeholder="Enter First Name" />
        </Form.Group>
    
        <Form.Group as={Col} controlId="lastName">
          <Form.Label style={{marginLeft:"10px",fontSize:'1rem'}}>Last Name</Form.Label>
          <Form.Control  autoComplete='off'  onChange={changeHandler}   type="text"  name='lname' placeholder="Enter Last Name" />
        </Form.Group>
      </Form.Row>
        <Form.Row>
        
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label style={{marginLeft:"10px"}}>Email</Form.Label>
            <Form.Control autoComplete='off'  onChange={changeHandler} type="email" name='email' placeholder="Enter email" />
          </Form.Group>
      
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label style={{marginLeft:"10px"}}>Password</Form.Label>
            <Form.Control  autoComplete='off' onChange={changeHandler}   type="password"  name='password' placeholder="Password" />
          </Form.Group>
        </Form.Row>
      
        <Form.Group controlId="formGridAddress1">
          <Form.Label style={{marginLeft:"10px"}}>Address</Form.Label>
          <Form.Control autoComplete='off' onChange={changeHandler}  type='text' name='address1' placeholder="1234 Main St" />
        </Form.Group>
      
        <Form.Group controlId="formGridAddress2">
          <Form.Label style={{marginLeft:"10px"}}>Address 2</Form.Label>
          <Form.Control
          name='address2'    
          onChange={changeHandler}   
          autoComplete='off'    
           placeholder="Apartment, studio, or floor" />
        </Form.Group>
      
        <Form.Row>            
      
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label style={{marginLeft:"10px"}}>Zip</Form.Label>
            <Form.Control onChange={changeHandler}   name='zip' />
          </Form.Group>
        </Form.Row>       
       
        <Button style={{marginLeft:"10px",background:"gold",color:'green'}}  variant="primary" type="submit">
          Submit
        </Button>

      </Form>      
      </Fade>
      </div>
  
    )
}


//Learning ReactJS - Basic Web form with AirBnB OpenSource Calendar (React-Dates ) AWS SES 
//Learning ReactJS at AWS 
//Elliott Arnold 11-5-20     WIP   
//https://linguinecode.com/post/how-to-get-form-data-on-submit-in-reactjs