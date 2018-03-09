import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

describe.only('<Blog />', () => {
	it('renders only title and author', () => {
		const blog = {
			title: 'aaa',
			author: 'bbb',
			url: 'ccc',
			likes: 10
		};

		const blogComponent = shallow(
			<Blog
				blog={blog}
			/>
		);

		const content = blogComponent.find('div > div');
		const text = content.text();

		expect(text).toContain(blog.title);
		expect(text).toContain(blog.author);
		expect(text).not.toContain(blog.url);
		expect(text).not.toContain(blog.likes);
	});

	it('renders all when open', () => {
		const blog = {
			title: 'aaa',
			author: 'bbb',
			url: 'ccc',
			likes: 10,
			open: false,
			user: {
				username: 'matti'
			}
		};

		const user = {
			username: 'pera'
		};

		let blogComponent = shallow(
			<Blog
				blog={blog}
				onClick={blog => {blog.open=true;}}
			/>
		);

		const link = blogComponent.find('a');
		link.simulate('click');

		// jostain syystä ei päivity
		//blogComponent.update();

		blogComponent = shallow(
			<Blog
				blog={blog}
				onClick={blog => {blog.open=true;}}
				user={user}
			/>
		);

		const text = blogComponent.html();

		expect(text).toContain(blog.title);
		expect(text).toContain(blog.author);
		expect(text).toContain(blog.url);
		expect(text).toContain(blog.likes);
	});
});