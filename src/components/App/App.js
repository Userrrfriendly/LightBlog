import React from 'react';
import { Provider } from '../Context';
import { Switch, Route } from 'react-router-dom';
import Home from '../../components/Home/Home';


class App extends React.Component {
  state = {
    articles:[],
    articleToEdit:undefined
  }

  getArticles = (articles)=> {
    this.setState({
      articles
    });
  }

  deleteArticle = (id)=> {
    this.setState({
      articles: this.state.articles.filter((article)=> article._id !== id)
    })
  }

  setEdit = (article)=> {
    //sets the article in edit mode.
    this.setState({
      articleToEdit: article
    })
  }

  submitArticle = (data)=> {
    this.setState({
      articles: ([data.article]).concat(this.state.articles)
    })
  }

  editArticle = (data)=> {
    //submits an existing  article that is in edit mode
    this.setState({
      articles: this.state.articles.map((article)=>{
        if (article._id === data.article._id) {
          return {
            ...data.article
          }
        } else {
          return {
            ...article
          }
        }
      }),
      articleToEdit: undefined
    })
  }

  render () {
    return (
      <Provider value={{
        state: this.state.articles,
        articleToEdit: this.state.articleToEdit,
        actions: {
          getArticles: this.getArticles,
          deleteArticle: this.deleteArticle,
          setEdit: this.setEdit,
          submitArticle: this.submitArticle,
          editArticle: this.editArticle
        }
      }}>
      {/* <Home 
            state={this.state}
            getArticles={this.getArticles}
            deleteArticle={this.deleteArticle}
            setEdit={this.setEdit}
            submitArticle={this.submitArticle}
            editArticle={this.editArticle}
      /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/about" render={()=>{return (<h1>ABOUT</h1>)}} /> 
          <Route path="/about/me" render={()=>{return (<h2>ABOUT MEEE!!!!!!!!!!</h2>)}} /> */}
        </Switch>
      </Provider>
    )
  }
}

export default App;