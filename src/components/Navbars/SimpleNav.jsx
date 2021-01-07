import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import React, { Component } from "react";
import '../style.css'




class SimpleNav extends Component { 
    render() { 
        return ( 
            <Navbar className="nav-props " expand="lg">
            <img
            src="https://cdn.shopify.com/shopifycloud/hatchful-web/assets/44bf25cf6e6e6bb479e519bd10634005.svg"
            width="50"
            height="50"
            className="d-inline-block align-top "
            alt="React Bootstrap logo"
            style={{marginLeft :'20px', marginRight: '20px'}}
            />      
            <Navbar.Brand href="#home" style={{color: 'white'}}>Monitoring Tool</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto" style={{marginRight :'80px'}}>
              {
                // <Nav.Link href="#home">Home</Nav.Link>
                // <Nav.Link href="#link">Link</Nav.Link>
              }
              <Nav.Link>
              <img
              src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png"
              width="30"
              height="30"
              className="d-inline-block align-top rounded-circle"
              alt="React Bootstrap logo"
              />      
              </Nav.Link>
        
              <Nav.Link  style={{color: 'white'}}>
               Rick Grims
              </Nav.Link>
        
        
            
                <NavDropdown  id="basic-nav-dropdown" style={{color: 'white'}}>
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
         );
    }
}
 
export default SimpleNav;