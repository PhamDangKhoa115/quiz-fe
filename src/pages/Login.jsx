import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(result)) {
      if (result.payload.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-4">Login</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              className="form-control"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="John"
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="123"
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3">
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
