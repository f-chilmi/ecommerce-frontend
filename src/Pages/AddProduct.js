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

class Add extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: {},
      name: '',
      price: '',
      category_id: 6,
      description: '',
      alertOpen: false
    }
  }

  getData = async() => {
    const {data} = await axios.get('http://localhost:8080/category')
    console.log(data)
    this.setState({data: data.data})
  }

  changeInput = (e) => {
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addItems = async(event) => {
    event.preventDefault()
    const {name, price, category_id, description} = this.state
    const data = qs.stringify({
      name, price, category: category_id, description
    })
    console.log(data)
    await axios.post('http://localhost:8080/items', data)
    this.setState({alertOpen: true})
  }

  render(){
    const {data} = this.state
    return(
      <React.Fragment>
        <NavigationBar/>
        <Jumbotron>
          <Container>
            <Alert color="success" isOpen={this.state.alertOpen}>
              Item added successfully!
            </Alert>
            <Card className="p-5">
              <h4>Add Product</h4>
              <hr></hr>
              <Form onSubmit={this.addItems}>
                <FormGroup row>
                  <Label for="Name" sm={2}>Name Product</Label>
                  <Col sm={10}>
                    <Input type="text" name="name" value={this.state.name} placeholder="Name product" onChange={this.changeInput} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="Price" sm={2}>Price</Label>
                  <Col sm={10}>
                    <Input type="text" name="price" value={this.state.price} placeholder="Price product" onChange={this.changeInput}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="Category" sm={2}>Select category</Label>
                  <Col sm={10}>
                    <Input type="select" name='category_id' value={this.state.category_id} onChange={this.changeInput}>
                      <option value='6' selected>Beauty</option>
                      <option value='1'>Electronics</option>
                      <option value='3'>Fashion</option>
                      <option value='2'>Home</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="description" sm={2}>Description</Label>
                  <Col sm={10}>
                    <Input type="textarea" name="description" value={this.state.description} onChange={this.changeInput} />
                  </Col>
                </FormGroup>
                <FormGroup className="mt-5 ml-auto">
                  <Button type="submit" className="rounded-pill themeColor">Add New Product</Button>
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

export default Add