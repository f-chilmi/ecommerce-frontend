import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Importing page
import Show from './Pages/showAll'
import Add from './Pages/AddProduct'
import ShowDetail from './Pages/ShowDetailId'
import Edit from './Pages/EditDetail'

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Show} exact />
          <Route path={`/product`} component={Show} exact />
          <Route path="/ShowDetail/:id" component={ShowDetail} />
          <Route path="/Edit/:id" component={Edit} />
          <Route path="/Add" component={Add} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App