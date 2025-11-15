import React from 'react';
// import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
//This page in a summary of what the app is about and explanation of the survey
import '../components/ui/About.css'
import Logo from '../assets/DOL_ver_3.png';
import Broom from '../assets/broomstick_gif.gif'

function About() {
  return (
    <div className="about-page">
      <img src={Logo} alt="HomeTeam Logo" className="logo" />
      {/* Animated background spheres */}
      <div className="sun"></div>
      <div className="sun2"></div>
      <div className="sun3"></div>
      
      {/* Content box */}
      <div className="container">
       <div className="intro-box">
        {/* Container for gif and text */}
        <div className="content-wrapper">
          <img src={Broom} alt="Broom" className="broom-gif" />
          <div className="text-content">
            <h1 className='text-red-500'>Welcome to HomeTeam</h1><br/><br/>
          <p><span>"I feel like I'm doing everything"</span> is hard to discuss without data.
HomeTeam quantifies household labor so you can have constructive conversations. Each partner independently reports their time spent on tasks and planning responsibilities.
              <br /><br/>
              <strong>The result?</strong> A clear visual breakdown of who's doing what—and who's managing it all. No more guessing. Just data that helps you rebalance together.</p><br/><br/>
            <p><strong className="greenStrong">Ready to see how your home team stacks up?</strong></p><br/>
          </div>
        </div>
        <div className="button-wrapper">
        <Link to="/home" className='start-button'>Begin here!</Link>
        </div>
        </div>
        </div>
    </div>
)}

export default About;
