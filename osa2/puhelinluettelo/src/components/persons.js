import React from 'react';

const confirmDelete = (name, id, del) => {
	const r = window.confirm(`Poistetaanko ${name}?`);

	if(r) {
		del(id, name);
	}
}

const Persons = ({persons, filter, del}) => {
	filter = filter.toLowerCase();

	const personsToShow = filter.length > 0 ?
		persons.filter(p => p.name.toLowerCase().indexOf(filter) !== -1)
		: persons;

	return <table>
		<tbody>
			{personsToShow.map(p => {
				return <tr key={p.id}>
					<td>{p.name}</td>
					<td>{p.number}</td>
					<td><button onClick={confirmDelete.bind(null, p.name, p.id, del)}>poista</button></td>
				</tr>
			})}
	</tbody>
	</table>
}

export default Persons;