import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "350px" }}>
        <h4 className="text-center mb-4">Register</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              className="form-control"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={form.isAdmin}
              onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
            />
            <label className="form-check-label">Register as Admin</label>
          </div>

          <button className="btn btn-primary w-100">Register</button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
