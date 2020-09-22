import React from 'react'
import {default as axios} from 'axios'
import qs from 'querystring'

// Importing page
import NavigationBar from './NavigationBar'

import {
  Jumbotron, Container,
  Card, CardText, CardBody, CardTitle, CardFooter,
  Modal, ModalBody, ModalFooter,
  Button, Alert
} from 'reactstrap'

import {Link} from 'react-router-dom'

class ShowDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: {name: '', price: '', category:'', description: ''},
      modalOpen: false,
      alertOpen: false,
      name: ''
    }
  }

  async componentDidMount(){
    await this.getData()
  }

  getData = async () => {
    const { match: { params } } = this.props
    const {data} = await axios.get(`http://localhost:8080/items/${params.id}`)
    this.setState({data: data.data})
    // console.log(data)
  }

  deleteData = async() => {
    const { match: { params} } = this.props
    await axios.delete(`http://localhost:8080/items/${params.id}`)
    this.setState({
      modalOpen: false,
      alertOpen: true
    })
  }

  render(){
    const {data} = this.state
    return(
      <>
      <NavigationBar/>
      <Jumbotron className="vh-100">
        <Container>
          <Alert color="danger" isOpen={this.state.alertOpen}>
            Item deleted!
          </Alert>
          <Card className="bg-white p-4">
            <CardBody>
              <CardTitle> <h4>{data.name}</h4></CardTitle>
              <CardText> <h6>{data.category}</h6></CardText>
              <CardText>Rp {data.price}</CardText>
              <CardText>{data.description}</CardText>
            </CardBody>
            <CardFooter className="bg-white border-0 ml-auto">
              <Button className="rounded-pill greyColorButton mx-2" >
                <Link to={`/edit/${data.id}`} className="text-decoration-none text-reset">Edit</Link>
              </Button>
              
              <Button className="rounded-pill greyColorButton mx-2" onClick={()=>this.setState({modalOpen: true})} >Delete</Button>
            </CardFooter>
          </Card>
          <Modal isOpen={this.state.modalOpen}>
            <ModalBody>
              Are you sure want to delete the product?
            </ModalBody>
            <ModalFooter className="border-0">
              <Button onClick={()=>this.deleteData()} href="/" className="greyColorButton rounded-pill">Yes</Button>
              <Button onClick={()=>this.setState({modalOpen: false})} className="greyColorButton rounded-pill">No</Button>
            </ModalFooter>
          </Modal>

        </Container>
      </Jumbotron>
      </>
    )
  }
}

export default ShowDetail