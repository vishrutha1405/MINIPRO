import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Login from "./Login";
import Details from "./Details";
import StudyDetails from "./StudyDetails";
import AdminUpload from "./AdminUpload";
import NextPage from "./NextPage";
import Theory from "./Theory";
import Test from "./Test";
import NotesVideos from "./NotesVideos";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/details" element={<Details />} />
        <Route path="/studydetails" element={<StudyDetails />} />
        <Route path="/admin/upload" element={<AdminUpload />} />
        <Route path="/nextpage" element={<NextPage />} />
        <Route path="/theory" element={<Theory />} />
        <Route path="/test" element={<Test />} />
        <Route path="/notesvideos" element={<NotesVideos />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
