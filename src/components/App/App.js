import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../components/Home/Home';


class App extends React.Component {
  state = {
    articles:[]
  }

  render () {
    return (
      <Switch>
        <Route exact path="/" render={ ()=> {
          return (<Home articles={this.state.articles}/>)}
        } />
        <Route path="/about" render={()=>{return (<h1>ABOUT</h1>)}} />
        <Route path="/about/me" component={Home} />
      </Switch>
    )
  }
}

export default App;