import React from 'react';
import { AppContext } from '../../Context'
class Form extends React.Component {

  state = {
    title: '',
    body: '',
    author: '',
    articleToEdit:undefined
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.props.articleToEdit && this.props.articleToEdit !== prevProps.articleToEdit) {
      // console.log('componentDidUpdate')
      this.setState({
        title: this.props.articleToEdit.title,
        body: this.props.articleToEdit.body,
        author: this.props.articleToEdit.author,
        articleToEdit:this.props.articleToEdit
      })
    }
  }

  handleSubmit = ()=> {
    // console.log('submitting article');
    const onSubmit = this.context.actions.submitNewArticle;
    const onEdit = this.context.actions.submitEditedArticle;
    const { title, body, author } = this.state;

    if(!this.state.articleToEdit) {
        return new Promise((resolve,reject)=>{
          resolve (onSubmit(title,body,author))
        })
        .then(() => this.setState({ title: '', body: '', author: '' }));
    } else {
      return new Promise((resolve,reject)=>{
        resolve(onEdit(title,body,author))
      })
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
Form.contextType = AppContext;

export default Form;