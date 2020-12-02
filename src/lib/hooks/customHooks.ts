import React, { useState, useEffect } from "react";

export const useSavedState = (
  key: string,
  defaultValue?: string
): [string | undefined, (value: string) => void, () => void] => {
  const [value, setValue] = React.useState(
    window.localStorage.getItem(key) || defaultValue
  );

  function clear() {
    window.localStorage.removeItem(key);
  }

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue, clear];
};

export const useSessionSavedState = (
  key: string,
  defaultValue?: string
): [string | undefined, (value: string) => void, () => void] => {
  const [value, setValue] = React.useState(
    window.sessionStorage.getItem(key) || defaultValue
  );

  function clear() {
    window.sessionStorage.removeItem(key);
  }

  React.useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue, clear];
};

export const useBaseTime = (): [Date | null, (value: Date | null) => void] => {
  const key = "baseTime";

  const storedTime = window.sessionStorage
    ? window.sessionStorage.getItem(key)
    : null;
  const initialTime: Date | null = storedTime
    ? new Date(Number(storedTime))
    : null;

  const [time, setTime] = React.useState<Date | null>(initialTime);

  React.useEffect(() => {
    if (time) {
      window.sessionStorage.setItem(key, JSON.stringify(time.getTime()));
    } else {
      window.sessionStorage.removeItem(key);
    }
  }, [key, time]);

  return [time, setTime];
};

interface Size {
  width?: number;
  height?: number;
}

export const useWindowSize = () => {
  const [size, setSize] = useState<Size>({});
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
