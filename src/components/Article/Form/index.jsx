import axios from 'axios';
import React from 'react';
import { Consumer, AppContext } from '../../Context'
class Form extends React.Component {

  state = {
    title: '',
    body: '',
    author: '',
    articleToEdit:undefined
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.props.articleToEdit && this.props.articleToEdit !== prevProps.articleToEdit) {
      console.log('componentDidUpdate')
      this.setState({
        title: this.props.articleToEdit.title,
        body: this.props.articleToEdit.body,
        author: this.props.articleToEdit.author,
        articleToEdit:this.props.articleToEdit
      })
    }
  }

  handleSubmit = ()=> {
    console.log('submitting article');
    const onSubmit = this.context.actions.submitArticle;
    const onEdit = this.context.actions.editArticle;
    const { title, body, author } = this.state;

    if(!this.state.articleToEdit) {
      return axios.post('http://localhost:8000/api/articles', {
        title,
        body,
        author,
      })
        .then((res) => onSubmit(res.data))
        .then(() => this.setState({ title: '', body: '', author: '' }));
    } else {
      return axios.patch(`http://localhost:8000/api/articles/${this.state.articleToEdit._id}`, {
        title,
        body,
        author,
      })
        .then((res) => onEdit(res.data))
        .then(() => this.setState({ title: '', body: '', author: '' }));
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { articleToEdit } = this.props;
    const { title, body, author } = this.state;

    return (
      <Consumer>
        {context=> { return (
          <div className="col-12 col-lg-6 offset-lg-3">
            <input
              onChange={(ev) => this.handleChangeField('title', ev)}
              value={title}
              className="form-control my-3"
              placeholder="Article Title"
            />
            <textarea
              onChange={(ev) => this.handleChangeField('body', ev)}
              className="form-control my-3"
              placeholder="Article Body"
              value={body}>
            </textarea>
            <input
              onChange={(ev) => this.handleChangeField('author', ev)}
              value={author}
              className="form-control my-3"
              placeholder="Article Author"
            />
            <button onClick={this.handleSubmit} className="btn btn-primary float-right">{articleToEdit ? 'Update' : 'Submit'}</button>
          </div>
          )}
        }
      </Consumer>
    )
  }
}
Form.contextType = AppContext;

export default Form;