import axios from 'axios'

const baseUrl = 'https://restcountries.eu/rest/v2';

const byName = (name) => {
	name = name.toLowerCase();

	return axios.get(`${baseUrl}/all`)
		.then(response => response.data)
		.then(response => response.filter(country => country.name.toLowerCase().indexOf(name) !== -1))
}

export default { byName }