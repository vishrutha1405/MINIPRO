import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

function AdminUpload() {
  const location = useLocation();
  const navigate = useNavigate();

  // Protect route
  useEffect(() => {
    if (location.state?.role !== "admin") {
      navigate("/");
    }
  }, [location.state, navigate]);

  const [admin, setAdmin] = useState({
    name: "",
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

  const handleUpload = () => {
    if (!type || !file) {
      alert("Please select upload type and file");
      return;
    }

    const uploadData = {
      adminName: admin.name,
      language: admin.language,
      subject: admin.subject,
      uploadType: type,
      fileName: file.name
    };

    localStorage.setItem("uploadedContent", JSON.stringify(uploadData));

    navigate("/admin/view");
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
        <option value="Computer Science">Computer Science</option>
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

      {/* Upload Section */}
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
