import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState({});

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const second = dateObject.getSeconds();

      const currentTime = { hour, minute, second };

      setTime(currentTime);
    }, 1000);
  }, []);
  return (
    <div className=" text-4xl">
      <span>{time.hour}</span> :<span>{time.minute}</span> :
      <span>{time.second}</span>
    </div>
  );
}
