import React,{useState} from 'react'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import './Clock.css'

const Clock = () => {
  const [timerExpired, setTimerExpired] = useState(false);
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          setTimerExpired(true);
          return <div className="timer">Too late...</div>;
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
      };
  return (
    <>
     {!timerExpired && (
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: false, delay: 0 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      )}
    

    </>
  )
}

export default Clock