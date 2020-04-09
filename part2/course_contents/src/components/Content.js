import React from 'react';
import Part from './Part';

const Content = ({ course }) => {
	const { parts } = course;
	const sum = parts.reduce((total, part) => total + part.exercises, 0);
	return (
		<div>
			<div>
				{parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
			</div>
			<div>
				total of {sum} exercises
			</div>
		</div>
	)
}

export default Content;