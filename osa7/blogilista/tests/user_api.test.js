const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const User = require('../models/user');

describe('api', () => {
	test('cannot add users with same username', async () => {
		const user1 = {
			name: 'Pera',
			username: 'batman',
			password: 'salasana'
		};

		const user2 = {
			name: 'Matti',
			username: 'batman',
			password: 'salasana'
		};

		await api
			.post('/api/users')
			.send(user1)
			.expect(201);

		const response = await api
			.post('/api/users')
			.send(user2)
			.expect(400);

		expect(response.body.error).toContain('already in use');
	});
});

beforeAll(async () => {
	await User.remove({});
});

afterAll(() => {
	server.close();
});
