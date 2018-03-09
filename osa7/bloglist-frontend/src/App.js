import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import Blog from './components/Blog';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Userlist from './components/Userlist';
import Menu from './components/Menu';
import User from './components/User';
import { notify } from './reducers/notificationReducer';
import { initBlogs, createBlog, deleteBlog, updateBlog } from './reducers/blogsReducer';
import { initUsers } from './reducers/usersReducer';
import { loadLoggedInUser, login, logout } from './reducers/loginReducer';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			blogTitle: '',
			blogAuthor: '',
			blogUrl: ''
		};
	}

	componentDidMount() {
		this.props.initBlogs();
		this.props.initUsers();
		this.props.loadLoggedInUser();
	}

	login = async (e) => {
		e.preventDefault();

		try {
			this.props.login(this.state.username, this.state.password);
			this.setState({ username: '', password: ''})
		} catch(exception) {
			this.props.notify('username or password is wrong', 5);
		}
	}

	logout = (e) => {
		e.preventDefault();

		this.props.logout();
	}

	handleFormFieldChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	}

	createBlog = async (e) => {
		e.preventDefault();

		const blog = {
			title: this.state.blogTitle,
			author: this.state.blogAuthor,
			url: this.state.blogUrl
		};

		this.props.createBlog(blog);

		this.setState({
			blogTitle: '',
			blogAuthor: '',
			blogUrl: ''
		});

		this.props.notify(`a new blog '${blog.title}' by ${blog.author} added`, 5);
	}

	likeBlog = async (blog) => {
		this.props.updateBlog(blog.id, {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes + 1,
			user: blog.user._id
		});
	}

	deleteBlog = async (blog) => {
		if(window.confirm('delete?')) {
			this.props.deleteBlog(blog.id);
		}
	}

	render() {
		if(this.props.user === null) {
			return <div className='container'>
				<Notification />

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
			const blogs = this.props.blogs;

			return (
				<div className='container'>
					<Router>
						<div>
							<Notification />

							<Menu />

							<div>
								logged in: {this.props.user.name}
								<form onSubmit={this.logout}>
									<button type="submit">logout</button>
								</form>
							</div>

							<Route exact path='/' render={() =>
								<div>
									<h2>blogs</h2>
									<ListGroup>
										{blogs.map(blog =>
											<ListGroupItem key={blog.id}>
												<Blog user={this.props.user} blog={blog.id} deleteBlog={this.deleteBlog} likeBlog={this.likeBlog} />
											</ListGroupItem>
										)}
									</ListGroup>

									<BlogForm
										onSubmit={this.createBlog}
										blogTitle={this.state.blogTitle}
										blogAuthor={this.state.blogAuthor}
										blogUrl={this.state.blogUrl}
										onChange={this.handleFormFieldChange} />
								</div>
							} />
							<Route exact path='/users' render={() =>
								<div>
									<h2>Users</h2>

									<Userlist />
								</div>
							} />
							<Route exact path='/users/:id' render={({match}) =>
								<User user={match.params.id} />
							} />
							<Route exact path='/blogs/:id' render={({match}) =>
								<Blog open={true} user={this.props.user} blog={match.params.id} deleteBlog={this.deleteBlog} likeBlog={this.likeBlog} />
							} />
						</div>
					</Router>
				</div>
			);
		}
	}
}

const blogsToShow = (blogs) => {
	return blogs.sort((a, b) => {
		return b.likes - a.likes;
	});
}

const mapStateToProps = (state) => {
	return {
		blogs: blogsToShow(state.blogs),
		user: state.loggedIn
	}
};

const ConnectedApp =
	connect(
		mapStateToProps,
		{ notify, initBlogs, createBlog, deleteBlog, updateBlog, initUsers, loadLoggedInUser, login, logout }
	)(App);

export default ConnectedApp;