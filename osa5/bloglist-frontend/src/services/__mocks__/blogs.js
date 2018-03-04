let token = null

const blogs = [
{

	"id": "5a92fae4ad8dfc7199075c40",
    "title": "Peran blogi",
    "author": "Pera",
    "url": "www.fi",
    "likes": 11,
    "user": {
        "username": "pera",
        "name": "Pera"
    }
},
{
    "id": "5a9981be812a73024324aeeb",
    "title": "aaa",
    "author": "bbb",
    "url": "ccc",
    "likes": 0,
    "user": {
        "username": "pera",
        "name": "Pera"
    }
}
];

const getAll = () => {
	return Promise.resolve(blogs);
};

const setToken = (token) => {
	
};

export default { getAll, setToken, blogs }
