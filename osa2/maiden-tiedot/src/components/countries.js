import React from 'react';
import Country from './country';

const Countries = ({countries, viewCountry, onClick, onBackClick}) => {
	if(viewCountry) {
		return <div>
			<button onClick={onBackClick}>back</button>
			<Country country={viewCountry} compact={false} />
		</div>
	} else {
		return countries.map(country => {
			return <Country key={country.name} country={country} compact={countries.length > 1} onClick={onClick} />
		});
	}
}

export default Countries;