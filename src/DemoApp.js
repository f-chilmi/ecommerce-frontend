import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// Importing page
import Home from './DemoPages/Home'
import Episode from './DemoPages/Episode'

class App extends React.Component{
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/Episode" component={Episode} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App