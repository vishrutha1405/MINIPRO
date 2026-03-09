import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "./services/api";

function Details() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role?.toLowerCase();

  useEffect(() => {
    if (role !== "student") {
      navigate("/");
    }
  }, [role, navigate]);

  
  const [student, setStudent] = useState({
    name: "",
    std: "",
    subject: ""
  });

  
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!student.name || !student.std || !student.subject) {
      alert("Fill all student details");
      return;
    }

    setLoading(true);
    try {
      await api.submitStudentDetails(student);
      alert("Student details saved to MongoDB!");
      navigate("/studydetails", { state: { student } });
    } catch (err) {
      console.error('Failed to save student details:', err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="details-container">
      <h2>Student Details</h2>

      <input
        type="text"
        name="name"
        value={student.name}
        placeholder="Enter Name"
        onChange={handleStudentChange}
      />

      <select
        name="std"
        value={student.std}
        onChange={handleStudentChange}
      >
        <option value="">Select Standard</option>
        <option value="6th">6th</option>
        <option value="7th">7th</option>
        <option value="8th">8th</option>
        <option value="9th">9th</option>
        <option value="10th">10th</option>
        <option value="11th">11th</option>
        <option value="12th">12th</option>
      </select>

      <select
        name="subject"
        value={student.subject}
        onChange={handleStudentChange}
      >
        <option value="">Select Subject</option>
        <option value="Tamil">Tamil</option>
        <option value="English">English</option>
        <option value="Maths">Maths</option>
        <option value="Science">Science</option>
        <option value="SocialScience">Social Science</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Biology">Biology</option>
        <option value="ComputerScience">Computer Science</option>
      </select>

      <br /><br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Details;
