import React from 'react'
import {
  Container,
  Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav, NavLink,
  Row, Col
} from 'reactstrap'
import {Link} from 'react-router-dom'

// Import image
import Logo from '../assets/img/logo.svg'
import Cart from '../assets/img/shopping-cart (2) 1.svg'
import Bell from '../assets/img/bell (1) 1.svg'
import Mail from '../assets/img/mail (3) 1.svg'
import Smile from '../assets/img/orang.png'

class NavigationBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      navbarOpen: false
    }
   }
  render(){
    return(
      <Navbar color="faded" light expand="md" className="shadow">
          <Container>
            <NavbarBrand> <Link to="/"> <img src={Logo} alt='logo.svg'/></Link></NavbarBrand>
            <NavbarToggler onClick={()=>this.setState({navbarOpen: !this.setState.navbarOpen})}/>
            <Collapse isOpen={this.state.navbarOpen} navbar>
              <Nav className="ml-auto">
                <Row>
                  <Col><NavLink href="#"> <img src={Cart} alt="cart.svg" /> </NavLink></Col>
                  <Col><NavLink href="#"> <img src={Bell} alt="bell.svg" /> </NavLink></Col>
                  <Col><NavLink href="#"> <img src={Mail} alt="mail.svg" /> </NavLink></Col>
                  <Col><NavLink href="#"> <img src={Smile} alt="person.png" /></NavLink></Col>
                </Row>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
    )
  }
}

export default NavigationBar