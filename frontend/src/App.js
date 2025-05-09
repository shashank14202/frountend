import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState('');

    const API_URL = "https://resume-matcher-backend-1-pdro.onrender.com"; // Replace with actual URL after deployment

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

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
        <div>
          <label>Upload Resume (PDF):</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea
            rows="10"
            cols="50"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here"
          />
        </div>
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div>
          <h2>Analysis Result:</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
