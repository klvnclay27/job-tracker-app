import { useState, useEffect } from "react";
import JobCard from "./components/JobCard";
import "./App.css";

function App() {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiJobs, setApiJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");

    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://www.arbeitnow.com/api/job-board-api",
      );
      const data = await response.json();

      setApiJobs(data.data);
    } catch {
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const filteredApiJobs = apiJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company_name.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const loadJobs = async () => {
      await fetchJobs();
    };
    loadJobs();
  }, []);

  const handleAddJob = () => {
    if (company.trim() === "" || title.trim() === "") {
      alert("Please enter a company and job title");
      return;
    }
    const newJob = {
      company: company,
      title: title,
      status: status,
      dateApplied: dateApplied,
      notes: notes,
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
    setNotes("job.notes");
    setDateApplied("");
  };
  const handleDeleteJob = (indexToDelete) => {
    setJobs(jobs.filter((job, index) => index !== indexToDelete));
  };

  const handleEditJob = (job, index) => {
    setCompany(job.company);
    setTitle(job.title);
    setStatus(job.status);
    setNotes(job.notes);
    setEditingIndex(index);
  };

  const handleApplyJob = (job) => {
    console.log("Apply clicked:", job);

    const newJob = {
      company: job.company_name,
      title: job.title,
      status: "Applied",
      dateApplied: new Date().toISOString().split("T")[0],
      notes: "Added from API",
    };
    console.log("New job being added:", newJob);
    setJobs((currentJobs) => [...currentJobs, newJob]);
    console.log("Current jobs:", jobs);
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

      <div className="stats-container">
        <div className="stat-card applied-card">
          <h3>Applied</h3>
          <p>{appliedJobs.length}</p>
        </div>

        <div className="stat-card interview-card">
          <h3>Interview</h3>
          <p>{interviewJobs.length}</p>
        </div>

        <div className="stat-card rejected-card">
          <h3>Rejected</h3>
          <p>{rejectedJobs.length}</p>
        </div>

        <div className="stat-card offer-card">
          <h3>Offer</h3>
          <p>{offerJobs.length}</p>
        </div>
      </div>

      <div className="job-form">
        <input
          type="text"
          placeholder="Search Jobs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <input
          type="date"
          value={dateApplied}
          onChange={(e) => setDateApplied(e.target.value)}
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

        <button onClick={handleAddJob}>
          {editingIndex !== null ? "Update Job" : "Add Job"}
        </button>

        <button onClick={fetchJobs}>Load API Data</button>

        {loading && <div className="spinner"></div>}
        {error && <p>{error}</p>}

        <div>
          {filteredApiJobs.map((job) => (
            <div key={job.slug} className="api-card">
              <h3>{job.title}</h3>
              <p>{job.company_name}</p>
              <p>{job.location}</p>

              <button onClick={() => handleApplyJob(job)}>Apply</button>
            </div>
          ))}
        </div>
      </div>
      <div className="job-list">
        +-{" "}
        {filteredJobs.length === 0 ? (
          <p>No jobs found. Add your first job application.</p>
        ) : (
          filteredJobs.map((job, index) => (
            <JobCard
              key={index}
              job={job}
              index={index}
              onDelete={handleDeleteJob}
              onEdit={handleEditJob}
            />
          ))
        )}
      </div>
    </div>
  );
}
export default App;
