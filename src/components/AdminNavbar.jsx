import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light mb-4">
      <div className="navbar-nav">
        <Link className="nav-link" to="/admin">
          Home
        </Link>

        <Link className="nav-link" to="/admin/quizzes">
          Manage Quizzes
        </Link>

        <button className="btn btn-link nav-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
