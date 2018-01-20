import React from 'react';

const Search = ({value, onChange}) => {
	return <div>
		Find countries: <input type="text" value={value} onChange={onChange} />
	</div>
}

export default Search;