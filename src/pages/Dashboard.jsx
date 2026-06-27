import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>
        <p>Welcome, {user?.username}</p>
      </div>

      <Navbar />
    </div>
  );
}

export default Dashboard;
