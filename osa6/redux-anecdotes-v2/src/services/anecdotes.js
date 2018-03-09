import axios from 'axios'

const base = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(base);
  return response.data;
};

const create = async (newObject) => {
	const response = await axios.post(base, newObject);
	return response.data;
};

const update = async (id, newObject) => {
	const response = await axios.put(`${base}/${id}`, newObject);
	return response.data;
}

export default { getAll, create, update }
