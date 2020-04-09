import React from 'react';

const Header = ({ course }) => {
	const { name } = course;
	return (
		<h2>{name}</h2>
	)
}

export default Header;