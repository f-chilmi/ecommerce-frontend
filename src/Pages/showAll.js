import React from 'react'
import {default as axios} from 'axios'
import PropTypes from "prop-types"

import {
  Jumbotron, Container, Card, CardBody,
  Table,
  Button, ButtonGroup,
  Form, FormGroup, Label, Input,
  UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle,
  Pagination
} from 'reactstrap'

import {
  Link, Redirect
} from 'react-router-dom'

// Importing page
import NavigationBar from './NavigationBar'


class Show extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: {},
      selected: '?sort=asc',
      currentPage: '',
      nextPage: '',
      nextLink: '',
      prevLink: '',
      isActive0: true,
      isActive1: false,
      isActive2: false,
      isActive3: false
    }
  }

  async componentDidMount(){
    await this.getAllData()
  }

  getAllData = async () => {
    const {data} = await axios.get(`http://localhost:8080/items${this.props.location.search}`)
    this.setState({
      data: data,
      currentPage: data.pageInfo.currentPage,
      nextLink: data.pageInfo.nextLink,
      prevLink: data.pageInfo.prevLink
    })
    // console.log(this.state.currentPage, this.state.currentPage+1)
  }

  getData = async () => {
    // const { match, location, history } = this.props
    const {data} = await axios.get(`http://localhost:8080/items${this.props.location.search}`)
    this.setState({data: data})
    console.log(data)
    // console.log(location)
  }

  // selectRadio = (val) => {
  //   switch(val){
  //     case '?sort[updated_at]=asc': {
  //       this.setState({
  //         selected: val,
  //         isActive0: true,
  //         isActive1: false,
  //         isActive2: false,
  //         isActive3: false
  //       })
  //       this.getData()
  //     } break
  //     case '?sort[price]=asc': {
  //       this.setState({
  //         selected: val,
  //         isActive0: false,
  //         isActive1: false,
  //         isActive2: true,
  //         isActive3: false
  //       }) 
  //       this.getData()
  //     } break
  //     case '?sort[updated_at]=desc': {
  //       this.setState({
  //         selected: val,
  //         isActive0: false,
  //         isActive1: true,
  //         isActive2: false,
  //         isActive3: false
  //       })
  //       this.getData()
  //     } break
  //     case '?sort[price]=desc':{
  //       this.setState({
  //         selected: val,
  //         isActive0: false,
  //         isActive1: false,
  //         isActive2: false,
  //         isActive3: true
         
  //       })
  //       this.getData()
  //     } break
  //   }
  // }

  render(){
    const {data} = this.state
    const {path} = this.props.match
    console.log(this.state)
    return(
      <React.Fragment>
        <NavigationBar/>

        <Jumbotron>
          <Container>
            <Card className="bg-white p-4">
              <CardBody>
                <div className="d-flex flex-row mb-4">
                <h4>List product</h4>
                <Button className="ml-auto rounded-pill themeColor" href="/Add">Add product</Button>
                </div>
                
                <div className="mb-4 bg-light p-3 d-flex flex-row">
                  Sort
                <div className="mr-3">
                <ButtonGroup className="ml-4">
                  <Button size="sm" className="rounded-pill greyColorButton mx-2 h-75 btn-outline-danger" onClick={()=>this.getAllData()} active={this.state.isActive0}>
                    <Link to={`${path}?sort[updated_at]=asc`} className="text-decoration-none text-reset">
                      Oldest {this.state.selectd}</Link></Button>
                  <Button size="sm" className="rounded-pill greyColorButton mx-2 h-75 btn-outline-danger" onClick={()=>this.getAllData()}  active={this.state.isActive1}>
                  <Link to={`${path}?sort[updated_at]=desc`} className="text-decoration-none text-reset">
                    Newest {this.state.selectd}</Link></Button>

                  <UncontrolledButtonDropdown size="sm" className='mx-2'>
                    <DropdownToggle  caret className="rounded-pill greyColorButton btn-outline-danger">
                      Price
                    </DropdownToggle>
                    <DropdownMenu>  
                      <DropdownItem size="sm" className="btn-outline-danger" active={this.state.isActive2} onClick={()=>this.getAllData()}>
                        <Link to={`${path}?sort[price]=asc`} className="text-decoration-none text-reset">
                          Lowest price</Link></DropdownItem>
                      <DropdownItem size="sm"  className="btn-outline-danger" active={this.state.isActive3} onClick={()=>this.getAllData()} >
                        <Link to={`${path}?sort[price]=desc`} className="text-decoration-none text-reset">
                          Highest price</Link></DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>  
                </ButtonGroup>
                </div>
                <Form onSubmit={this.getAllData} className="w-50 mb-0 pb-0 ml-auto" >
                  <FormGroup className="d-flex flex-row ml-auto">
                    <Input type="search" size="sm" name="search" placeholder="Search product" className="rounded-pill"></Input>
                    <Button size="sm" className="rounded-pill greyColorButton mx-2">Search</Button>
                  </FormGroup>
                </Form>
                
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
                  {Object.keys(this.state.data).length && this.state.data.info.map(item=>{
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
            {/* <div className="d-flex flex-row">
            <Form >
              <input type="hidden" name="page" value={this.state.currentPage-1}></input>
              <Button onSubmit={this.getAllData()}>
                <span aria-hidden="true">‹</span>
                <span class="sr-only">Previous</span>
              </Button>
            </Form>
            <Form >
              <input type="hidden" name="page" value={this.state.currentPage+1}></input>
              <Button onSubmit={this.getAllData()}>
                <span aria-hidden="true">›</span>
                <span class="sr-only">Next</span>
              </Button>
            </Form>
            </div> */}
          </Container>
            
        </Jumbotron>
      </React.Fragment>
    )
  }
}

export default Show