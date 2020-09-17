import React from 'react'
import {Table, Button, Modal, ModalBody, ModalFooter, Input, Form} from 'reactstrap'
import {default as axios} from 'axios'
import qs from 'querystring'

class ManageUser extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: [],
      modalOpen: false,
      id: '',
      name: '',
      email: ''
    }
  }
  async componentDidMount(){
    await this.getData()
  }
  getData = async()=>{
    const {data} = await axios.get('http://localhost:8080/users')
    this.setState({data: data.data})
  }
  editUser = async (id)=>{
    const {data} = await axios.get(`http://localhost:8080/users/${id}`)
    this.setState({modalOpen: true, ...data.data}, ()=>{
      console.log('ok')
    })
  }

  changeInput = (e) => {
    this.setState({
      // [e.target.name]: e.target.value
      name: e.target.name,
      price: e.target.price,
      category_id: e.target.category_id,
      description: e.target.description
    })
  }

  formSubmit = async (e)=>{
    e.preventDefault()
    await axios.put(`http://localhost:8080/users/${this.state.id}`, qs.stringify({name: this.state.name, email: this.state.email}))
    this.setState({modalOpen: false}, async()=>{
      await this.getData()
    })
  }

  deleteUser = async (id)=>{
    await axios.delete(`http://localhost:8080/users/${id}`)
    this.setState({
      modalOpen: false
    }, ()=>{
      this.getData()
    })
  }

  render(){
    return(
      <>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(item=>{
              return(
                <React.Fragment>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <Button size="sm" color="warning" onClick={()=>this.editUser(item.id)}>Edit</Button> &nbsp;
                      <Button size="sm" color="danger" onClick={()=>this.deleteUser(item.id)}>Delete</Button>
                    </td>

                  </tr>
                </React.Fragment>
              )
            })
            }
          </tbody>
        </Table>
        <Modal isOpen={this.state.modalOpen}>
          <ModalBody>
            <Form onSubmit={this.formSubmit}>
              {/* <Input name='id' onChange={this.changeInput} value={this.state.id} /> */}
              <Input name='name' onChange={this.changeInput} value={this.state.name} />
              <Input name='email' onChange={this.changeInput} value={this.state.email} />
              <Button>Submit</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button>Submit</Button>
            <Button onClick={()=>this.setState({modalOpen: false})}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default ManageUser