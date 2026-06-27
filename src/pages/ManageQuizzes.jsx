import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../components/AdminNavbar";
import {
  createQuiz,
  deleteQuiz,
  fetchQuizzes,
  updateQuiz,
} from "../features/quizSlice";

function ManageQuizzes() {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.quizzes);
  const { user } = useSelector((state) => state.auth);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    questions: [
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswerIndex: 0,
      },
    ],
  });

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const addQuestionField = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswerIndex: 0,
        },
      ],
    });
  };

  const removeQuestionField = (questionIndex) => {
    const newQuestions = form.questions.filter(
      (_, index) => index !== questionIndex,
    );

    setForm({
      ...form,
      questions: newQuestions,
    });
  };

  const handleQuestionTextChange = (questionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].questionText = value;

    setForm({
      ...form,
      questions: newQuestions,
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].options[optionIndex] = value;

    setForm({
      ...form,
      questions: newQuestions,
    });
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].correctAnswerIndex = Number(value);

    setForm({
      ...form,
      questions: newQuestions,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      questions: [
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswerIndex: 0,
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      dispatch(updateQuiz({ id: editingId, quiz: form }));
    } else {
      dispatch(createQuiz(form));
    }

    resetForm();
  };

  const handleEdit = (quiz) => {
    setEditingId(quiz._id);
    setForm({
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions,
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h1>Admin Dashboard</h1>
        <h5>Welcome, {user?.username}</h5>
      </div>

      <AdminNavbar />

      <h2>Manage Quizzes</h2>

      <form className="card p-3 mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Quiz Title</label>
          <input
            className="form-control"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <input
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <h4>Questions</h4>

        {form.questions.map((question, questionIndex) => (
          <div className="border rounded p-3 mb-3" key={questionIndex}>
            <div className="d-flex justify-content-between">
              <h5>Question {questionIndex + 1}</h5>

              {form.questions.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => removeQuestionField(questionIndex)}
                >
                  Remove
                </button>
              )}
            </div>

            <label>Question Text</label>
            <input
              className="form-control mb-2"
              value={question.questionText}
              onChange={(e) =>
                handleQuestionTextChange(questionIndex, e.target.value)
              }
              required
            />

            <label>Options</label>
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                className="form-control mb-2"
                value={option}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e.target.value)
                }
                required
              />
            ))}

            <label>Correct Answer Index</label>
            <input
              type="number"
              min="0"
              max="3"
              className="form-control"
              value={question.correctAnswerIndex}
              onChange={(e) =>
                handleCorrectAnswerChange(questionIndex, e.target.value)
              }
              required
            />
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addQuestionField}
        >
          Add Question
        </button>

        <button className="btn btn-primary">
          {editingId ? "Update Quiz" : "Create Quiz"}
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
        {list.map((quiz) => (
          <div className="border-bottom p-3" key={quiz._id}>
            <h4>{quiz.title}</h4>
            <p>{quiz.description}</p>
            <p>{quiz.questions?.length || 0} questions</p>

            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleEdit(quiz)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch(deleteQuiz(quiz._id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageQuizzes;
