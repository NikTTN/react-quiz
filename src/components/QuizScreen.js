import React, { useState } from "react";

import QuizResult from "./QuizResult";
import Question from "./Question";

const QuizScreen = ({ retry, QuestionList }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswer, setMarkedAnswer] = useState({});
  const isQuestionEnd = currentQuestionIndex === QuestionList.length;

  const calculateResult = () => {
    let correct = 0;
    QuestionList.forEach((question, index) => {
      if (question.correctOptionIndex === markedAnswer[index]) {
        correct++;
      }
    });
    return {
      total: QuestionList.length,
      correct: correct,
      percentage: Math.trunc((correct / QuestionList.length) * 100),
    };
  };

  return (
    <div className="quiz-screen">
      {isQuestionEnd ? (
        <QuizResult result={calculateResult()} retry={retry} />
      ) : (
        <Question
          markedAnswer={markedAnswer}
          question={QuestionList[currentQuestionIndex]}
          totalQuestions={QuestionList.length}
          currentQuestion={currentQuestionIndex + 1}
          nextQuestion={() => {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }}
          setAnswer={(index) => {
            console.log(index, currentQuestionIndex, "nik112123");
            setMarkedAnswer((obj) => {
              let newObj = { ...obj };
              newObj[currentQuestionIndex] = index;
              console.log(newObj, "newobj");
              return newObj;
            });
          }}
        />
      )}
    </div>
  );
};

export default QuizScreen;
