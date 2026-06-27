import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminHome from "./pages/AdminHome";
import ManageQuizzes from "./pages/ManageQuizzes";
import QuizList from "./pages/QuizList";
import QuizDetail from "./pages/QuizDetail";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/dashboard/quizzes"
        element={user ? <QuizList /> : <Navigate to="/login" />}
      />

      <Route
        path="/dashboard/quizzes/:id"
        element={user ? <QuizDetail /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin"
        element={user?.isAdmin ? <AdminHome /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/quizzes"
        element={user?.isAdmin ? <ManageQuizzes /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
