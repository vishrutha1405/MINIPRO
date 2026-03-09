import React, { useState } from "react";
import "./index.css";

function Theory() {
  const [theoryData, setTheoryData] = useState({});
  const [loading, setLoading] = useState(false);

  // You can add an effect here to fetch real theory data from MongoDB
  // For now, we keep the dynamic fallback UI but integrated into the container
  
  const subjects = [
    { id: 'Tamil', display: 'தமிழ்', desc: 'Basic grammar and literature concepts.' },
    { id: 'English', display: 'English', desc: 'Grammar, comprehension, and writing skills.' },
    { id: 'Maths', display: 'Maths', desc: 'Formulas, theorems, and solved examples.' },
    { id: 'Science', display: 'Science', desc: 'Physics, Chemistry, and Biology theory.' },
    { id: 'SocialScience', display: 'Social Science', desc: 'History, Geography, and Civics chapters.' },
    { id: 'Physics', display: 'Physics', desc: 'The laws of nature, motion, energy, force.' },
    { id: 'Chemistry', display: 'Chemistry', desc: 'Matter, atoms, molecules, reactions.' },
    { id: 'Biology', display: 'Biology', desc: 'Living organisms, human body systems.' },
    { id: 'ComputerScience', display: 'Computer Science', desc: 'Programming basics and theory topics.' }
  ];

  return (
    <div className="theory-container">
      <h1>Theory Notes</h1>

      <div className="theory-subjects">
        {subjects.map(sub => (
          <div key={sub.id} className="theory-card">
            <h2>{sub.display}</h2>
            <p>{sub.desc}</p>
            <a href="https://www.tntextbooks.in/p/school-books.html" target="_blank" rel="noreferrer">
              Open Theory Notes
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Theory;