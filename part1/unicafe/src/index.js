import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ title, handleClick }) => (
  <button onClick={handleClick}>{title}</button>
);

const Statistic = ({ title, value }) => (
  <tr>
    <td>{title}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral }) => {
	const hasScores = good || bad || neutral
	if (!hasScores) {
		return (
			<p>No feedback given</p>
		)
	}

	const total = good + bad + neutral;
	const average = (good - bad) / total || 0;
	const positive = `${good / total || 0}%`;
	return (
		<div>
			<table>
				<tbody>
				<Statistic title={'good'} value={good} />
				<Statistic title={'neutral'} value={neutral} />
				<Statistic title={'bad'} value={bad} />
				<Statistic title={'all'} value={total} />
				<Statistic title={'average'} value={average} />
				<Statistic title={'positive'} value={positive}/>
				</tbody>
			</table>
    	</div>
  );
}

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGoodClick = () => setGood(good + 1);
	const handleNeutralClick = () => setNeutral(neutral + 1);
	const handleBadClick = () => setBad(bad + 1);

	return (
    <div>
      <h2>give feedback</h2>
      <Button title={"good"} handleClick={handleGoodClick} />
      <Button title={"neutral"} handleClick={handleNeutralClick} />
      <Button title={"bad"} handleClick={handleBadClick} />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
