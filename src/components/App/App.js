import React from 'react';
// import { Provider } from '../Context';
import { Switch, Route } from 'react-router-dom';
import Home from '../../components/Home/Home';


class App extends React.Component {
  render () {
    return (
      /* <Home 
            state={this.state}
            getArticles={this.getArticles}
            deleteArticle={this.deleteArticle}
            setEdit={this.setEdit}
            submitArticle={this.submitArticle}
            editArticle={this.editArticle}
      /> */
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/about" render={()=>{return (<h1>ABOUT</h1>)}} /> 
          <Route path="/about/me" render={()=>{return (<h2>ABOUT MEEE!!!!!!!!!!</h2>)}} /> */}
        </Switch>
    )
  }
}

export default App;