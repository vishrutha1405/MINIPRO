import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "./services/api";
import "./index.css";

function NotesVideos() {
  const location = useLocation();
  const navigate = useNavigate();
  const studentSubject = location.state?.student?.subject;
  const [materials, setMaterials] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await api.getMaterials();
        if (response.success) {
          setMaterials(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch materials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const subjects = [
    "Tamil", "English", "Maths", "Science", "SocialScience", 
    "Physics", "Chemistry", "Biology", "ComputerScience"
  ];

  return (
    <div className="notes-videos-section" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Study Materials Repository</h1>
        <button 
          onClick={() => navigate(-1)} 
          style={{ background: 'var(--glass-bg)', border: '1px solid var(--primary)', padding: '10px 20px' }}
        >
          Back to Dashboard
        </button>
      </div>
      
      {loading ? (
        <p>Loading materials...</p>
      ) : (
        subjects.map(subject => (
          <div key={subject} className="subject-section">
            <h2>{subject}</h2>
            <div className="material-links">
              {materials[subject] ? (
                <>
                  {materials[subject].notes.length > 0 && (
                    <div className="notes-list">
                      <h3>Notes:</h3>
                      {materials[subject].notes.map(note => (
                        <a key={note.id} href={note.fileUrl} target="_blank" rel="noreferrer" className="db-link">
                          📄 {note.fileName}
                        </a>
                      ))}
                    </div>
                  )}
                  {materials[subject].videos.length > 0 && (
                    <div className="videos-list">
                      <h3>Videos:</h3>
                      {materials[subject].videos.map(video => (
                        <a key={video.id} href={video.fileUrl} target="_blank" rel="noreferrer" className="db-link">
                          🎥 {video.fileName}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="no-data">No materials uploaded for this subject yet.</p>
              )}
            </div>
          </div>
        ))
      )}

      <hr />
      <h1>External Resources</h1>
      <div className="external-resources">
        <h2>Tamil <a href="https://www.scribd.com/document/680022107/tamil-notes" target="_blank">Notes</a></h2>
        <h2>English <a href="https://www.englishgrammar.org/" target="_blank">Notes</a></h2>
        <h2>Maths <a href="https://mathsframe.co.uk/" target="_blank">Notes</a></h2>
      </div>
    </div>
  );
}

export default NotesVideos;
