import React from 'react';
import { connect } from 'react-redux';

class User extends React.Component {
	render() {
		if(this.props.user) {
			return <div>
				<h2>{this.props.user.name}</h2>
				<h3>Added blogs</h3>
				<ul>
					{ this.props.user.blogs.map(blog =>
						<li key={blog._id}>{blog.title}</li>
					) }
				</ul>
			</div>
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		user: state.users.find(user => user.id === ownProps.user)
	}
};

const ConnectedUser =
	connect(
		mapStateToProps
	)(User);

export default ConnectedUser;