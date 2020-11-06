import React from 'react'
import {Nav} from 'react-bootstrap'

export default function Navigation() {
    return (
        <div className='nav'>

<Nav 
  activeKey="/home"
  // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
>
  <Nav.Item>
    <Nav.Link href="/home">Elliott Arnold's Rake Service Scheduler </Nav.Link>
  </Nav.Item>  
</Nav>
            
        </div>
    )
}
