import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "./services/api";
import "./index.css";

function AdminUpload() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userJson = localStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;
      
      
      const role = location.state?.role || user?.role;
      
      if (role !== "admin") {
        console.warn("Unauthorized access to admin page. Redirecting to login.");
        navigate("/");
      }
    };
    checkAuth();
  }, [location.state, navigate]);

  const [admin, setAdmin] = useState({
    name: location.state?.user?.name || JSON.parse(localStorage.getItem('user') || '{}').name || "",
    language: "",
    subject: ""
  });

  const [wantUpload, setWantUpload] = useState(""); // yes / no
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpload = async () => {
    if (!type || !file) {
      alert("Please select upload type and file");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('adminName', admin.name);
      formData.append('language', admin.language);
      formData.append('subject', admin.subject);
      formData.append('uploadType', type);
      formData.append('file', file);

      const result = await api.uploadContent(formData);
      console.log('Upload result:', result);
      
      setSuccess(true);
      alert("Content uploaded successfully to MongoDB!");
      navigate("/nextpage", { state: { data: result.data } });
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || "Upload failed");
      alert("Upload failed: " + (err.message || "Check console for details"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-upload">
      <h2>Admin Upload Panel</h2>

      <input
        type="text"
        name="name"
        placeholder="Admin Name"
        value={admin.name}
        onChange={handleChange}
      />

      <select name="language" value={admin.language} onChange={handleChange}>
        <option value="">Select Language</option>
        <option value="Tamil">Tamil</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
      </select>

      <select name="subject" value={admin.subject} onChange={handleChange}>
        <option value="">Select Subject</option>
        <option value="Tamil">Tamil</option>
        <option value="English">English</option>
        <option value="Maths">Maths</option>
        <option value="Science">Science</option>
        <option value="Physics">Physics</option>
        <option value="Chemistry">Chemistry</option>
        <option value="Biology">Biology</option>
        <option value="ComputerScience">Computer Science</option>
      </select>

      {admin.name && admin.language && admin.subject && (
        <>
          <h4>Do you want to upload content?</h4>

          <select value={wantUpload} onChange={(e) => setWantUpload(e.target.value)}>
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </>
      )}
      {wantUpload === "yes" && (
        <>
          <h3>Upload Notes / Videos</h3>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Upload Type</option>
            <option value="Notes">Notes</option>
            <option value="Video">Video</option>
          </select>

          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <button onClick={handleUpload}>Upload</button>
        </>
      )}

      {wantUpload === "no" && (
        <p>Upload section hidden as per your choice.</p>
      )}
    </div>
  );
}

export default AdminUpload;