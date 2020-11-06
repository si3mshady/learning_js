import React , {useState} from  'react';
import Video from './components/Video'
import Form from './components/Form'
import Calendar from './components/Cal'
import Nav from './components/Navigation'

export default function App(props) {
  const [submitClicked,setSubmitClicked] = useState(false)

  function showCal(e)  {  setSubmitClicked(true)    }

  return (
  <div className='' >

    <Nav></Nav>

    <Video/>
      
    <div className="split left"> <Form showCal={showCal}/>  </div>
      
      {submitClicked?<div className="split right">
          <Calendar custData={'Data'}/>
      </div>: null}      
    
    </div>     
   
  )
}

//Learning ReactJS - Basic Web form with AirBnB OpenSource Calendar (React-Dates ) AWS SES 
//Learning ReactJS at AWS 
//Elliott Arnold 11-5-20     WIP   
