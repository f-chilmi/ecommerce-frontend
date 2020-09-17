import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Importing page
import Show from './Pages/showAll'
import Add from './Pages/AddProduct'
import ShowDetail from './Pages/ShowDetailId'

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Show} exact />
          <Route path="/ShowDetail/:id" component={ShowDetail} />
          <Route path="/Add" component={Add} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App