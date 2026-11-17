import { useState, useEffect } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(
      () => setDebouncedValue(value),
      value === "" ? 0 : delay,
    );
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return value === "" ? "" : debouncedValue;
}
