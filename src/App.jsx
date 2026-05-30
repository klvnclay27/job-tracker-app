import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";

function App() {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Applied");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");

    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = () => {
    if (company.trim() === "" || title.trim() === "") {
      alert("Please enter a company and job title");
      return;
    }
    const newJob = {
      company: company,
      title: title,
      status: status,
    };
    // This code means if you're editing a job => replace it
    // And if you're adding a new job => create it normally

    if (editingIndex !== null) {
      const updatedJobs = [...jobs];
      updatedJobs[editingIndex] = newJob;
      setJobs(updatedJobs);
      setEditingIndex(null);
    } else {
      setJobs([...jobs, newJob]);
    }

    setCompany("");
    setTitle("");
    setStatus("Applied");
  };

  const handleDeleteJob = (indexToDelete) => {
    const updateJobs = jobs.filter((job, index) => {
      return index !== indexToDelete;
    });

    setJobs(updateJobs);
  };

  const handleEditJob = (job, index) => {
    setCompany(job.company);
    setTitle(job.title);
    setStatus(job.status);
    setEditingIndex(index);
  };

  const filteredJobs = jobs.filter((job) =>
    job.company.toLowerCase().includes(search.toLowerCase()),
  );

  const appliedJobs = jobs.filter((job) => job.status === "Applied");

  const interviewJobs = jobs.filter((job) => job.status === "Interview");

  const rejectedJobs = jobs.filter((job) => job.status === "Rejected");

  const offerJobs = jobs.filter((job) => job.status === "Offer");

  return (
    <div className="app">
      <h1>Job Tracker App</h1>
      <h2>Total Jobs : {jobs.length}</h2>

      <p>Applied: {appliedJobs.length}</p>
      <p>Interview: {interviewJobs.length}</p>
      <p>Rejected : {rejectedJobs.length}</p>
      <p>Offer : {offerJobs.length}</p>

      <div className="job-form">
        <input
          type="text"
          placeholder="Search Jobs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <button onClick={handleAddJob}>Add Job</button>
      </div>
      <div className="job-list">
        {filteredJobs.map((job, index) => (
          <JobCard
            key={index}
            job={job}
            index={index}
            onDelete={handleDeleteJob}
            onEdit={handleEditJob}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
