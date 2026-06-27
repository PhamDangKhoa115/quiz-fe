import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizzes } from "../features/quizSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function QuizList() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.quizzes);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>
        <p>Welcome, {user?.username}</p>
      </div>

      <Navbar />

      <h2>Choose a Quiz</h2>

      {list.length === 0 ? (
        <p>No quizzes available</p>
      ) : (
        <div className="row">
          {list.map((quiz) => (
            <div className="col-md-4 mb-3" key={quiz._id}>
              <div className="card p-3 h-100">
                <h4>{quiz.title}</h4>
                <p>{quiz.description}</p>
                <p>{quiz.questions?.length || 0} questions</p>

                <Link
                  className="btn btn-primary"
                  to={`/dashboard/quizzes/${quiz._id}`}
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizList;
