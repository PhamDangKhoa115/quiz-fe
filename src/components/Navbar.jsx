import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

function Navbar({ isAdmin = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light mb-4">
      <div className="container">
        <Link className="navbar-brand" to={isAdmin ? "/admin" : "/dashboard"}>
          Home
        </Link>

        <div className="navbar-nav">
          {!isAdmin && (
            <>
              <Link className="nav-link" to="/dashboard/quiz">
                Quiz
              </Link>
              <span className="nav-link">Article</span>
            </>
          )}

          {isAdmin && <span className="nav-link">Manage Questions</span>}

          <button className="btn btn-link nav-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
