function JobCard({ job, onDelete, index }) {
  return (
    <div className="job-card">
      <h3>{job.company}</h3>
      <p>{job.title}</p>
      <p>Status: {job.status}</p>

      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
}

export default JobCard;
