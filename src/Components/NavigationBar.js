import React from 'react'
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse, Container } from 'reactstrap'
import {Link} from 'react-router-dom'

class NavigationBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      navbarOpen: false
    }
   }
  render(){
    return(
      <Navbar color="dark" dark expand="md "> 
        <Container>
        <NavbarBrand>Rick and Morty</NavbarBrand>
            <NavbarToggler onClick={()=>this.setState({navbarOpen: !this.setState.navbarOpen})} />
            <Collapse navbar isOpen={this.state.navbarOpen} >
              <Nav navbar className="ml-auto">
                <NavItem>
                  <Link className="nav-link" to='/'>Home</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to='/episode'>Episode</Link>
                </NavItem>
              </Nav>
            </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default NavigationBar