import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (location.state?.data) {
      setData(location.state.data);
    } else {
      const stored = localStorage.getItem("uploadedContent");
      if (stored) {
        setData(JSON.parse(stored));
      }
    }
  }, [location.state]);

  if (!data) {
    return (
      <div className="admin-upload" style={{ textAlign: 'center' }}>
        <p>No uploaded content found.</p>
        <button onClick={() => navigate("/adminupload")} style={{ marginTop: '20px' }}>Go to Upload</button>
      </div>
    );
  }

  return (
    <div className="admin-upload">
      <h2>Success! Content Processed</h2>
      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px', marginBottom: '25px' }}>
        <p style={{ margin: '10px 0' }}><b>Admin Name:</b> {data.adminName}</p>
        <p style={{ margin: '10px 0' }}><b>Subject:</b> {data.subject}</p>
        <p style={{ margin: '10px 0' }}><b>Type:</b> {data.uploadType}</p>
        <p style={{ margin: '10px 0' }}><b>Resource:</b> {data.fileName}</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button onClick={() => navigate("/notesvideos")}>
          View All Uploaded Content
        </button>
        <button 
          onClick={() => navigate("/adminupload")} 
          style={{ background: 'transparent', border: '1px solid var(--primary)' }}
        >
          Upload More Files
        </button>
      </div>
    </div>
  );
}

export default AdminView;
