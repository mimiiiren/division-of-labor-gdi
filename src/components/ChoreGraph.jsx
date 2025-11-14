import React from 'react';
import '@/components/ui/ChoreGraph.css';

function ChoreGraph({ submissions, totals }) {
  // Calculate total time for each partner
  const partner1Total = submissions
    .filter(sub => sub.name === 'partner_one')
    .reduce((total, sub) => total + sub.timeSpentMs, 0);
  
  const partner2Total = submissions
    .filter(sub => sub.name === 'partner_two')
    .reduce((total, sub) => total + sub.timeSpentMs, 0);

  // Convert to hours for display
  const partner1Hours = (partner1Total / (1000 * 60 * 60)).toFixed(2);
  const partner2Hours = (partner2Total / (1000 * 60 * 60)).toFixed(2);

  // Calculate percentages for visual bar
  const totalTime = partner1Total + partner2Total;
  const partner1Percentage = totalTime > 0 ? (partner1Total / totalTime) * 100 : 50;
  const partner2Percentage = totalTime > 0 ? (partner2Total / totalTime) * 100 : 50;

  return(
    <div className="chore-graph-container">
      <h2>Visual Breakdown</h2>
      
      {/* Bar chart visualization */}
      <div className="bar-chart">
        <div 
          className="bar-segment partner1-bar"
          style={{ width: `${partner1Percentage}%` }}
        >
          Partner 1: {partner1Hours}h
        </div>
        <div 
          className="bar-segment partner2-bar"
          style={{ width: `${partner2Percentage}%` }}
        >
          Partner 2: {partner2Hours}h
        </div>
      </div>

      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <span className="legend-dot partner1-dot">●</span> 
          Partner 1: {partner1Percentage.toFixed(1)}% of total time
        </div>
        <div className="legend-item">
          <span className="legend-dot partner2-dot">●</span> 
          Partner 2: {partner2Percentage.toFixed(1)}% of total time
        </div>
      </div>

      {/* Show breakdown by task */}
      <div className="task-breakdown">
        <h3>Task Breakdown:</h3>
        {submissions.map((sub, index) => (
          <div key={index} className="task-item">
            {sub.name === 'partner_one' ? 'Partner 1' : 'Partner 2'} - {sub.task}: {sub.timeSpent}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChoreGraph;