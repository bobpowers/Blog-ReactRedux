import React, { Component } from 'react';
// reduxForm is very similar to the 'connect' helper in react-redux
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
	renderField(field) {
		//this helps us not have to type 'field.meta...' every time this is 'Destructuring'
		//additionally you can go further down the chain and grab touched and error
		//off of the meta tag so you dont need to reference that every time as well
		const {
			meta: { touched, error }
		} = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type="text" {...field.input} />
				<div className="text-help">{touched ? error : ''}</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		//handleSubmit is being passed to the props from the code at the bottom of the page 'reduxForm'
		const { handleSubmit } = this.props;
		return (
			//the user submits- then reduxForm runs 'handleSubmit' and if the form is valid it will call 'onSubmit' and you are binding the context because it is passing a callback outside of its context
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label="Title For Post"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				<Link to="/" className="btn btn-danger">
					Cancel
				</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	// Validate the inputs from 'values'
	if (!values.title) {
		errors.title = 'Enter a title!';
	}
	if (!values.categories) {
		errors.categories = 'Enter some categories!';
	}
	if (!values.content) {
		errors.content = 'Enter some content please!';
	}

	//if effors is empty, the form is fine to submit
	//if errors has any properties, redux assumes for is invalid
	return errors;
}

//reduxForm is responsible for the state and validation of the form. not saving data or making a post request
export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(connect(null, { createPost })(PostsNew));
