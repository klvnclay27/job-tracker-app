import { useState, useEffect } from "react";

function App() {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");

    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = () => {
    const newJob = {
      company: company,
      title: title,
      status: status,
    };

    setJobs([...jobs, newJob]);

    setCompany("");
    setTitle("");
    setStatus("Applied");
  };
  return (
    <div className="app">
      <h1>Job Tracker App</h1>

      <div className="job-form">
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <button onClick={handleAddJob}>Add Job</button>
      </div>
      <div className="job-list">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.company}</h3>

            <p>{job.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
