import React from 'react';
import axios from 'axios'
export const AppContext = React.createContext();

// export const Provider = AppContext.Provider;
export class Provider extends React.Component {
    state = {
        articles:[],
        articleToEdit:undefined
      }
    
      getArticles = ()=> {
        axios('http://localhost:8000/api/articles')
        .then((res) => {
            this.setState({
                articles:res.data.articles
            })
        })
      }
    
      deleteArticle = (id)=> {
        // const onDelete = this.context.actions.deleteArticle;
        return axios.delete(`http://localhost:8000/api/articles/${id}`)
          .then(() => this.setState({
            articles: this.state.articles.filter((article)=> article._id !== id)
          }));
      }
    
      setEdit = (article)=> {
        //sets the article in edit mode.
        this.setState({
          articleToEdit: article
        })
      }
    
      submitNewArticle = (title,body,author)=> {
        //this submits a new article
        return axios.post('http://localhost:8000/api/articles', {
            title,
            body,
            author,
        }).then(res=>
            this.setState({
                articles: ([res.data.article]).concat(this.state.articles)
            })
        )
      }
    
      submitEditedArticle = (title,body,author)=> {
        //submits an existing  article that is in edit mode
        return axios.patch(`http://localhost:8000/api/articles/${this.state.articleToEdit._id}`, {
            title,
            body,
            author,
          }).then(res=>
              this.setState({
                articles: this.state.articles.map((article)=>{
                  if (article._id === res.data.article._id) {
                    return {
                      ...res.data.article
                    }
                  } else {
                    return {
                      ...article
                    }
                  }
                }),
                articleToEdit: undefined
              })
          )
      }

    render() {
        return (
            <AppContext.Provider value={{
                state: this.state.articles,
                articleToEdit: this.state.articleToEdit,
                actions: {
                  getArticles: this.getArticles,
                  deleteArticle: this.deleteArticle,
                  setEdit: this.setEdit,
                  submitNewArticle: this.submitNewArticle,
                  submitEditedArticle: this.submitEditedArticle
                }
              }}>
              {this.props.children}
            </AppContext.Provider>
        )

    }
}
export const Consumer = AppContext.Consumer;