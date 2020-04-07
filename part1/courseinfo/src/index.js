import React from "react";
import ReactDOM from "react-dom";

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Header = ({ course }) => (
	<h1>{course}</h1>
)

const Content = ({ parts }) => parts.map((c, i) => <Part key={i} {...c} />);

const Total = ({ parts }) => (
	<p>Number of exercises {parts.reduce((prev, next) => prev + next.exercises, 0)}</p>
)

const App = () => {
	const course = "Half Stack application development";
	const part1 = "Fundamentals of React";
	const exercises1 = 10;
	const part2 = "Using props to pass data";
	const exercises2 = 7;
	const part3 = "State of a component";
	const exercises3 = 14;

	const parts = [
    { name: part1, exercises: exercises1 },
    { name: part2, exercises: exercises2 },
    { name: part3, exercises: exercises3 },
  ];
	
	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total parts={parts} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
