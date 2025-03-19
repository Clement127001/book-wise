import { useEffect, useState } from "react";

export function useTimer() {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  return { timer, setTimer };
}
