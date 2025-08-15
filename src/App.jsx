import React, { useState, useEffect } from "react";
import music from "/mixkit-classic-alarm-995.wav";
import Spotlium from "./spot"

const CountdownTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  



  // Countdown Logic
  useEffect(() => {
    let timer;
    if (isRunning && totalSeconds > 0) {
      timer = setInterval(() => {
        setTotalSeconds((prev) => prev - 1);
      }, 1000);
    } else if (totalSeconds === 0 && isRunning) {
      clearInterval(timer);
      setIsRunning(false);
      playBeepSound();
    }
    return () => clearInterval(timer);
  }, [isRunning, totalSeconds]);

  // Play Beep Sound
  const playBeepSound = () => {
const beep = new Audio(music);
    beep.play();
    alert("Time's up! ⏰");
  };

  // Start Timer
  const handleStart = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total > 0) {
      setTotalSeconds(total);
      setIsRunning(true);
    }
  };

  // Pause Timer
  const handlePause = () => setIsRunning(false);

  // Reset Timer
  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <>
      <div
        className="flex flex-col items-center p-6 rounded-lg shadow-lg w-80 transition-all dark:bg-gray-900 dark:text-white bg-gray-100 text-black"
      >
        
        
        {/* Timer Display */}
        <h2 className="text-xl font-bold">Countdown Timer</h2>
        <div className="text-3xl font-mono my-4">
          {String(Math.floor(totalSeconds / 3600)).padStart(2, "0")}:
          {String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0")}:
          {String(totalSeconds % 60).padStart(2, "0")}
        </div>

        {/* Inputs */}
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            className="border p-2 rounded w-16 text-center"
            placeholder="Hrs"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
          <input
            type="text"
            className="border p-2 rounded w-16 text-center"
            placeholder="Min"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
          <input
            type="text"
            className="border p-2 rounded w-16 text-center"
            placeholder="Sec"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
        </div>

        {/* Buttons */}
        <div className="mt-4">
          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-4 py-2 mx-1 rounded"
          >
            Start
          </button>
          <button
            onClick={handlePause}
            className="bg-yellow-500 text-white px-4 py-2 mx-1 rounded"
          >
            Pause
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 mx-1 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      {/* <div className="flex justify-center items-center min-h-screen bg-gray-200 dark:bg-gray-800">
        <CountdownTimer />
      </div> */}
      <Spotlium/>
    </>
  );
}

export default App;
