import React, { Component } from 'react';
// reduxForm is very similar to the 'connect' helper in react-redux
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
	renderField(field) {
		return (
			<div className="form-group">
				<label>{field.label}</label>
				<input className="form-control" type="text" {...field.input} />
				{field.meta.error}
			</div>
		);
	}

	onSubmit(values) {
		console.log(values);
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
})(PostsNew);
