import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { deleteQuiz, fetchQuizzes } from "../features/quizSlice";

function ManageQuizzes() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.quizzes);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h1>Admin Dashboard</h1>
        <h5>Welcome, {user?.username}</h5>
      </div>

      <AdminNavbar />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Quizzes</h2>

        <Link className="btn btn-primary" to="/admin/quizzes/create">
          Create Quiz
        </Link>
      </div>

      {list.length === 0 ? (
        <div className="alert alert-info">No quizzes available</div>
      ) : (
        <div className="card">
          {list.map((quiz) => (
            <div className="border-bottom p-3" key={quiz._id}>
              <h4>{quiz.title}</h4>
              <p>{quiz.description}</p>
              <p>{quiz.questions?.length || 0} questions</p>

              <Link
                className="btn btn-warning btn-sm me-2"
                to={`/admin/quizzes/edit/${quiz._id}`}
              >
                Edit
              </Link>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(deleteQuiz(quiz._id))}
              >
                Delete Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageQuizzes;
