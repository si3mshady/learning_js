
import React, {useState} from 'react'
import './App.css';

function App() {
  
  const [log, setLog] = useState([])
  const [filterFor, setFilterFor] =  useState('') 
  const [highlighted, setHighlighted] = useState(false)    
  const handleChange = (e) => { setFilterFor(e.target.value)}

  const filterLogFor =  (line, filterWord) => {

       if (filterWord === '' || filterWord === null) {   return line }
       else if (   line.includes(filterWord)   ) 
       
       {   return line   }  }
    
  const splitLog = (str) => { return str.split("\n")}

  return (
  <>
    <div className={`file-drop container ${highlighted  ? "highlighted" : 'grey'}`} >
     
      <h3 className=''>Syslog File Filter</h3>

      <div className="drop-zone"
          
            onDragEnter={() => setHighlighted(true)}            
            onDragLeave={() => setHighlighted(false)}
            onDragOver={ e => {e.preventDefault()}}    
            onDrop={ e => {e.preventDefault();

               setHighlighted(false);             

                Array.from(e.dataTransfer.files)
                  .filter(file => file)
                  .forEach(async file =>  {
                  const text = await file.text();                           
                  let result = splitLog(text) //split log by new lines
                  result = result.map(val => val.replace(/([\d{3}])/gm,'*')) // remove any ip address
                   setLog(prev => [...prev, ...result])
                }
               )           
          
          }        
        } >      
          <h1>Drop SYSLOG here</h1>   </div >     
        </div>           

              <div className='results container'>

              <input onChange={handleChange} type='text' name='filter' placeholder='   filter log for... '/>
              <br/>
                    {log.map((content,index) => ( <p key={index} class={index % 2 == 0 ? "even":"odd" }>
                    {

                      filterLogFor(content, filterFor)

                    }
                    </p>) )}
              </div>
      </>  
  );
}

export default App;


/*
Learning Drag and Drop with ReactJS 
React Hooks Practice 
Parse Syslog files 
Elliott Arnold 1-24-21 
*/
