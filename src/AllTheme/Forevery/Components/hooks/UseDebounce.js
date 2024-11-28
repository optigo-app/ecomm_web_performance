import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debouncedSetValue = useCallback(
    debounce((newValue) => {
      setDebouncedValue(newValue);
    }, delay),
    [delay]
  );

  useEffect(() => {
    debouncedSetValue(value);
  }, [value, debouncedSetValue]);

  return debouncedValue;
};

export default useDebounce;
