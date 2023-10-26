import React, { useState, useEffect } from 'react';
import './Timer.css';
import { useNavigate } from 'react-router-dom';
import Poup from './PopupScore/Poup';



function QuizTimer(props) {
  const [timeRemaining, setTimeRemaining] = useState(59); // 60 seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

const navigate = useNavigate()
useEffect(() => {
  let timer;

  if (isTimerRunning) {
    timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        clearInterval(timer);
        setIsTimerRunning(false); // Stop the timer
        setShowPopup(true);
        props.handleTimerEnd(); // Call the handleTimerEnd function
      }
    }, 1000);
  }

  return () => clearInterval(timer);
}, [timeRemaining, isTimerRunning]);


  


  return (
    <>
    <div className="quiz-timer">
      <h2>Time Remaining: {timeRemaining} seconds</h2>
   

    



      {showPopup && (
        <Poup
         showPopup={true}// Make sure you control the modal visibility via a prop (e.g., isOpen)
          onClose={() => {
            setShowPopup(false); // Close the popup
          }}
          scorePoints={props.score} // Pass the score as a prop
        />
      )}


     
    </div>
     
     </>
  );
}

export default QuizTimer;
