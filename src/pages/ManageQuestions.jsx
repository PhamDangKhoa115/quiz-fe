import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
  addQuestion,
  deleteQuestion,
  fetchQuestions,
  updateQuestion,
} from "../features/questionSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.questions);
  const { user } = useSelector((state) => state.auth);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswerIndex: 0,
  });

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm({ ...form, options: newOptions });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswerIndex: 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanQuestion = {
      questionText: form.questionText,
      options: form.options,
      correctAnswerIndex: Number(form.correctAnswerIndex),
    };

    if (editingId) {
      dispatch(updateQuestion({ id: editingId, question: cleanQuestion }));
    } else {
      dispatch(addQuestion(cleanQuestion));
    }

    resetForm();
  };

  const handleEdit = (question) => {
    setEditingId(question._id);
    setForm({
      questionText: question.questionText,
      options: question.options,
      correctAnswerIndex: question.correctAnswerIndex,
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.username}</p>
      </div>

      <Navbar isAdmin />

      <h2>Questions</h2>

      <form className="card p-3 mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Question Text:</label>
          <input
            className="form-control"
            value={form.questionText}
            onChange={(e) => setForm({ ...form, questionText: e.target.value })}
            required
          />
        </div>

        <label>Options:</label>
        {form.options.map((option, index) => (
          <input
            key={index}
            className="form-control mb-2"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        ))}

        <div className="mb-3">
          <label>Correct Answer Index:</label>
          <input
            type="number"
            min="0"
            max="3"
            className="form-control"
            value={form.correctAnswerIndex}
            onChange={(e) =>
              setForm({ ...form, correctAnswerIndex: e.target.value })
            }
          />
        </div>

        <button className="btn btn-primary">
          {editingId ? "Update Question" : "Add Question"}
        </button>

        {editingId && (
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="card">
        {list.map((q) => (
          <div className="border-bottom p-3" key={q._id}>
            <h4>{q.questionText}</h4>

            <ul>
              {q.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>

            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleEdit(q)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch(deleteQuestion(q._id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
