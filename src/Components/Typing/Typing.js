import React, { useState, useEffect, useRef } from "react";
import { generate } from "random-words";
import styles from "./Typing.module.css"

const NUMB_OF_WORDS = 100;
const SECONDS = 30;

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
  const [seconds,setSeconds] = useState(0);
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
      setSeconds(0);
    }

    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            setSeconds((sec) => sec+1);
            clearInterval(interval);
            setStatus("finished");
            setCurrInput("");
            return SECONDS;
          } else {
            setSeconds((sec) => sec+1);
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
      if(currInput.trim().length !== wordToCompare.length){
        setIncorrectCharacters((prev) => prev + (wordToCompare.length-currInput.trim().length));
      }
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
        ? "hasBackgroundSuccess"
        : "hasBackgroundDanger";
    } else if (wordIdx < currWordIndex) {
      const word = words[wordIdx];
      if (charIdx < word.length) {
        const typedChar = currInput[wordIdx];
        return word[charIdx] === typedChar
          ? "hasBackgroundSuccess"
          : "hasBackgroundCompleted";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "hasBackgroundDanger";
    }
    return "";
  }

  const typingArea = //To display the typing text box only when game started
    status === "started" ? (
      <input
        ref={textInput}
        type="text"
        className={styles.input}
        onKeyDown={handleKeyDown}
        value={currInput}
        onChange={(e) => setCurrInput(e.target.value)}
      />
    ) : (
      ""
    );

  const Button = //To display start button only when game is not started
    status !== "started" ? (
      <button className={`${styles.button} ${styles.isInfo} ${styles.isFullwidth}`} onClick={start}>
        Start
      </button>
    ) : (
      ""
    );

  const ContentBox = //To display the content box contaning paragraph only when game is going on
    status === "started" ? (
      <div className={styles.section}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <div className={styles.content}>
              {words.map((word, i) => (
                <span key={i}>
                  {word.split("").map((char, idx) => (
                    <span className={styles[getCharClass(i, idx, char)]} key={idx}>
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
    <div className={styles.typingBody}>
    <div className={styles.App}>
      <div className={styles.section}>
        <div className={`${styles.isSize1} ${styles.hasTextCentered} ${styles.hasTextPrimary}`}>
          <p>{countDown}</p>
          {status === "started" && (
            <span className={` ${styles.column} ${styles.hasTextCentered}`}>
              <p className={styles.isSize5}>
                WPM:{seconds !== 0 ? Math.round((correct * 60) / (SECONDS-countDown)) : 0}
              </p>
            </span>
          )}
        </div>
        {ContentBox}
      </div>
      <div className={`${styles.control} ${styles.isExpanded} ${styles.section}`}>{typingArea}</div>
      <div className={styles.section}>{Button}</div>
      {status === "finished" && (
        <div className={styles.section}>
          <div className={styles.columns}>
            <div className={`${styles.column} ${styles.hasTextCentered}`}>
              <p className={styles.isSize5}>Words per minute:</p>
              <p className={`${styles.hasTextPrimary} ${styles.isSize1}`}>
                {(correct * 60) / SECONDS}
              </p>
            </div>
            <div className={`${styles.column} ${styles.hasTextCentered}`}>
              <p className={styles.isSize5}>Accuracy:</p>
              {correct !== 0 ? (
                <p className={`${styles.hasTextInfo} ${styles.isSize1}`}>
                  {Math.round(
                    ((totalCharacters - incorrectCharacters) /
                      totalCharacters) *
                      100
                  )}
                  %
                </p>
              ) : (
                <p className={`${styles.hasTextInfo} ${styles.isSize1}`}>0%</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Typing;
