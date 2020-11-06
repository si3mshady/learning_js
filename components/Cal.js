import React, { Component } from 'react'
import {  SingleDatePicker } from 'react-dates';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css'
import 'react-dates/initialize'
import {Modal, Button} from 'react-bootstrap'
import {sendEmail} from './SendMail'
export default class Cal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            scheduled: false,
            scheduled_date: '',            
            email: JSON.parse(localStorage.getItem('custData')).email,
            fname: JSON.parse(localStorage.getItem('custData')).fname,
            lname: JSON.parse(localStorage.getItem('custData')).lname,
            showModal: true                                        
            
        }
    }
    

    setEvent = (date) => {this.setState({scheduled:true, scheduled_date: JSON.stringify(date)})}
    
    modalHandler = () => {  this.setState({ showModal: !this.state.showModal  })}            
     
    
    
    refreshPage() { 

        setTimeout(() => {  window.location.reload(true);  }, 3000);  }

    render() {      

        var calendar = <SingleDatePicker                       
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            onDateChange={(date)=> this.setEvent(date._d)}           
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired            
            id="calendar" // PropTypes.string.isRequired,
            />        
        
        var modal = <div className="mod">  
                              <Modal show={this.state.showModal}>
                              <Modal.Header className="modalContainer top" >{`Thank you, 
                              ${this.state.fname}!`}</Modal.Header>
                              <Modal.Body className="modalContainer"> You have selected {this.state.scheduled_date}                   
                        
                              </Modal.Body>                                  
                                <Modal.Footer  className="modalContainer bottom">{`An email confirmation has been sent to ${this.state.email}`}</Modal.Footer>       
                                <Button className="bottom-btn" onClick={ () => {
                                sendEmail(this.state.fname,this.state.email,this.state.scheduled_date);}                                
                               }> Send Email </Button>  
                                <Button className="bottom-btn" onClick={ () => { this.modalHandler(); this.refreshPage();
                                }
                            }> Close </Button>  
                        </Modal>
                        
                       </div>
return (


                <div className='cal'>                
                        {!this.state.scheduled?calendar:modal}                     
                </div>
             
           
        )
    }
}

//Learning ReactJS - Basic Web form with AirBnB OpenSource Calendar (React-Dates ) AWS SES 
//Learning ReactJS at AWS 
//Elliott Arnold 11-5-20     WIP   
//https://stackoverflow.com/questions/53176124/material-ui-zoom-animate-out-then-remove