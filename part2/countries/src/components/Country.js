import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getWeather = name => {
	const secretKey = process.env.REACT_APP_SECRET_KEY;
	return axios.get(`http://api.weatherstack.com/current?access_key=${secretKey}&query=${name}`)
}

const Country = ({ name, capital, population, languages, flag }) => {
	const [weather, setWeather] = useState(null)

	useEffect(() => {
		getWeather(name).then(res => {
			console.log('whats the data', res.data);
			setWeather(res.data)
		})
	}, [])
	return (
		<div>
			<h2>{name}</h2>
			<div>capital {capital}</div>
			<div>population {population}</div>
			<h3>languages</h3>
			<ul>
				{languages.map(language => <li key={language.name}>{language.name}</li>)}
			</ul>
			<div><img src={flag} /></div>
			{weather && (
				<div>
					<div>temperature: {weather.current.temperature}</div>
					<div>
						<img src={weather.current.weather_icons[0]}/>
					</div>
					<div>
						wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}
					</div>
				</div>
			)}
		</div>
	)
};

export default Country;