import React from "react";
import useWordGame from "./hooks/useWordGame";

function App() {
	const {
		inputRef,
		isTimeRunning,
		handleChange,
		text,
		timeRemaining,
		startGame,
		wordCount,
	} = useWordGame(15); // 15 second for overall game 

	return (
		<div>
			<h1>How fast can you type?</h1>
			<textarea
				ref={inputRef}
				disabled={!isTimeRunning}
				onChange={handleChange}
				value={text}
			/>
			<h4>Time remaining: {timeRemaining}</h4>
			<button disabled={isTimeRunning} onClick={startGame}>
				Start
			</button>
			<h1>Word count: {wordCount}</h1>
		</div>
	);
}

export default App;
