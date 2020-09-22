import React from 'react'
import {default as axios} from 'axios'
import qs from 'querystring'

import {
  Container, Card,
  Col,
  Jumbotron,
  Form, FormGroup, Label, Input, Button,
  Alert
} from 'reactstrap'

// Importing page
import NavigationBar from './NavigationBar'

class Edit extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: {},
      name: '',
      price: '',
      category_id: '',
      description: '',
      alertOpen: false
    }
  }

  async componentDidMount(){
    await this.getData()
  }

  getData = async () => {
    const {params} = this.props.match
    const {data} = await axios.get(`http://localhost:8080/items/${params.id}`, qs.stringify(this.state.data))
    this.setState(data.data)
    console.log(data.data)
  }

  changeInput = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitItems = async(event) => {
    const {params} = this.props.match
    const {name, price, category_id, description} = this.state
    const data = qs.stringify({
      name, price, category_id, description
    })
    console.log(data)
    await axios.patch(`http://localhost:8080/items/${params.id}`, data)
    this.setState({alertOpen: true})
  }

  render(){
    const {data} = this.state
    // console.log(this.state.data)
    return(
      <React.Fragment>
        <NavigationBar/>
        <Jumbotron>
          <Container>
            <Alert color="success" isOpen={this.state.alertOpen}>
              Item updated successfully!
            </Alert>
            <Card className="p-5">
              <h4>Edit detail product</h4>
              <hr></hr>
              <Form onSubmit={this.submitItems}>
                <FormGroup row>
                  <Label for="Name" md={2} >Name Product</Label>
                  <Col md={10}>
                    <Input type="text" name="name" value={this.state.name} placeholder="Name product" onChange={this.changeInput} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="Price" md={2}>Price</Label>
                  <Col md={10}>
                    <Input type="text" name="price" value={this.state.price} placeholder="Price product" onChange={this.changeInput}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="Category" md={2}>Select category</Label>
                  <Col md={10}>
                    <Input type="select" name='category_id' value={this.state.category_id} onChange={this.changeInput}>
                      <option value='6'>Beauty</option>
                      <option value='1'>Electronics</option>
                      <option value='3'>Fashion</option>
                      <option value='2'>Home</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="description" md={2}>Description</Label>
                  <Col md={10}>
                    <Input type="textarea" name="description" value={this.state.description} onChange={this.changeInput} />
                  </Col>
                </FormGroup>
                <FormGroup className="mt-5 ml-auto">
                  <Button className="rounded-pill themeColor">Update</Button>
                  {/* {console.log(this.data)} */}
                </FormGroup>
              </Form>
            </Card>
            
          </Container>
        </Jumbotron>
      </React.Fragment>
    )
  }

}

export default Edit