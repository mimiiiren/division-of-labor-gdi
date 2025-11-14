import React from 'react';
import ChoreInputForm from "@/components/ChoreInputForm"
import Logo from '../assets/DOL_ver_3.png';
import '../components/ui/Home.css'


function Home() {
  return(
    <div className="homepage">
          <img src={Logo} alt="HomeTeam Logo" className="logo" />
          {/* Animated background spheres */}
          <div className="sun"></div>
          <div className="sun2"></div>
      <div className="sun3"></div>
      <div className="header">
        <h1>Household Labor Tracker</h1>
        <p className="subtitle">Make invisible work visible. Start the conversation.</p>
        </div>
      <ChoreInputForm/>
    </div>
    )
 
}

export default Home;