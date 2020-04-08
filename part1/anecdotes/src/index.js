import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ title, handleClick }) => (
  <button onClick={handleClick}>{title}</button>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});

  const handleAncedote = () => {
    const max = anecdotes.length - 1;
    setSelected(selected === max ? 0 : selected + 1);
  };

  const handleVote = () => {
    const newPoints = {
      ...points,
      [selected]: points[selected] ? points[selected] + 1 : 1,
    };
    setPoints(newPoints);
  };

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
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <p>{points[selected] || 0}</p>
      <div>
        <Button title={"vote"} handleClick={handleVote} />
        <Button title={"next anecdote"} handleClick={handleAncedote} />
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{mostVoted ? mostVoted : null}</div>
      <p>has {topScore}</p>
    </div>
  );
    
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
