import React from 'react';

const Persons = ({ persons, filter, handleDelete }) => (
	<div>
		{persons.filter(person => {
			const { name } = person;
			return name.toLowerCase().includes(filter.toLowerCase())
		}).map(p => (
			<div key={p.id}>
				<span>{p.name} {p.number}</span>
				<button onClick={() => handleDelete(p)}>delete</button>
			</div>
			))}
	</div>
)

export default Persons