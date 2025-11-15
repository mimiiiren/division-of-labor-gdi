import React, { useState } from 'react';
import '@/components/ui/ChoreInputForm.css'
import Stopwatch from './Stopwatch.jsx';
import PieChart from './PieChart.jsx'
import ChoreGraph from './ChoreGraph.jsx';

function ChoreInputForm() {
  const [formData, setFormData] = useState({
    name: '',
    task: '',
    timeSpent: 0
  });

  // Store all submitted entries
  const [submissions, setSubmissions] = useState([]);
  
  // Toggle to show/hide results
  const [showResults, setShowResults] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // Format time
    const hours = Math.floor(formData.timeSpent / (1000 * 60 * 60));
    const minutes = Math.floor(formData.timeSpent / (1000 * 60) % 60);
    const seconds = Math.floor(formData.timeSpent / (1000) % 60);
    
    // Create submission object
    const newSubmission = {
      name: formData.name,
      task: formData.task,
      timeSpent: `${hours}h ${minutes}m ${seconds}s`,
      timeSpentMs: formData.timeSpent
    };
    
    // Add to submissions array
    setSubmissions([...submissions, newSubmission]);
    
    // Show results section
    setShowResults(true);
    
    console.log('Submitted:', newSubmission);
    
    setFormData({ name: '', task: '', timeSpent: 0 });
  }

  function handleElapsedTime(clockedInTime) {
    const minutes = (clockedInTime / (1000 * 60)).toFixed(2);
    console.log('Time tracked:', minutes, 'minutes');
    setFormData((prevFormData) => ({ 
      ...prevFormData, 
      timeSpent: clockedInTime
    }));
  }

  // Calculate total hours per partner
  const calculateHoursByPartner = () => {
    const partner1Total = submissions
      .filter(sub => sub.name === 'partner1')
      .reduce((total, sub) => total + sub.timeSpentMs, 0);
    
    const partner2Total = submissions
      .filter(sub => sub.name === 'partner2')
      .reduce((total, sub) => total + sub.timeSpentMs, 0);
    
    return {
      partner1: (partner1Total / (1000 * 60 * 60)).toFixed(2), // Convert to hours
      partner2: (partner2Total / (1000 * 60 * 60)).toFixed(2)
    };
  };

  const totals = calculateHoursByPartner();

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
         
        <div className="partner-section">
          <label htmlFor="name">Name:</label>
          <select 
            name="name" 
            id="name" 
            value={formData.name}
            onChange={handleChange} 
            required
          >
            <option value="">--Please choose a person--</option>
            <option value="partner_one">Partner 1</option>
            <option value="partner_two">Partner 2</option>
          </select>
        </div>

        <div className="task-entry">
          <label htmlFor="task">Task:</label>
          <select 
            name="task" 
            id="task" 
            value={formData.task}
            onChange={handleChange} 
            required
          >
            <option value="">--Please choose a task--</option>
            <option value="vacuum">Vacuum</option>
            <option value="dishes">Clean the Dishes</option>
          </select>
          <div className="stopwatch">
                <Stopwatch clockedInTime={handleElapsedTime}/>
        </div>
          </div>

        <button type="submit" className="resultsButton">See My Results</button>
      </form>

        
      {/* Results section - only show if there are submissions */}
{showResults && submissions.length > 0 && (
  <div className="results" id="results">
    <h2>Your Household Labor Distribution</h2>

    <div className="submissions-list">
      <h3>All Entries:</h3>
      {submissions.map((sub, index) => (
        <div key={index} className="submission-item">
          <strong>{sub.name === 'partner_one' ? <strong className="partner1">Partner 1</strong> : <strong className="partner2">Partner 2</strong>}</strong> - {sub.task} - {sub.timeSpent}
        </div>

      ))}
                    <div className="chart">
        <PieChart />
            </div>
    </div>
  </div>
)}
    </div>
  );
}

export default ChoreInputForm;