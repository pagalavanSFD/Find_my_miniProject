import React, { useState } from 'react';
import "../src/App.css";
import { projectIdeas } from './data/projectIdeas';

const App = () => {
  const [skill, setSkill] = useState("");
  const [interest, setInterest] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;

  const handleFindProjects = () => {
    setLoading(true);
    console.log("Selected Skill:", skill);
    console.log("Selected Interest:", interest);

    if (!skill || !interest) {
      alert("Please select both skill and interest!");
      return;
    }

    const matches = projectIdeas.filter(
      project => project.skill === skill && project.interest === interest
    );
    console.log("Matches:", matches);  // This will show the filtered suggestions in the console

    setSuggestions(matches);
    setLoading(false);
    setCurrentPage(1); // Reset to the first page after each new search
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = suggestions.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(suggestions.length / projectsPerPage);

  // Handle pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <div className="inner-box">
        <h2>Find My MiniProject</h2>

        {/* Skill selector */}
        <div>
          <label>Choose Your Skill</label><br />
          <select value={skill} onChange={(e) => setSkill(e.target.value)} className={skill ? "selected" : ""}>
            <option value="">-- Select Skill --</option>
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
          </select>
        </div>

        {/* Interest selector */}
        <div>
          <label>Choose Your Interest Area</label><br />
          <select value={interest} onChange={(e) => setInterest(e.target.value)} className={interest ? "selected" : ""}>
            <option>-- Select Interest --</option>
            <option value="Web Development">Web Development</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Mobile Apps">Mobile Apps</option>
            <option value="Automation">Automation</option>
          </select>
        </div>

        {/* Buttons to find projects and clear filters */}
        <div>
          <button onClick={handleFindProjects}>Find Projects</button>
          <button onClick={() => { setSkill(''); setInterest(''); setSuggestions([]); }}>
            Clear
          </button>
        </div>

        {/* Project suggestions */}
        <div style={{ marginTop: "30px" }}>
          <h2>Suggested Mini-Projects:</h2>
          {loading ? (
            <p>Loading projects...</p>
          ) : currentProjects.length > 0 ? (
            <ul>
              {currentProjects.map((project, index) => (
                <li key={index}>
                  <strong>{project.idea}</strong><br />
                  <span>Difficulty: {project.difficulty}</span><br />
                  <span>Time: {project.timeEstimate}</span><br />
                  <span>Tags: {project.tags.join(", ")}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No matching projects yet. Try selecting skill and interest!</p>
          )}

          {/* Pagination controls */}
          {suggestions.length > projectsPerPage && (
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;
