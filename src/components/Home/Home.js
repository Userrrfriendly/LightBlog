
import React from 'react';
// import axios from 'axios';
import moment from 'moment'; //JavaScript date library for parsing, validating, manipulating, and formatting dates.
import { Consumer, AppContext } from '../Context';
import { Form } from '../../components/Article';

class Home extends React.Component {
  componentDidMount() {
    const getArticles = this.context.actions.getArticles;
    getArticles();
  }

  handleDelete = (id)=> {
    const onDelete = this.context.actions.deleteArticle;
    onDelete(id);
  }

  handleEdit = (article)=> {
    const articleToEdit = this.context.actions.setEdit;
    articleToEdit(article);
  }

  render() {
    return (
      <Consumer>
        {context => {
          return (
            <div className="container">
            <div className="row pt-5">
              <div className="col-12 col-lg-6 offset-lg-3">
                <h1 className="text-center">LightBlog</h1>
              </div>
              <Form articleToEdit={this.context.articleToEdit}/>
            </div>
            <div className="row pt-5">
              <div className="col-12 col-lg-6 offset-lg-3">
                {context.state.map((article) => {
                  return (
                    <div key={article._id}className="card my-3">
                      <div className="card-header">
                        {article.title}
                      </div>
                      <div className="card-body">
                        {article.body}
                        <p className="mt-5 text-muted"><b>{article.author}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
                      </div>
                      <div className="card-footer">
                        <div className="row">
                          <button onClick={() => this.handleEdit(article)} className="btn btn-primary mx-3">
                            Edit
                          </button>
                          <button onClick={() => this.handleDelete(article._id)} className="btn btn-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          )
        }} 
      </Consumer>

    );
  }
}
Home.contextType = AppContext;


export default Home;