const listHelper = require('../utils/list_helper');

const blogs = require('./data.json');

const listWithOneBlog = [
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	}
];

describe('total likes', () => {
	test('of empty list is zero', () => {
		expect(listHelper.totalLikes([])).toBe(0);
	});

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});
});

describe('favorite blog', () => {
	test('is found correctly', () => {
		expect(listHelper.favoriteBlog(blogs)).toHaveProperty('_id', '5a422b3a1b54a676234d17f9');
	});
});

describe('most blogs', () => {
	test('is found correctly', () => {
		const most = listHelper.mostBlogs(blogs);

		expect(most).toEqual({author: 'Robert C. Martin', blogs: 3});
	});
});

describe('most likes', () => {
	test('is found correctly', () => {
		const most = listHelper.mostLikes(blogs);

		expect(most).toEqual({author: 'Edsger W. Dijkstra', likes: 17});
	});
});