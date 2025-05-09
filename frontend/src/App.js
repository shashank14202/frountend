import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState('');

    const API_URL = "https://resume-matcher2.onrender.com";

  const handleFileChange = (e) => setResume(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDescription) return alert("Please fill all fields.");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await axios.post(`${API_URL}/analyze`, formData);
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult("Error analyzing resume.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resume Matcher</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} /><br />
        <textarea
          placeholder="Paste job description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows="10" cols="50"
        /><br />
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div>
          <h2>Analysis:</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;