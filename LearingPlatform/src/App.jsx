import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Details from "./Details.jsx";
import AdminUpload from "./AdminUpload.jsx";
import NextPage from "./NextPage.jsx";
import StudyDetails from "./StudyDetails.jsx";
import Theory from "./Theory";
import Test from "./Test";
import NotesVideos from "./NotesVideos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/details" element={<Details />} />
      <Route path="/adminupload" element={<AdminUpload />} />
      <Route path="/studydetails" element={<StudyDetails />} />
      <Route path="/nextpage" element={<NextPage />} />
      <Route path="/theory" element={<Theory />} />
      <Route path="/test" element={<Test />} />
      <Route path="/notesvideos" element={<NotesVideos />} />
    </Routes>
  );
}

export default App;
