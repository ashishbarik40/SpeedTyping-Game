import React, { useState, useEffect, useRef } from "react";
import { generate } from "random-words";
import "./Typing.css";

const NUMB_OF_WORDS = 100;
const SECONDS = 30;
var seconds = 0;

const Typing = () => {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [incorrectCharacters, setIncorrectCharacters] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const textInput = useRef(null);

  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  function generateWords() {
    return generate(NUMB_OF_WORDS);
  }

  function start() {
    if (status === "finished") {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
      setIncorrectCharacters(0);
      setTotalCharacters(0);
    }

    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus("finished");
            setCurrInput("");
            //seconds = SECONDS;
            return SECONDS;
          } else {
            seconds += 1;
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  }

  function handleKeyDown({ keyCode, key }) {
    if (keyCode === 32) {
      //   checkMatch();

      // calling function to count characters
      countCharacters();

      setCurrInput("");
      setCurrWordIndex((prevIndex) => prevIndex + 1);
      setCurrCharIndex(-1);
    } else if (keyCode === 8) {
      setCurrCharIndex((prevIndex) => Math.max(prevIndex - 1, -1));
      setCurrChar("");
    } else {
      // console.log(currCharIndex);

      setCurrCharIndex((prevIndex) => prevIndex + 1); // this will be updated at the end

      // console.log(currCharIndex);

      // const wordToCompare = words[currWordIndex];
      // console.log(wordToCompare[currCharIndex]+" "+key);

      // calling function to check key match
      checkKeyMatch(key);
      setCurrChar(key);
    }
  }

  // to count total characters
  function countCharacters() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();

    setTotalCharacters((prev) => prev + wordToCompare.length + 1);

    if (doesItMatch) {
      setCorrect((prevCorrect) => prevCorrect + 1);
    } else {
      setIncorrect((prevIncorrect) => prevIncorrect + 1);
    }

    // console.log(totalCharacters);
  }

  // to check key matching
  function checkKeyMatch(key) {
    const word = words[currWordIndex];
    // console.log(word[currCharIndex+1]+" "+key);

    // currCharIndex is not updated yet so checking with currCharIndex + 1

    if (word[currCharIndex + 1] !== key) {
      setIncorrectCharacters((prev) => prev + 1);
      console.log(incorrectCharacters);
    }
  }

  // function checkMatch() {
  //   const wordToCompare = words[currWordIndex];
  //   const doesItMatch = wordToCompare === currInput.trim();
  //   if (doesItMatch) {
  //     setCorrect((prevCorrect) => prevCorrect + 1);
  //   } else {
  //     setIncorrect((prevIncorrect) => prevIncorrect + 1);
  //   }
  // }
  function getCharClass(wordIdx, charIdx, char) {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      return char === currChar
        ? "has-background-success"
        : "has-background-danger";
    } else if (wordIdx < currWordIndex) {
      const word = words[wordIdx];
      if (charIdx < word.length) {
        const typedChar = currInput[wordIdx];
        return word[charIdx] === typedChar
          ? "has-background-success"
          : "has-background-completed";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "has-background-danger";
    }
    return "";
  }

  const typingArea = //To display the typing text box only when game started
    status === "started" ? (
      <input
        ref={textInput}
        type="text"
        className="input"
        onKeyDown={handleKeyDown}
        value={currInput}
        onChange={(e) => setCurrInput(e.target.value)}
      />
    ) : (
      ""
    );

  const Button = //To display start button only when game is not started
    status !== "started" ? (
      <button className="button is-info is-fullwidth" onClick={start}>
        Start
      </button>
    ) : (
      ""
    );

  const ContentBox = //To display the content box contaning paragraph only when game is going on
    status === "started" ? (
      <div className="section">
        <div className="card">
          <div className="card-content">
            <div className="content">
              {words.map((word, i) => (
                <span key={i}>
                  {word.split("").map((char, idx) => (
                    <span className={getCharClass(i, idx, char)} key={idx}>
                      {char}
                    </span>
                  ))}
                  <span> </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );

  return (
    <div className="SpeedTypingGame">
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <p>{countDown}</p>
          {status === "started" && (
            <span className="column has-text-centered">
              <p className="is-size-5">
                WPM:{seconds != 0 ? Math.floor((correct * 60) / seconds) : 0}
              </p>
            </span>
          )}
        </div>
        {ContentBox}
      </div>
      <div className="control is-expanded section">{typingArea}</div>
      <div className="section">{Button}</div>
      {status === "finished" && (
        <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <p className="is-size-5">Words per minute:</p>
              <p className="has-text-primary is-size-1">
                {(correct * 60) / SECONDS}
              </p>
            </div>
            <div className="column has-text-centered">
              <p className="is-size-5">Accuracy:</p>
              {correct !== 0 ? (
                <p className="has-text-info is-size-1">
                  {Math.round(
                    ((totalCharacters - incorrectCharacters) /
                      totalCharacters) *
                      100
                  )}
                  %
                </p>
              ) : (
                <p className="has-text-info is-size-1">0%</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Typing;
