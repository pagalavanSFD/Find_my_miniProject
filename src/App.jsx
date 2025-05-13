import React, { useEffect, useState } from 'react';
import "../src/App.css";
import { projectIdeas } from './data/projectIdeas';

const App = () => {
  // State for user inputs and UI management
  const [skill, setSkill] = useState("");
  const [interest, setInterest] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 5;
  const [timeout, setTimeOut] = useState(); // Used for simulating delay/loading effect
  const [savedProjects, setSavedProjects] = useState([]); // Store saved projects for later
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false); // Control modal visibility
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const storedProjects = localStorage.getItem("savedProjects");
    if (storedProjects) {
      setSavedProjects(JSON.parse(storedProjects));
    }
  }, []);

  // Close project detail view with a short delay
  const closeProjectDetail = () => {
    setTimeout(() => {
      setSelectedProject(null);
    }, 500);
  };

  // Save a project if not already saved
  const handleSaveProject = (project) => {
    if (!savedProjects.includes(project)) {
      setSavedProjects([...savedProjects, project]);
      localStorage.setItem("savedProjects", JSON.stringify(updated));
      alert("Project saved for later!");
    } else {
      alert("Project already saved!");
    }
    console.log('Saved Projects:', savedProjects);
  };
  // Delete a project from Saved Project
  const handleRemoveProject = (ideaToRemove) => {
    const updated = savedProjects.filter(p => p.idea !== ideaToRemove);
    setSavedProjects(updated);
    localStorage.setItem("savedProjects", JSON.stringify(updated));
  };
  

  // Main function to find matching project ideas
  const handleFindProjects = () => {
    setLoading(true);
    setHasSearched(true);
    console.log("Selected Skill:", skill);
    console.log("Selected Interest:", interest);

    if (!skill || !interest) {
      alert("Please select both skill and interest!");
      setLoading(false);
      return;
    }

    // Simulate delay for better UX
    setTimeOut(() => {
      const matches = projectIdeas.filter(
        project => project.skill === skill && project.interest === interest
      );

      console.log("Matches:", matches);
      setSuggestions(matches);
      setLoading(false);
      setCurrentPage(1); // Reset pagination
    }, 500);
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = suggestions.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(suggestions.length / projectsPerPage);

  // Pagination handlers
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

        {/* Skill selection dropdown */}
        <div className="form-group">
          <label htmlFor="skill">🛠️ Choose Your Skill:</label><br />
          <select 
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className={`dropdown ${skill ? "selected" : ""}`}
          >
            <option value="">-- Select Skill --</option>
            {/* Add more skills here if needed */}
            <option value="Python">Python</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="HTML/CSS">HTML/CSS</option>
            <option value="Ruby">Ruby</option>
            <option value="Go">Go</option>
            <option value="PHP">PHP</option>
            <option value="Swift">Swift</option>
            <option value="Kotlin">Kotlin</option>
          </select>
        </div>

        {/* Interest selection dropdown */}
        <div className="form-group">
          <label htmlFor="interest">🎯 Choose Your Interest Area:</label><br />
          <select 
            id="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={`dropdown ${interest ? "selected" : ""}`}
          >
            <option value="">-- Select Interest --</option>
            {/* Add more interest areas if needed */}
            <option value="Web Development">Web Development</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Mobile Apps">Mobile Apps</option>
            <option value="Automation">Automation</option>
            <option value="Game Development">Game Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Blockchain">Blockchain</option>
            <option value="IoT">IoT</option>
          </select>
        </div>

        {/* Action buttons */}
        <div>
          <button onClick={handleFindProjects}>Find Projects</button>
          <button onClick={() => {
            setSkill('');
            setInterest('');
            setSuggestions([]);
          }}>
            Clear
          </button>

          {/* Show saved project button if there are any */}
          {savedProjects.length > 0 && (
            <button 
              onClick={() => setIsSavedModalOpen(true)}
              style={{
                marginTop: '20px',
                backgroundColor: '#ff5722',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              View Saved Projects ({savedProjects.length})
            </button>
          )}
           {savedProjects.length > 0 && (
          <button
            onClick={() => {
              setSavedProjects([]);
              localStorage.removeItem("savedProjects");
            }}
            style={{
              marginTop: '10px',
              backgroundColor: '#607d8b',
              color: '#fff',
              padding: '8px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Clear All Saved
          </button>
           )}
        </div>

        {/* Displaying suggested projects */}
        <div style={{ marginTop: "30px" }}>
          <h2>Suggested Mini-Projects:</h2>

          {loading ? (
            <p>Loading projects...</p>
          ) : currentProjects.length > 0 ? (
            <ul>
              {currentProjects.map((project, index) => (
                <li key={index} onClick={() => setSelectedProject(project)}>
                  <strong>{project.idea}</strong><br />
                  <span>Difficulty: {project.difficulty}</span><br />
                  <span>Time: {project.timeEstimate}</span><br />
                  <span>Tags: {project.tags.join(", ")}</span>
                  <p><strong>{project.title}</strong></p>

                  {/* Save project button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveProject(project);
                    }}
                    style={{
                      marginTop: '8px',
                      backgroundColor: '#ff9800',
                      listStyle:'none',
                      color: '#fff',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Save for Later
                  </button>
                </li>
              ))}

              {/* Detailed project view on click */}
              {selectedProject && (
                <div className={`project-detail ${selectedProject ? 'show' : ''}`}>
                  <h2>{selectedProject.idea}</h2>

                  <div className="project-info">
                    <p><strong>⭐ Difficulty Level:</strong> {selectedProject.difficulty}</p>

                    <p><strong>📜 Quick Guide:</strong></p>
                    <ul>
                      {selectedProject.instructions.split('.').filter(Boolean).map((step, index) => (
                        <li key={index}>{step.trim()}.</li>
                      ))}
                    </ul>

                    <p><strong>🔗 Helpful Resources:</strong></p>
                    <ul>
                      {selectedProject.resources.split(',').map((resource, index) => (
                        <li key={index}>
                          <a href={resource.trim()} target="_blank" rel="noopener noreferrer">
                            {resource.trim()}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </ul>
          ) : (
            !loading && hasSearched&& (

              <p style={{ marginTop: "20px", color: "red", fontWeight: "bold" }}>
              😔 No matching projects found. Try selecting a different skill or interest!
            </p>
            )
          )}

          {/* Pagination UI */}
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

      {/* Modal to show saved projects */}
      {isSavedModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px',
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px 40px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
            position: 'relative',
            textAlign: 'center',
          }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Saved Projects</h2>

            {/* List of saved projects */}
            {savedProjects.length > 0 ? (
              <ul style={{ 
                paddingLeft: '0', 
                listStyle: 'none',
                maxHeight: '300px', 
                overflowY: 'auto', 
                marginBottom: '20px',
              }}>
                {savedProjects.map((project, index) => (
                  <li key={index} style={{
                    backgroundColor: '#e0f7fa',
                    marginBottom: '12px',
                    listStyle:'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    color: '#00695c',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  }}>
                    <strong>{project.idea}</strong><br />
                    <span>Difficulty: {project.difficulty}</span><br />
                    <span>Time Estimate: {project.timeEstimate}</span><br />
                    <span>Tags: {project.tags.join(", ")}</span>
                    <ul>
  {savedProjects.map((project, index) => (
    <li key={index}>
      <strong>{project.idea}</strong> - {project.skills}
      <button
        onClick={() => handleRemoveProject(project.idea)}
        style={{
          marginLeft: '10px',
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          padding: '4px 8px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Remove
      </button>
    </li>
  ))}
</ul>

                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#777' }}>No saved projects yet.</p>
            )}

            {/* Close modal button */}
            <button 
              onClick={() => setIsSavedModalOpen(false)}
              style={{
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '10px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
