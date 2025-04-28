import React, { useState } from 'react';
import "../src/App.css";
const App = () => {

  const[skill,setSkill] = useState("");
  const [interest,setInterest] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleFindProjects = () => {
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
  };
  

  //ideas based on intrest and skill
  const projectIdeas = [
    { skill: "Python", interest: "AI/ML", idea: "Build a Spam Email Classifier" },
    { skill: "Python", interest: "Automation", idea: "Create an Auto File Organizer" },
    { skill: "JavaScript", interest: "Web Development", idea: "Make a Portfolio Website" },
    { skill: "Java", interest: "Mobile Apps", idea: "Develop a Note-Taking App" },
    { skill: "JavaScript", interest: "Automation", idea: "Write a Chrome Extension to Auto-fill Forms" },
    { skill: "Java", interest: "AI/ML", idea: "Create a Basic Chatbot" },
  ];
  
  return (
    <div className="container">
  <div className="inner-box">
    <h2>Find My MiniProject</h2>

    <div>
      <label>Choose Your Skill</label><br />
      <select value={skill} onChange={(e) => setSkill(e.target.value)}>
        <option value="">-- Select Skill --</option>
        <option value="Python">Python</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Java">Java</option>
      </select>
    </div>

    <div>
      <label>Choose Your Interest Area</label><br />
      <select value={interest} onChange={(e) => setInterest(e.target.value)}>
        <option>-- Select Interest --</option>
        <option value="Web Development">Web Development</option>
        <option value="AI/ML">AI/ML</option>
        <option value="Mobile Apps">Mobile Apps</option>
        <option value="Automation">Automation</option>
      </select>
    </div>

    <div>
      <button onClick={handleFindProjects}>Find Projects</button>
      <button onClick={() => { setSkill(''); setInterest(''); setSuggestions([]); }}>
  Clear
</button>

    </div>

    <div style={{ marginTop: "30px" }}>
      <h2>Suggested Mini-Projects:</h2>
      {suggestions.length > 0 ? (
        <ul>
          {suggestions.map((project, index) => (
            <li key={index}>{project.idea}</li>
          ))}
        </ul>
      ) : (
        <p>No matching projects yet. Try selecting skill and interest!</p>
      )}
    </div>

  </div>
</div>

  )
}

export default App
