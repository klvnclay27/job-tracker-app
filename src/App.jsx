import React from "react";

function App() {
  return (
    <div className="app">
      <h1>Job Traker App</h1>

      <div className="job-form">
        <input type="text" placeholder="Company Name" />
        <input type="text" placeholder="Job Title" />

        <select>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <button>Add Job</button>
      </div>
    </div>
  );
}

export default App;
