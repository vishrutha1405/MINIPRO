import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role?.toLowerCase();

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  const [student, setStudent] = useState({
    name: "",
    age: "",
    std: "",
    subject: ""
  });

  const [uploadType, setUploadType] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleUpload = () => {
    if (!uploadType || !subject || !file) {
      alert("Fill all upload fields");
      return;
    }

    const uploadedData = {
      subject,
      type: uploadType,
      fileName: file.name
    };

    localStorage.setItem("uploadedContent", JSON.stringify(uploadedData));
    alert("Upload successful");
  };

  const handleSubmit = () => {
    if (role === "student") {
      if (!student.name || !student.age || !student.std || !student.subject) {
        alert("Fill all student details");
        return;
      }
      navigate("/studydetails", { state: { student } });
    }
  };

  return (
    <div className="details-container">
      <h2>{role === "student" ? "Student Details" : "Admin Upload Panel"}</h2>

      {role === "student" && (
        <>
          <input name="name" placeholder="Name" onChange={handleStudentChange} />
          <input name="age" type="number" placeholder="Age" onChange={handleStudentChange} />

          <select name="std" onChange={handleStudentChange}>
            <option value="">Standard</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </select>

          <select name="subject" onChange={handleStudentChange}>
            <option value="">Subject</option>
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
        </>
      )}
      <br />
      {role === "student" && <button onClick={handleSubmit}>Submit</button>}
    </div>
  );
}

export default Details;
