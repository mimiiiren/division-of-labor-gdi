import React from 'react';
import ChoreInputForm from "@/components/ChoreInputForm"


function Home() {
  return(
    <div>
        <h1>Household Labor Tracker</h1>
        <p className="subtitle">Make invisible work visible. Start the conversation.</p>
      <ChoreInputForm/>
    </div>
    )
 
}

export default Home;