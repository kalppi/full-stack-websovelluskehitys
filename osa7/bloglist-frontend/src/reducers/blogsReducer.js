import blogService from '../services/blogs';

const reducer = (store = [], action) => {
	switch(action.type) {
	case 'BLOGS_INIT':
		return action.data;
	case 'BLOGS_ADD':
		return [...store, action.data];
	case 'BLOGS_DELETE':
		return store.filter(s => s.id !== action.data.id);
	case 'BLOGS_UPDATE': {
		const without = store.filter(s => s.id !== action.data.id);
		return [...without, action.data.newBlog];
	}
	case 'BLOGS_COMMENT': {
		const blog = store.find(s => s.id === action.data.id);

		return [
			...store.filter(s => s.id !== action.data.id),
			{...blog, comments: blog.comments.concat(action.data.comment)}
		];
	}
	default:
		return store;
	}
};

export const initBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();

		dispatch({
			type: 'BLOGS_INIT',
			data: blogs
		});
	};
};

export const createBlog = (data) => {
	return async (dispatch) => {
		const blog = await blogService.create(data);

		dispatch({
			type: 'BLOGS_ADD',
			data: blog
		});
	}
};

export const updateBlog = (id, data) => {
	return async (dispatch) => {
		const newBlog = await blogService.update(id, data);

		dispatch({
			type: 'BLOGS_UPDATE',
			data: { id, newBlog: { ...newBlog, likes: newBlog.likes + 1 } }
		});
	}
};

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogService.delete(id);

		dispatch({
			type: 'BLOGS_DELETE',
			data: { id }
		});
	}
};

export const commentBlog = (id, text) => {
	return async (dispatch) => {
		const comment = await blogService.comment(id, text);

		dispatch({
			type: 'BLOGS_COMMENT',
			data: {
				id, comment
			}
		});
	}
};

export default reducer;