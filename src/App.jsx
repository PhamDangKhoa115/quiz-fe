import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import ManageQuestions from "./pages/ManageQuestions";
import AdminHome from "./pages/AdminHome";
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
        path="/dashboard/quiz"
        element={user ? <Quiz /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin"
        element={user?.isAdmin ? <AdminHome /> : <Navigate to="/login" />}
      />

      <Route
        path="/admin/questions"
        element={user?.isAdmin ? <ManageQuestions /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
