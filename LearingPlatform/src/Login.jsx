import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    if (!strongPassword.test(password)) {
      setError("Password not strong enough");
      return;
    }

    setError("");

    if (role === "student") {
      navigate("/details", { state: { role: "student" } });
    } else {
      navigate("/admin/upload", { state: { role: "admin" } });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
