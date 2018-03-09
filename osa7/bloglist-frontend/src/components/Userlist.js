import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Userlist extends React.Component {
	render() {
		return <table>
			<thead>
				<tr>
					<th>name</th>
					<th>blogs added</th>
				</tr>
			</thead>
			<tbody>
				{ this.props.users.map(user =>
					<tr key={user.id} >
						<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
						<td>{user.blogs.length}</td>
					</tr>
				) }
			</tbody>
		</table>
	}
}


const mapStateToProps = (state) => {
	return {
		users: state.users
	}
};

const ConnectedUserlist =
	connect(
		mapStateToProps
	)(Userlist);

export default ConnectedUserlist;