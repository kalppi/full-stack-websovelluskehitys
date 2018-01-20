import React from 'react';

const Country = ({country, compact, onClick}) => {
	if(compact) {
		return <div onClick={() => onClick(country)}>
			{country.name}
		</div>
	} else {
		return <div>
			<h3>{country.name}</h3>
			<table>
				<tbody>
					<tr>
						<td>capital:</td><td>{country.capital}</td>
					</tr>
					<tr>
						<td>population:</td><td>{country.population}</td>
					</tr>
				</tbody>
			</table>
			<img src={country.flag} alt="" width="200" />
		</div>
	}
}

export default Country;