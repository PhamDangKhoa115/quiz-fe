import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { fetchQuizById, updateQuiz } from "../features/quizSlice";

function EditQuiz() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedQuiz } = useSelector((state) => state.quizzes);
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: "",
    description: "",
    questions: [],
  });

  useEffect(() => {
    dispatch(fetchQuizById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedQuiz) {
      setForm({
        title: selectedQuiz.title,
        description: selectedQuiz.description || "",
        questions: selectedQuiz.questions || [],
      });
    }
  }, [selectedQuiz]);

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

    const result = await dispatch(updateQuiz({ id, quiz: form }));

    if (updateQuiz.fulfilled.match(result)) {
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

      <h2>Edit Quiz</h2>

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
          <h4>Questions in this Quiz</h4>

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

        <button className="btn btn-primary">Update Quiz</button>
      </form>
    </div>
  );
}

export default EditQuiz;
