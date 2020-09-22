import React, { useState } from 'react'
import {default as axios} from 'axios'
import qs from "querystring"
import {useHistory} from 'react-router-dom'

import {
  Jumbotron, Container, Card, CardBody,
  Table,
  Button, ButtonGroup,
  Form, FormGroup, Label, Input,
  UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle,
  Pagination, PaginationItem, PaginationLink
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
      data: {},
      sort: '',
      search: '',
      selected: '?sort=asc',
      currentPage: '',
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

  getAllData = async (event) => {
    if(event){
      event.preventDefault()
    }
    const {data} = await axios.get(`http://localhost:8080/items?page=${this.state.currentPage}&${this.state.selected}`)
    this.setState({
      data: data,
      currentPage: data.pageInfo.currentPage,
      nextLink: data.pageInfo.nextLink,
      prevLink: data.pageInfo.prevLink,
      // query: this.state.query.concat(this.props.location.search)
    })
  }

  selectRadio = (val, num) => {
    if(val){
      switch(val){
        case 'sort[updated_at]=asc': {
          this.setState({
            selected: val,
            isActive0: true,
            isActive1: false,
            isActive2: false,
            isActive3: false
          })
          this.getAllData()
        } break
        case 'sort[price]=asc': {
          this.setState({
            selected: val,
            isActive0: false,
            isActive1: false,
            isActive2: true,
            isActive3: false
          }) 
          this.getAllData()
        } break
        case 'sort[updated_at]=desc': {
          this.setState({
            selected: val,
            isActive0: false,
            isActive1: true,
            isActive2: false,
            isActive3: false
          })
          this.getAllData()
        } break
        case 'sort[price]=desc':{
          this.setState({
            selected: val,
            isActive0: false,
            isActive1: false,
            isActive2: false,
            isActive3: true
          })
          this.getAllData()
        } break
      }
    } else if (num) {
      this.setState({
        
      })
    }
    
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitItems = async(event) => {
    event.preventDefault()
    this.setState({
    })
  }

  render(){
    const {data} = this.state
    const {path} = this.props.match
    console.log(this.props)
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
                <div className="row">
                  <div className="mr-3 col-md-5 col-sm-12 mb-3">
                  Sort
                  <ButtonGroup className="ml-4">
                    <Button size="sm" className="rounded-pill greyColorButton mx-2 h-75 btn-outline-danger" onClick={()=>this.selectRadio('sort[updated_at]=asc')} active={this.state.isActive0}>Oldest
                      {/* <Link to={`${path}?sort[updated_at]=asc`} className="text-decoration-none text-reset">
                        Oldest {this.state.selectd}</Link> */}
                        </Button>
                    <Button size="sm" className="rounded-pill greyColorButton mx-2 h-75 btn-outline-danger" onClick={()=>this.selectRadio('sort[updated_at]=desc')}  active={this.state.isActive1}> Newest
                    {/* <Link to={`${path}?sort[updated_at]=desc`} className="text-decoration-none text-reset">
                      Newest {this.state.selectd}</Link> */}
                      </Button>

                    <UncontrolledButtonDropdown size="sm" className='mx-2'>
                      <DropdownToggle  caret className="rounded-pill greyColorButton btn-outline-danger">
                        Price
                      </DropdownToggle>
                      <DropdownMenu>  
                        <DropdownItem size="sm" className="btn-outline-danger" active={this.state.isActive2} onClick={()=>this.selectRadio('sort[price]=asc')}>Lowest price
                          {/* <Link to={`${path}?sort[price]=asc`} className="text-decoration-none text-reset">
                            Lowest price</Link> */}
                            </DropdownItem>
                        <DropdownItem size="sm"  className="btn-outline-danger" active={this.state.isActive3} onClick={()=>this.selectRadio('sort[price]=desc')} >Highest price
                          {/* <Link to={`${path}?sort[price]=desc`} className="text-decoration-none text-reset">
                            Highest price</Link> */}
                            </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>  
                  </ButtonGroup>
                  </div>
                  <Form onSubmit={()=>{
                    this.submitItems()
                    // this.props.history.push('/product?search=')
                  }} className="w-50 mb-2 pb-0 ml-auto col-md-6 col-sm-12" >
                    <FormGroup className="d-flex flex-row ml-auto">
                      <Input type="search" size="sm" name="search" placeholder="Search product" className="rounded-pill" onChange={this.changeInput}></Input>
                      <Button size="sm" className="rounded-pill greyColorButton mx-2">Search</Button>
                    </FormGroup>
                  </Form>
                
                </div>

                <Table hover color="light">
                  <thead>
                    <tr className="row">
                      <th className="col-md-1 col-sm-2">Id</th>
                      <th className="col-md-7 col-sm-4">Name</th>
                      <th className="col-md-2 col-sm-3">Price</th>
                      <th className="col-md-2 col-sm-3">Category</th>
                    </tr>
                  </thead>
                  {Object.keys(this.state.data).length && this.state.data.info.map(item=>{
                  return(
                  <tbody>
                    <tr className="row ">
                      <td className="col-md-1 col-sm-2"> {item.id} </td>
                      <td className="col-md-7 col-sm-4 ">
                        <Link to={`/ShowDetail/${item.id}`} className="text-decoration-none text-reset">{item.name}</Link>
                      </td>
                      <td className="col-md-2 col-sm-3">Rp {item.price}</td>
                      <td className="col-md-2 col-sm-3">{item.category}</td>
                    </tr>
                  </tbody>
                  )})}
                </Table>
            </CardBody>
            </Card>
            <Pagination>
              <PaginationItem>
                <Button className="greyColorButton " onClick={()=>this.setState({currentPage: this.state.currentPage-1})}>&lt;</Button>
                {/* <Link to={this.state.prevLink != null ? `${path}?page=${this.state.currentPage-1}` : `${path}?page=${this.state.currentPage}`} className="text-decoration-none text-reset"><PaginationLink previous  /></Link> */}
              </PaginationItem>
              <PaginationItem>
                <Button className="greyColorButton " onClick={()=>this.setState({currentPage: this.state.currentPage+1})}>&gt;</Button>
                {/* <Link to={this.state.nextLink != null  ? `${path}?page=${this.state.currentPage+1}` : `${path}?page=${this.state.currentPage}`} className="text-decoration-none text-reset"><PaginationLink next  /></Link> */}
              </PaginationItem>
            </Pagination>
          </Container>
            
        </Jumbotron>
      </React.Fragment>
    )
  }
}

export default Show