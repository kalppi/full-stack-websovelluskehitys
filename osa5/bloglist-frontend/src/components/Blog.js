import React from 'react';

const blogStyle = {
	paddingTop: 10,
	paddingLeft: 2,
	border: 'solid',
	borderWidth: 1,
	marginBottom: 5
};

const Blog = ({user, blog, onClick, likeBlog, deleteBlog}) => {
	if(blog.open) {
		const showDelete = blog.user.username === user.username || !blog.user

		return <div style={blogStyle}>
			<div>
				<a onClick={() => onClick(blog)}>{blog.title}: {blog.author}</a>

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
			</div>
		</div>
	} else {
		return <div>
			<div>
				<a onClick={() => onClick(blog)}>{blog.title} {blog.author}</a>
			</div>
		</div>
	}
}

export default Blog