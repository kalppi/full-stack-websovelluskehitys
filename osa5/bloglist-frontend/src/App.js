import React from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			blogs: [],
			username: '',
			password: '',
			user: null,
			blogTitle: '',
			blogAuthor: '',
			blogUrl: '',
			message: null
		};
	}

	componentDidMount() {
		blogService.getAll().then(blogs =>
			this.setState({ blogs })
		);

		const userJSON = window.localStorage.getItem('user');
		
		if(userJSON) {
			const user = JSON.parse(userJSON);
			this.setState({user});
			blogService.setToken(user.token);
		}
	}

	login = async (e) => {
		e.preventDefault();

		try{
			const user = await loginService.login({
				username: this.state.username,
				password: this.state.password
			})

			window.localStorage.setItem('user', JSON.stringify(user));
			blogService.setToken(user.token);

			this.setState({ username: '', password: '', user})
		} catch(exception) {
			this.flashMessage('käyttäjätunnus tai salasana virheellinen');
		}
	}

	flashMessage(msg) {
		this.setState({
			message: msg
		})

		setTimeout(() => {
			this.setState({ message: null })
		}, 5000)
	}

	logout = (e) => {
		e.preventDefault();

		window.localStorage.removeItem('user');
		this.setState({user: null});
	}

	handleFormFieldChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	createBlog = async (e) => {
		e.preventDefault();

		const blog = await blogService.create({
			title: this.state.blogTitle,
			author: this.state.blogAuthor,
			url: this.state.blogUrl
		});

		console.log(blog)

		const blogs = this.state.blogs;
		blogs.push(blog);

		this.setState({
			blogTitle: '',
			blogAuthor: '',
			blogUrl: '',
			blogs: blogs
		});

		this.flashMessage(`a new blog '${blog.title}' by ${blog.author} added`);
	}

	onBlogClick = (blog) => {
		blog.open = (!blog.open ? true : false);

		this.setState(this.state);
	}

	likeBlog = async (blog) => {
		await blogService.update(blog.id, {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
			user: blog.user._id
		});

		blog.likes++;
		this.setState(this.state);
	}

	deleteBlog = async (blog) => {
		if(window.confirm('delete?')) {
			await blogService.delete(blog.id);

			const blogs = this.state.blogs.filter(b => b.id !== blog.id);

			this.setState({blogs});
		}
	}

	render() {
		if(this.state.user === null) {
			return <div>
				<Notification message={this.state.message} />
				
				<Togglable buttonLabel='login'>
					<Login
						onSubmit={this.login}
						username={this.state.username}
						password={this.state.password}
						onChange={this.handleFormFieldChange}
					/>
				</Togglable>
			</div>
		} else {
			const blogs = this.state.blogs;

			blogs.sort((a, b) => {
				return b.likes - a.likes;
			});

			return (
				<div>
					<Notification message={this.state.message} />

					<div>
						logged in: {this.state.user.name}
						<form onSubmit={this.logout}>
							<button type="submit">logout</button>
						</form>
					</div>

					<h2>blogs</h2>
					{blogs.map(blog => 
						<Blog user={this.state.user} key={blog.id} blog={blog} deleteBlog={this.deleteBlog} likeBlog={this.likeBlog} onClick={this.onBlogClick}/>
					)}

					<BlogForm
						onSubmit={this.createBlog}
						blogTitle={this.state.blogTitle}
						blogAuthor={this.state.blogAuthor}
						blogUrl={this.state.blogUrl}
						onChange={this.handleFormFieldChange} />
				</div>
			);
		}
	}
}

export default App;
