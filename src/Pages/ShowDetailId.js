import React from 'react'
import {default as axios} from 'axios'
import qs from 'querystring'

// Importing page
import NavigationBar from './NavigationBar'

import {
  Jumbotron, Container,
  Card, CardText, CardBody, CardTitle, CardFooter,
  Modal, ModalBody, ModalFooter,
  Button
} from 'reactstrap'

class ShowDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: {},
      modalOpen: false,
      name: ''
    }
  }

  async componentDidMount(){
    await this.getData()
  }

  // getAllData = async() => {
  //   const {data}
  // }
  
  getData = async () => {
    const { match: { params } } = this.props
    const {data} = await axios.get(`http://localhost:8080/items/${params.id}`, qs.stringify(this.state.data))
    this.setState({data: data.data})
    // console.log(data)
  }

  editData = async() => {
    const { match: { params } } = this.props
    const { data } = await axios.patch(`http://localhost:8080/items/${params.id}`)
    this.setState({modalOpen: true, ...data.data}, ()=>{
      console.log('ok')
    })
  }

  deleteData = async() => {
    const { match: { params} } = this.props
    await axios.delete(`http://localhost:8080/items/${params.id}`)
    this.setState({
      modalOpen: false
    })
  }

  render(){
    const {data} = this.state
    console.log(data.length && data[0].name)
    return(
      <>
      <NavigationBar/>
      <Jumbotron className="vh-100">
        <Container>
          <Card className="bg-white ">
            <CardBody>
              <CardTitle> <h4>{data.length && data[0].name}</h4></CardTitle>
              <CardText> <h6>{data.length && data[0].category}</h6></CardText>
              <CardText>Rp {data.length && data[0].price}</CardText>
              <CardText>{data.length && data[0].description}</CardText>
            </CardBody>
            <CardFooter className="bg-white border-0 ml-auto">
              <Button className="rounded-pill greyColorButton mx-2" onClick={()=>this.setState({modalOpen: true})}>Edit</Button>
              <Button className="rounded-pill greyColorButton mx-2" onClick={()=>this.setState({modalOpen: true})} >Delete</Button>
            </CardFooter>
          </Card>
          <Modal isOpen={this.state.modalOpen}>
            <ModalBody>
              Are you sure want to delete the product?
            </ModalBody>
            <ModalFooter className="border-0">
              <Button onClick={()=>this.deleteData()} href="/">Yes</Button>
              <Button onClick={()=>this.setState({modalOpen: false})}>No</Button>
            </ModalFooter>
          </Modal>

        </Container>
      </Jumbotron>
      </>
    )
  }
}

export default ShowDetail