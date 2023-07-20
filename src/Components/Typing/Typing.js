import React, { useState, useEffect } from "react";
import "./Typing.css";

const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";

const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="timer">{time}</div>;
};

const QuoteDisplay = ({ quote, input }) => {
  return (
    <div className="quote-display">
      {quote.split("").map((character, index) => (
        <span
          key={index}
          className={
            input[index] === undefined
              ? ""
              : input[index] === character
              ? "correct"
              : "incorrect"
          }
        >
          {character}
        </span>
      ))}
    </div>
  );
};

const QuoteInput = ({ quote, onInputChange }) => {
  return (
    <textarea
      className="quote-input"
      value={quote}
      onChange={onInputChange}
      autoFocus
    ></textarea>
  );
};

const Typing = () => {
  const [quote, setQuote] = useState("");
  const [quoteInput, setQuoteInput] = useState("");

  useEffect(() => {
    renderNewQuote();
  }, []);

  const renderNewQuote = () => {
    fetch(RANDOM_QUOTE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setQuoteInput("");
      });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuoteInput(value);
    checkInput();
  };

  const checkInput = () => {
    const arrayQuote = quote.split("");
    const arrayValue = quoteInput.split("");

    let correct = true;
    arrayQuote.forEach((character, index) => {
      if (character === arrayValue[index]) {
        return;
      } else {
        correct = false;
      }
    });

    if (correct) {
      renderNewQuote();
    }
  };

  return (
    <div>
      <Timer />
      <div className="container">
        <QuoteDisplay quote={quote} input={quoteInput} />
        <QuoteInput quote={quoteInput} onInputChange={handleInputChange} />
      </div>
    </div>
  );
};

export default Typing;
