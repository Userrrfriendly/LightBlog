import React from 'react';

export const AppContext = React.createContext();

// export const Provider = AppContext.Provider;
export class Provider extends React.Component {
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

    render() {
        return (
            <AppContext.Provider value={{
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
              {this.props.children}
            </AppContext.Provider>
        )

    }
}
export const Consumer = AppContext.Consumer;