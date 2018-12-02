import React from 'react';
import { Provider } from '../Context';
import { Switch, Route } from 'react-router-dom';
import Home from '../../components/Home/Home';


class App extends React.Component {
  state = {
    articles:[
      // {title:'Title TEst',
      //   author:'Author Test',
      //   body:'body TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST',
      //   createdAt:"Fri Nov 30 2017 22:24:22 GMT+0200 (Eastern European Standard Time)",
      //   _id:"12345678901"
      // }
    ]
  }

  onLoad = (articles)=> {
    
    // const test = ()=>{console.log(this)}
    // test();
    console.log(articles)
    // const that = this;
    // console.log(that);
    this.setState({
      articles:articles
    });
    // console.log('...fetching all articles from server');
  }

  render () {
    return (
      <Provider value={{
        state: this.state,
        actions: {
          onLoad: this.onLoad
        }
      }}>
        <Switch>
          <Route exact path="/" render={()=> <Home />} />
          <Route exact path="/about" render={()=>{return (<h1>ABOUT</h1>)}} /> 
          <Route path="/about/me" render={()=>{return (<h2>ABOUT MEEE!!!!!!!!!!</h2>)}} />
        </Switch>
      </Provider>
    )
  }
}

export default App;