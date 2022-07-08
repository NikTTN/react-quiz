import { useState, useEffect } from "react";


let timeout;
const Question = ({
  question,
  totalQuestions,
  currentQuestion,
  setAnswer,
  markedAnswer,
  nextQuestion,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [resetTimer, setResetTimer] = useState(true);

  
  const gotoNextQuestion = () => {
    //debugger;
    setResetTimer(false);
    clearTimeout(timeout);
    timeout = null;
    nextQuestion();
    // setAnswer(selectedOption);
    // setSelectedOption(null);
  };

  useEffect(() => {
    setResetTimer(true);
    clearTimeout(timeout);
    timeout = setTimeout(gotoNextQuestion, 10 * 1000);
  }, [question.id]);

  return (
    <div className="question">
      {resetTimer && <div className="progress-bar active"></div>}
      <div className="question-count">
        <b> {currentQuestion} </b>
        of
        <b> {totalQuestions} </b>
      </div>
      <div className="main">
        <div className="title">
          <span>Questions:</span>
          <p>{question.title}</p>
        </div>
        <div className="options">
          {question.options.map((option, index) => {
            return (
              <div
                className={
                  index === markedAnswer[currentQuestion - 1]
                    ? "option active"
                    : "option"
                }
                key={index}
                onClick={() => setAnswer(index)}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="control">
        <button onClick={gotoNextQuestion}>Next</button>
      </div>
    </div>
  );
};

export default Question;
