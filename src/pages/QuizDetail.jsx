import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchQuizById } from "../features/quizSlice";

function QuizDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedQuiz } = useSelector((state) => state.quizzes);
  const { user } = useSelector((state) => state.auth);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchQuizById(id));
  }, [dispatch, id]);

  const questions = selectedQuiz?.questions || [];
  const currentQuestion = questions[currentIndex];

  const handleSubmit = () => {
    if (selected === "") {
      alert("Please select an answer");
      return;
    }

    const newScore =
      Number(selected) === currentQuestion.correctAnswerIndex
        ? score + 1
        : score;

    setScore(newScore);

    if (currentIndex + 1 < questions.length) {
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
        {!selectedQuiz ? (
          <p>Loading quiz...</p>
        ) : completed ? (
          <>
            <h3>Quiz Completed</h3>
            <p>
              Your score: {score}/{questions.length}
            </p>
            <button className="btn btn-primary" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </>
        ) : currentQuestion ? (
          <>
            <h2>{selectedQuiz.title}</h2>
            <h4>
              Question {currentIndex + 1}/{questions.length}
            </h4>
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
          </>
        ) : (
          <p>This quiz has no questions</p>
        )}
      </div>
    </div>
  );
}

export default QuizDetail;
