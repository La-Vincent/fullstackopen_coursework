import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];


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
	const [anecdote, setAnecdote] = useState(0)
	const [points, setPoints] = useState({})
	// const [highestPoints, setHighestPoints] = useState(0);
	// const [highestAnecdote, setHighestAnecdote] = useState(null);

	const handleGoodClick = () => setGood(good + 1);
	const handleNeutralClick = () => setNeutral(neutral + 1);
	const handleBadClick = () => setBad(bad + 1);

	const handleAncedote = () => {
		const max = anecdotes.length - 1;
		setAnecdote(anecdote === max ? 0 : anecdote + 1);
	}

	const handleVote = () => {
		const newPoints = {
      ...points,
      [anecdote]: points[anecdote] ? points[anecdote] + 1 : 1,
    };
		setPoints(newPoints);
		computeMostVotedAnecdote(newPoints);
	}

	const computeMostVotedAnecdote = () => {
      let mostVoted = null;
      let topScore = 0;
      for (let anecdote in points) {
        const point = points[anecdote];
        if (point > topScore) {
          topScore = point;
          mostVoted = anecdote;
        }
      }
      if (!mostVoted) {
        return ["No top voted", 0];
	  }
		return [anecdotes[mostVoted], topScore];
	};
	
	const [mostVoted, topScore] = computeMostVotedAnecdote();

	return (
    <div>
      <h2>give feedback</h2>
      <Button title={"good"} handleClick={handleGoodClick} />
      <Button title={"neutral"} handleClick={handleNeutralClick} />
      <Button title={"bad"} handleClick={handleBadClick} />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[anecdote]}</div>
      <table>
        <tbody>
          <Statistic title={""} value={points[anecdote] || 0} />
        </tbody>
      </table>
      <div>
        <Button title={"vote"} handleClick={handleVote} />
        <Button title={"next anecdote"} handleClick={handleAncedote} />
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{mostVoted ? mostVoted : null}</div>
      <table>
        <tbody>
          <Statistic title={"has"} value={topScore} />
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
