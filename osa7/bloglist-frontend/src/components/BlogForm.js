import React from 'react'

const BlogForm = ({onSubmit, blogTitle, blogAuthor, blogUrl, onChange}) => (
	<div>
		<h2>create new</h2>
		<form onSubmit={onSubmit}>
			<div className='form-group row'>
				<label htmlFor='blogTitle' className='col-sm-2 col-form-label'>title:</label>
				<div className='col-sm-10'>
					<input id='blogTitle' type="text" name="blogTitle" value={blogTitle} onChange={onChange} />
				</div>
			</div>
			<div className='form-group row'>
				<label htmlFor='blogAuthor' className='col-sm-2 col-form-label'>author:</label>
				<div className='col-sm-10'>
					<input id='blogAuthor' type="text" name="blogAuthor" value={blogAuthor} onChange={onChange} />
				</div>
			</div>
			<div className='form-group row'>
				<label htmlFor='blogUrl' className='col-sm-2 col-form-label'>url:</label>
				<div className='col-sm-10'>
					<input id='blogUrl' type="text" name="blogUrl" value={blogUrl} onChange={onChange} />
				</div>
			</div>
			<div>
				<button type="submit">create</button>
			</div>
		</form>
	</div>
)

export default BlogForm