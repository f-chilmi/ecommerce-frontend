import React from 'react'
import {default as axios} from 'axios'

import {
  Jumbotron, Container, Card, CardBody,
  Table,
  Button
} from 'reactstrap'

import {
  Link
} from 'react-router-dom'

// Importing page
import NavigationBar from './NavigationBar'


class Show extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: {}
    }
  }

  async componentDidMount(){
    const {data} = await axios.get('http://localhost:8080/category')
    console.log(data)
    this.setState({data: data.data})
  }

  getId = async (id)=>{
    const {data} = await axios.get(`http://localhost:8080/items/${id}`)
    this.setState({modalOpen: true, ...data.data}, ()=>{
      console.log('ok')
    })
  }

  render(){
    // const {data} = this.state
    return(
      <React.Fragment>
        <NavigationBar/>

        <Jumbotron>
          <Container>
            <Card className="bg-white">
              <CardBody>
            <div className="d-flex flex-row mb-4">
            <h4>List product</h4>
            <Button className="ml-auto rounded-pill themeColor" href="/Add">Add product</Button>
            </div>
            
            <Table hover color="light">
              <thead>
                <tr className="row">
                  <th className="col-md-1 col-sm-1">Id</th>
                  <th className="col-md-7 col-sm-6">Name</th>
                  <th className="col-md-2 col-sm-3">Price</th>
                  <th className="col-md-2 col-sm-2">Category</th>
                </tr>
              </thead>
              {Object.keys(this.state.data).length && this.state.data.map(item=>{
              return(
              <tbody>
                <tr className="row ">
                  <td className="col-md-1 col-sm-1"> {item.id} </td>
                  <td className="col-md-7 col-sm-6 ">
                    <Link to={`/ShowDetail/${item.id}`} className="text-decoration-none text-reset">{item.name}</Link>
                  </td>
                  <td className="col-md-2 col-sm-3">Rp {item.price}</td>
                  <td className="col-md-2 col-sm-2">{item.category}</td>
                </tr>
              </tbody>
              )})}
            </Table>
            </CardBody>
            </Card>
          </Container>
            
        </Jumbotron>
      </React.Fragment>
    )
  }
}

export default Show