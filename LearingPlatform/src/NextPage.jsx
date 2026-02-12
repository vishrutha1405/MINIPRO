import { useEffect, useState } from "react";

function AdminView() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("uploadedContent");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return <p>No uploaded content found</p>;
  }

  return (
    <div>
      <h2>Uploaded Content</h2>
      <p><b>Admin:</b> {data.adminName}</p>
      <p><b>Language:</b> {data.language}</p>
      <p><b>Subject:</b> {data.subject}</p>
      <p><b>Type:</b> {data.uploadType}</p>
      <p><b>File:</b> {data.fileName}</p>
    </div>
  );
}

export default AdminView;
