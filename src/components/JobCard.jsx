import "./JobCard.css";

function JobCard({ job, onDelete, onEdit, index }) {
  return (
    <div className="job-card">
      <h3>{job.company}</h3>
      <p>{job.title}</p>
      <p>Notes: {job.notes}</p>
      <p>Applied On: {job.dateApplied}</p>
      <p className={job.status?.toString().toLowerCase()}>
        Status: {job.status}
      </p>
      <button onClick={() => onEdit(job, index)}>Edit</button>

      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  );
}

export default JobCard;
