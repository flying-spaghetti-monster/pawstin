import { useEffect, useState } from 'react';


import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function cp(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
