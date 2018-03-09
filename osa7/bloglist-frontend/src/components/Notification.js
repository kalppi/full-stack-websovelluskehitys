import React from 'react';
import { connect} from 'react-redux';

class Notification extends React.Component {
	render() {
		return (
			<div>
				{ this.props.notification }
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
};

const ConnectedNotification = connect(
	mapStateToProps
)(Notification);

export default ConnectedNotification;