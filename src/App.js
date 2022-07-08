import { useState } from "react";
import QuizScreen from "./components/QuizScreen.js";
import JoinScreen from "./components/JoinScreen.js";
import Navbar from "./components/Navbar.js";
import QuestionList1 from "./data/questions";
import QuestionList2 from "./data/questions2";


function App() {
  const [isQuizStarted1, setIsQuizStarted1] = useState(false);
  const [isQuizStarted2, setIsQuizStarted2] = useState(false);

  console.log(isQuizStarted1, isQuizStarted2, "isQuizStarted1, isQuizStarted2");

  return (
    <>
      <Navbar />
      {/* <Timer /> */}
      <div className="quiz-list">
        <div className="quiz-container">
          {isQuizStarted1 ? (
            <QuizScreen
              retry={() => setIsQuizStarted1(false)}
              QuestionList={QuestionList1}
            />
          ) : (
            <JoinScreen start={() => setIsQuizStarted1(true)} />
          )}
        </div>

        {/* <div className="quiz-container">
          {isQuizStarted2 ? (
            <QuizScreen
              retry={() => setIsQuizStarted2(false)}
              QuestionList={QuestionList2}
            />
          ) : (
            <JoinScreen start={() => setIsQuizStarted2(true)} />
          )}
        </div> */}
      </div>
    </>
  );
}
export default App;
