import React from 'react'

const BlogForm = ({onSubmit, blogTitle, blogAuthor, blogUrl, onChange}) => (
	<div>
		<h2>create new</h2>
		<form onSubmit={onSubmit}>
			<div>
				title:
				<input type="text" name="blogTitle" value={blogTitle} onChange={onChange} />
			</div>
			<div>
				author:
				<input type="text" name="blogAuthor" value={blogAuthor} onChange={onChange} />
			</div>
			<div>
				url:
				<input type="text" name="blogUrl" value={blogUrl} onChange={onChange} />
			</div>
			<div>
				<button type="submit">create</button>
			</div>
		</form>
	</div>
)

export default BlogForm