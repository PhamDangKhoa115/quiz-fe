import Navbar from "../components/AdminNavbar";
import { useSelector } from "react-redux";

function AdminHome() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h1>Admin Dashboard</h1>
        <h5>Welcome, {user.username}</h5>
      </div>

      <Navbar />
    </div>
  );
}

export default AdminHome;
