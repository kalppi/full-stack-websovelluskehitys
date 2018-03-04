import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBlog';

describe.only('<SimpleBlog />', () => {
	it('renders content', () => {
		const blog = {
			title: 'aaa',
			author: 'bbb',
			likes: 10
		};

		const mockHandler = jest.fn();

		const blogComponent = shallow(
			<SimpleBlog
				blog={blog}
				onClick={mockHandler}
			/>
		);
		const header = blogComponent.find('.header');
		const content = blogComponent.find('.content');

		expect(header.text()).toContain(blog.title);
		expect(header.text()).toContain(blog.author);
		expect(content.text()).toContain(blog.likes);

		const button = blogComponent.find('button');
		button.simulate('click');
		button.simulate('click');

		expect(mockHandler.mock.calls.length).toBe(2);
	});
});