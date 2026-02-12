import React, { useState } from "react";
import Theory from "./Theory";
import Test from "./Test";
import NotesVideos from "./NotesVideos";
import "./index.css";

function StudyDetails() {
  const [activePage, setActivePage] = useState(null);

  return (
    <div className="study-details-container">
      <h1>Study Details</h1>

      <button onClick={() => setActivePage("theory")}>
        Theory
        <img
          src="https://images.squarespace-cdn.com/content/v1/612e4cc5bc325958745c7532/1635411560505-4DZLBS2ZXDQO2EI5ZPGB/1_1_Theory_Button.png"
          alt="theory"
        />
      </button>

      <button onClick={() => setActivePage("test")}>
        Test
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkHkZHGYZyCDoZrjQ_0e3X-CTAyiIdaYS4YoTtZ1qzc9vKRQBxq_UkT6TbvLCZ18RaOEY&usqp=CAU"
          alt="test"
        />
      </button>

      <button onClick={() => setActivePage("notes")}>
        Notes & Videos
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXEvTsN9PWcr1LmD8QSlS9eEaCv34dBZU7VQ&s"
          alt="notes"
        />
      </button>
      <div className="content-area">
        {activePage === "theory" && <Theory />}
        {activePage === "test" && <Test />}
        {activePage === "notes" && <NotesVideos />}
      </div>
    </div>
  );
}

export default StudyDetails;
