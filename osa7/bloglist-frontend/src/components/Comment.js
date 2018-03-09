import React from 'react';
import { connect } from 'react-redux';
import { commentBlog } from '../reducers/blogsReducer';
import { notify } from '../reducers/notificationReducer';

class Comment extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		};
	}

	onSubmit = (e) => {
		e.preventDefault();

		const text = this.state.text;

		this.props.commentBlog(this.props.blog.id, text);

		this.setState({text: ''});

		this.props.notify(`comment added: ${text}`, 5);
	}

	onChange = (e) => {
		this.setState({text: e.target.value});
	}

	render() {
		return <div>
			<h2>comments</h2>

			{this.props.blog.comments.map(comment =>
				<div key={comment._id}>{comment.text}</div>
			)}

			<form onSubmit={this.onSubmit}>
				<div>
					<input type="text" name="text" value={this.state.text} onChange={this.onChange} />
				</div>
				<div>
					<button type="submit">add comment</button>
				</div>
			</form>
		</div>
	}
}

const ConnectedComment =
	connect(
		null,
		{ commentBlog, notify }
	)(Comment);

export default ConnectedComment;