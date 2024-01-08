import React, { useState, useEffect } from "react";
import { TimeModal } from "../utils/goods/TimeModal";




export const Test = () => {
  const [open, setOpen] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const setAlarm = () => {
    const currentTime = new Date();
    const selectedDateTime = new Date(date + 'T' + time);
    const timeDifference = selectedDateTime.getTime() - currentTime.getTime();
  
    setRemainingTime(timeDifference);
  
    setTimeout(() => {
      alert('첫 번째 알람 시간입니다!');
      setRemainingTime(0);         
    }, timeDifference);
  
    setTimeout(() => {
      alert('첫 번째 알람이 종료되었습니다.');
    }, timeDifference + 60000); // 첫 번째 알람 시간에서 1분 추가
  
    setTimeout(() => {
      alert('두 번째 알람 시간입니다!');
      setRemainingTime(0);
    }, timeDifference + 120000); // 첫 번째 알람 시간에서 2분 추가
  
    setTimeout(() => {
      alert('두 번째 알람이 종료되었습니다.');
    }, timeDifference + 180000); // 첫 번째 알람 시간에서 3분 추가
  };

  useEffect(() => {
    let countdownInterval;
    
    if (remainingTime > 0) {
      countdownInterval = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1000);
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [remainingTime]);

  const remainingSeconds = remainingTime / 1000;


  const barStyle = {
    width: '100%',
    height: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const fillStyle = {
    height: '100%',
    backgroundColor: '#7fc6a4',
    width: `${((remainingSeconds % 60) / 60) * 100}%`,
    transition: 'width 1s linear',
  };


  return (
    <div>
    
      <button onClick={()=>{setOpen(true)}}>1</button>
      <TimeModal open1={open}/>
 
    </div>
  );
};
