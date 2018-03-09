import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Comment from './Comment';

const blogStyle = {
	paddingTop: 10,
	paddingLeft: 2,
	border: 'solid',
	borderWidth: 1,
	marginBottom: 5
};

const Blog = ({user, blog, likeBlog, deleteBlog, open}) => {
	if(!blog) return null;

	if(open) {
		const showDelete = blog.user.username === user.username || !blog.user;

		return <div style={blogStyle}>
			<div>
				<h2><Link to={`/blogs/${blog.id}`}>{blog.title}: {blog.author}</Link></h2>

				<div>
					<a href={blog.url}>{blog.url}</a>
				</div>
				<div>
					{blog.likes} likes
					<form onSubmit={(e) => {e.preventDefault(); likeBlog(blog)}}>
						<button type="submit">like</button>
					</form>
				</div>
				<div>
					added by {blog.user.name}
				</div>

				{showDelete &&
					<div>
						<form onSubmit={(e) => {e.preventDefault(); deleteBlog(blog)}}>
							<button type="submit">delete</button>
						</form>
					</div>
				}

				<Comment blog={blog} />
			</div>
		</div>
	} else {
		return <div>
			<div>
				<Link to={`/blogs/${blog.id}`}>{blog.title}: {blog.author}</Link>
			</div>
		</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		blog: state.blogs.find(blog => blog.id === ownProps.blog)
	}
};

const ConnectedBlog =
	connect(
		mapStateToProps
	)(Blog);

export default ConnectedBlog;