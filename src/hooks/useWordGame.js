import { useState, useEffect, useRef } from "react";

function useWordGame(startingTime = 10) {
	const [text, setText] = useState("");
	const [timeRemaining, setTimeRemaining] = useState(startingTime);
	const [isTimeRunning, setTimeRunning] = useState(false);
	const [wordCount, setWordCount] = useState(0);
	const inputRef = useRef(null);

	function startGame() {
		setText("");
		setTimeRemaining(startingTime);
		setWordCount(0);
		setTimeRunning(true);
		inputRef.current.disabled = false; //fix async issue
		inputRef.current.focus();
	}

	function endGame() {
		setTimeRunning(false);
		setWordCount(calculateWordCount(text));
	}

	function handleChange(event) {
		const { value } = event.target;
		setText(value);
	}

	function calculateWordCount(textIn) {
		//trim removes white space
		const wordsArr = textIn.trim().split(" ");
		//remove words that are blank
		return wordsArr.filter((word) => word !== "").length;
	}

	useEffect(() => {
		//if game is running count down the timer
		if (timeRemaining > 0 && isTimeRunning) {
			setTimeout(() => {
				setTimeRemaining((time) => time - 1);
			}, 1000);
		} else if (timeRemaining === 0) {
			endGame();
		}
		//track time updates
	}, [timeRemaining, isTimeRunning]);

	return {
		inputRef,
		isTimeRunning,
		handleChange,
		text,
		timeRemaining,
		startGame,
		wordCount,
	};
}

export default useWordGame;
