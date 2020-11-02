import React, { useEffect, useState } from "react";

export const TimeContext = React.createContext<Date>(new Date());

export const TimeProvider: React.FunctionComponent = (props) => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 500);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <TimeContext.Provider value={time}>{props.children}</TimeContext.Provider>
  );
};
