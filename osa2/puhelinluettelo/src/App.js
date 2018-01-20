import React from 'react';
import Persons from './components/persons';
import Notification from './components/notification';
import personService from './services/persons';

class App extends React.Component {
	constructor(props) {
		super(props)
			this.state = {
				persons: [

				],
				newName: '',
				newNumber: '',
				filter: '',
				note: '',
				noteType: ''
		}
	}

	componentWillMount() {
		personService.getAll().then(persons => {
			this.setState({ persons })
		});
	}

	flashNote(message, type = 'success') {
		this.setState({note: message, noteType: type});

		setTimeout(() => {
			this.setState({note: '', noteType: ''});
		}, 2000);
	}

	handleSubmit(e) {
		e.preventDefault();

		const newName = this.state.newName;
		const persons = this.state.persons;

		if(persons.find(p => p.name === newName)) {
			const r = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`);
		
			if(r) {
				const p = persons.find(p => p.name === newName);
				p.number = this.state.newNumber;

				personService.update(p.id, p).then(() => {
					this.setState({
						persons: persons,
						newName: '',
						newNumber: ''
					});

					this.flashNote('Numero korvattiin onnistuneesti');
				}, () => {
					personService.create(p).then(() => {
						this.setState({
							persons: persons,
							newName: '',
							newNumber: ''
						});

						this.flashNote(`Henkilöä '${newName} ei löytynyt, uusi henkilö luotiin`);
					});
				})
			}
		} else {
			const person = {
				name: newName,
				number: this.state.newNumber
			};

			personService.create(person).then(p => {
				persons.push(p);

				this.setState({
					persons: persons,
					newName: '',
					newNumber: ''
				});
			});

			this.flashNote(`Henkilö '${newName}' lisättiin onnistuneesti`);
		}
	}

	handleNameChange(e) {
		this.setState({newName: e.target.value})
	}

	handleNumberChange(e) {
		this.setState({newNumber: e.target.value})
	}

	handleFilterChange(e) {
		this.setState({filter: e.target.value})
	}

	delete(id, name) {
		personService.delete(id).then(() => {
			const persons = this.state.persons.filter(p => p.id !== id);
			this.setState({ persons });

			this.flashNote(`Henkilö '${name}' poistettiin onnistuneesti`);
		}, () => {
			this.flashNote(`Henkilön '${name}'' poistaminen ei onnistunut`, 'error');
		})
	}

	render() {
		return (
		<div>
			<h2>Puhelinluettelo</h2>
			<Notification message={this.state.note} type={this.state.noteType} />
			<div>
				rajaa näytettäviä <input value={this.state.filter} onChange={this.handleFilterChange.bind(this)} />
			</div>
			<h3>Lisää uusi</h3>
			<form onSubmit={this.handleSubmit.bind(this)}>
				<div>
					nimi:
						<input value={this.state.newName} onChange={this.handleNameChange.bind(this)} />
				</div>
				<div>
					numero:
						<input value={this.state.newNumber} onChange={this.handleNumberChange.bind(this)} />
				</div>
				<div>
					<button type="submit">lisää</button>
				</div>
			</form>
			<h2>Numerot</h2>
			<Persons persons={this.state.persons} filter={this.state.filter} del={this.delete.bind(this)} />
		</div>
		)
	}
}

export default App;
