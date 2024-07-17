import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Clock.css'; 

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      {currentTime.format('HH:mm:ss')}
    </div>
  );
};

export default Clock;
