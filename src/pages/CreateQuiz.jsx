import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { createQuiz } from "../features/quizSlice";

function CreateQuiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: "",
    description: "",
    questions: [],
  });

  const addQuestion = () => {
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

  const removeQuestion = (questionIndex) => {
    setForm({
      ...form,
      questions: form.questions.filter((_, index) => index !== questionIndex),
    });
  };

  const updateQuestionText = (questionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].questionText = value;
    setForm({ ...form, questions: newQuestions });
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setForm({ ...form, questions: newQuestions });
  };

  const updateCorrectAnswer = (questionIndex, value) => {
    const newQuestions = [...form.questions];
    newQuestions[questionIndex].correctAnswerIndex = Number(value);
    setForm({ ...form, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.questions.length === 0) {
      alert("Please add at least one question");
      return;
    }

    const result = await dispatch(createQuiz(form));

    if (createQuiz.fulfilled.match(result)) {
      navigate("/admin/quizzes");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h1>Admin Dashboard</h1>
        <h5>Welcome, {user?.username}</h5>
      </div>

      <AdminNavbar />

      <h2>Create Quiz</h2>

      <form className="card p-3" onSubmit={handleSubmit}>
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

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Questions</h4>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>

        {form.questions.map((question, questionIndex) => (
          <div className="border rounded p-3 mb-3" key={questionIndex}>
            <div className="d-flex justify-content-between">
              <h5>Question {questionIndex + 1}</h5>

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeQuestion(questionIndex)}
              >
                Delete Question
              </button>
            </div>

            <label>Question Text</label>
            <input
              className="form-control mb-2"
              value={question.questionText}
              onChange={(e) =>
                updateQuestionText(questionIndex, e.target.value)
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
                  updateOption(questionIndex, optionIndex, e.target.value)
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
                updateCorrectAnswer(questionIndex, e.target.value)
              }
              required
            />
          </div>
        ))}

        <button className="btn btn-primary">Save Quiz</button>
      </form>
    </div>
  );
}

export default CreateQuiz;
