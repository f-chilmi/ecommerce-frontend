import React from 'react'
import {default as axios} from 'axios'
import {
  Jumbotron, Container,
  Row, Col,
  Card, CardBody, CardText,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button
} from 'reactstrap'
import Navbar from '../Components/NavigationBar'

class Episode extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: {},
      modalOpen: false,
      openedEpisode: {},
      navbarOpen: false
    }
   }

  getData = async (url)=>{
    const data = await fetch(url)
    const result = await data.json()
    return result
  }

  openModal = async(url) => {
    const {data} = await axios.get(url)
    this.setState({modalOpen: true, openedEpisode: data})
  }

  async componentDidMount(){
    const {data} = await axios.get('https://rickandmortyapi.com/api/episode')
    console.log(data)
    this.setState({data})
  }

  render(){
    const {data} = this.state
    return(
      <React.Fragment>
        <Navbar/>
        <Container>
        <Jumbotron className="mt-5">
          <h1>List of Rick and Morty Episode</h1>
        </Jumbotron>
        <Row>
        {Object.keys(data).length && data.results.map(item=>{
          return(
              <Col sm={6} md={3}>
                <Card className="mt-3 shadow">
                  <CardBody>
                    <CardText>{item.episode} : {item.name} </CardText>
                    <Button onClick={()=>this.openModal(item.url)}>Detail</Button>
                  </CardBody>
                </Card>
              </Col>
          )
        })}
        </Row>
      </Container>
      <div className="bg-dark text-light py-3 mt-3">
      <Container >
        <Row>
          <Col>&copy; Rick and Morty 2020</Col>
        </Row>
      </Container>
      </div>
      <Modal isOpen={this.state.modalOpen}>
        <ModalHeader>Detail</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>Name: {this.state.openedEpisode.name}</Col>
            <Col md={12}>Episode: {this.state.openedEpisode.episode}</Col>
            <Col md={12}>Air Date: {this.state.openedEpisode.air_date}</Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={()=>this.setState({modalOpen: false})}>Close</Button>
        </ModalFooter>
      </Modal>
      </React.Fragment>
    )
  }
}

export default Episode