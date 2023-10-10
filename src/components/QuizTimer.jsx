import React, { useState, useEffect } from 'react';
import './Timer.css';
import { useNavigate } from 'react-router-dom';



function QuizTimer(props) {
  const [timeRemaining, setTimeRemaining] = useState(60); // 60 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);

const navigate = useNavigate()
  useEffect(() => {
    let timer;

    if (isTimerRunning) {
      timer = setInterval(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1);
        } else {
          props.handleTimerEnd();
          clearInterval(timer);
          setIsTimerRunning(false); // Stop the timer
          
         alert("time up" + props.score)
        
        
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timeRemaining, isTimerRunning,props]);

  


  return (
    <>
    <div className="quiz-timer">
      <h2>Time Remaining: {timeRemaining} seconds</h2>
      {/* <button onClick={handleStopTimerClick}>Stop Timer</button> */}

      {/* Render the modal when showModal is true */}
     
    </div>
     
     </>
  );
}

export default QuizTimer;
