import { useEffect, useState } from 'react';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  const onStart = () => {
    setStart((prev) => !prev);
  };

  useEffect(() => {
    if (!start) return;
    const timer = setInterval(() => {
      setTime((prev) => ++prev);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [start]);

  return { time, onStart };
};

export default useTimer;
