import React, { useState } from 'react';
import Country from './Country';

const Countries = ({ countries }) => {
	const [show, setShow] = useState({});

	const handleClick = e => setShow({ ...show, [e.target.value]: 1 });
	if (countries.length === 1) {
		return (
			<div>
				{countries.map(country => <Country key={country.alpha3Code} {...country}/>)}
			</div>
		)
	}
	return (
		<div>
			{countries.map(country => (
				<div key={country.alpha3Code}>
					{show[country.alpha3Code] ? (
						<Country {...country} />
					) : (							
						<>
							{country.name}
							<button onClick={handleClick} value={country.alpha3Code}>show</button>
						</>
					)}
				</div>
			))}
		</div>
	)
}

export default Countries