import React from 'react';
import { Link } from 'react-router-dom';

const style = {
	color: 'blue',
	marginRight: '10px'
};

class Menu extends React.Component {
	render() {
		return <div>
			<Link to='/' style={style}>blogs</Link>
			<Link to='/users' style={style}>users</Link>
		</div>;
	}
}

export default Menu;