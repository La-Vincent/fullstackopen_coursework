import React from 'react';
import '../index.css';

const Notification = ({ type, message }) => {

	const customClass = type === 'error' ? 'error-notification' : 'success-notification'

	return (
		<div className={`notification ${customClass}`}>
			<h3>{message}</h3>
		</div>
	)

}

export default Notification;