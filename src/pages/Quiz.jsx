import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchQuestions } from "../features/questionSlice";

function Quiz() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.questions);
  const { user } = useSelector((state) => state.auth);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const currentQuestion = list[currentIndex];

  const handleSubmit = () => {
    if (selected === "") return alert("Please select an answer");

    if (Number(selected) === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < list.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected("");
    } else {
      setCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelected("");
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>
        <p>Welcome, {user?.username}</p>
      </div>

      <Navbar />

      <div className="text-center mt-5">
        {completed ? (
          <>
            <h3>Quiz Completed</h3>
            <p>Your score: {score}</p>
            <button className="btn btn-primary" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </>
        ) : currentQuestion ? (
          <div>
            <h2>Quiz</h2>
            <h3>{currentQuestion.questionText}</h3>

            <div className="d-inline-block text-start mt-3">
              {currentQuestion.options.map((option, index) => (
                <div className="form-check" key={index}>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="answer"
                    value={index}
                    checked={selected === String(index)}
                    onChange={(e) => setSelected(e.target.value)}
                  />
                  <label className="form-check-label">{option}</label>
                </div>
              ))}
            </div>

            <br />

            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
              Submit Answer
            </button>
          </div>
        ) : (
          <p>No questions available</p>
        )}
      </div>
    </div>
  );
}

export default Quiz;
