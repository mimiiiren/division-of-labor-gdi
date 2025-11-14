// 3 different hooks
import React, { useState, useEffect, useRef } from 'react';
import '@/components/ui/Stopwatch.css'

function Stopwatch({clockedInTime}) {
    // current timer is false, not currently running
    const [isRunning, setIsRunning] = useState(false);
    // how much time has elapsed, for 0 miliseconds
    const [elapsedTime, setElapsedTime] = useState(0);
    // work with intervals
    const intervalIdRef = useRef(null);
    // store startTime as 0 miliseconds
    const startTimeRef = useRef(0);
// pass in function and dependency array with one state variable of isRunning
    useEffect(() => {

        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }
        // clean up function that clears the time
        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);
    function start() {
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function stop() {
        setIsRunning(false);
        if (clockedInTime) {
            clockedInTime(elapsedTime);
        }
               setElapsedTime(0);
    }
    function formatTime() {
        // convert to hours, mins, seconds
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
         let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
// add leading zeros
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    }
    return (
        <div className="stopwatch">
            <div className="display">
                {formatTime()}
            </div>
            <button type="button" onClick={start} className="clock-in">Start Grinding</button>
             <button type="button" onClick={stop} className="clock-out">Done!</button>

    </div>
    );
}

export default Stopwatch;