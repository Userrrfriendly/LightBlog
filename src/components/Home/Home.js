
import React from 'react';
import axios from 'axios';
import moment from 'moment'; //JavaScript date library for parsing, validating, manipulating, and formatting dates.

import { Consumer, AppContext } from '../Context';
import { Form } from '../../components/Article';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    // let value = this.context;
    // console.log(this.props.onLoad);

    // this.props.onLoad(
    //   [
    //     {title:'AATitle TEst',
    //       author:'AAAAuthor Test',
    //       body:'AAAbody TEST',
    //       createdAt:"Fri Nov 20 2017 22:24:22 GMT+0200 (Eastern European Standard Time)",
    //       _id:"A12345678901"
    //     }
    //   ]
    // );

    this.context.actions.onLoad(
      [
        {title:'AATitle TEst',
          author:'AAAAuthor Test',
          body:'AAAbody TEST',
          createdAt:"Fri Nov 20 2017 22:24:22 GMT+0200 (Eastern European Standard Time)",
          _id:"A12345678901"
        }
      ]
    );

    // console.log(value.actions.onLoad);
    // value.actions.onLoad();
    // const { onLoad } = this.props;
    // const onLoadz = value.actions.getArticles;
    // axios('http://localhost:8000/api/articles')
    //   .then((res) => onLoad(res.data))
    //   .catch(onLoadz);
  }

  handleDelete(id) {
    const { onDelete } = this.props;

    return axios.delete(`http://localhost:8000/api/articles/${id}`)
      .then(() => onDelete(id));
  }

  handleEdit(article) {
    const { setEdit } = this.props;

    setEdit(article);
  }

  render() {
    // const { articles } = this.props;

    return (
      <Consumer>
        {context => {
          // const context = Consumer;
          console.log(context);
          return (
            <div className="container">
            <div className="row pt-5">
              <div className="col-12 col-lg-6 offset-lg-3">
                <h1 className="text-center">LightBlog</h1>
              </div>
              <Form />
            </div>
            <div className="row pt-5">
              <div className="col-12 col-lg-6 offset-lg-3">
                {context.state.articles.map((article) => {
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
// const mapStateToProps = state => ( {
//   articles: state.home.articles,
// });


// const mapDispatchToProps = dispatch => ({
//   onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
//   onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
//   setEdit: article => dispatch({ type: 'SET_EDIT', article }),
// });

export default Home;