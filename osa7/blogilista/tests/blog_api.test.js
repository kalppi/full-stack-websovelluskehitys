const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const { blogs, blogsInDb, randomBlog } = require('./test_helper');

let token;

const login = async (username, password) => {
	const response = await api
		.post('/api/login')
		.send({username, password});


	token = response.body.token;
};

describe('api', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('a valid blog can be added', async () => {
		const blogsBefore = await blogsInDb();

		const newBlog = {
			title: 'Peran kinkku-blogi',
			author: 'Pera',
			url: 'https://peran-kinkut.com/',
			likes: 33
		};

		await api
			.post('/api/blogs')
			.set('Authorization', 'Bearer ' + token)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsAfter = await blogsInDb();
		const titles = blogsAfter.map(r => r.title);

		expect(blogsAfter.length).toBe(blogsBefore.length + 1);
		expect(titles).toContainEqual('Peran kinkku-blogi');

	});

	test('likes are set to 0 if missing ', async () => {
		const newBlog = {
			title: 'Peran kinkku-blogi',
			author: 'Pera',
			url: 'https://peran-kinkut.com/',
			token: token
		};

		const response = await api
			.post('/api/blogs')
			.set('Authorization', 'Bearer ' + token)
			.send(newBlog);


		expect(response.body.likes).toBe(0);
	});

	test('reject blogs missing title or url', async () => {
		const newBlog = {
			'author': 'Pera',
			'url': 'https://peran-kinkut.com/'
		};

		await api
			.post('/api/blogs')
			.set('Authorization', 'Bearer ' + token)
			.send(newBlog)
			.expect(400);
	});

	test('delete works', async () => {
		const blogsBefore = await blogsInDb();
		const blog = await randomBlog();

		await api
			.delete('/api/blogs/' + blog.id)
			.set('Authorization', 'Bearer ' + token);

		const blogsAfter = await blogsInDb();

		expect(blogsAfter.length).toBe(blogsBefore.length - 1);
	});

	test('update works', async () => {
		let blog = await randomBlog();
		const likesBefore = blog.likes;

		blog.likes = blog.likes + 10;

		await api
			.put(`/api/blogs/${blog.id}`)
			.set('Authorization', 'Bearer ' + token)
			.send(blog);

		const response = await api.get(`/api/blogs/${blog.id}`);
		const likesAfter = response.body.likes;

		expect(likesAfter).toBe(likesBefore + 10);
	});
});

beforeAll(async () => {
	await Blog.remove({});
	await User.remove({});

	const res = await api.post('/api/users').send({
		name: 'Matti',
		username: 'mattipatti',
		password: 'salasana'
	});

	const blogObjects = blogs.map(blog => new Blog(blog));

	blogObjects.forEach(blog => {
		blog.user = res.body.id;
	});

	const promises = blogObjects.map(blog => blog.save());
	await Promise.all(promises);

	await login('mattipatti', 'salasana');
});

afterAll(() => {
	server.close();
});
