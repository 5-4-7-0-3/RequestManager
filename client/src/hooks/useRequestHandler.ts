import { useState } from "react";
import RequestService from "../services/RequestService";

export const useRequestHandler = (defaultConcurrency: number) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);

  const startRequests = (concurrency: number) => {
    setIsRunning(true);
    const requestService = new RequestService(concurrency, concurrency);

    requestService.startRequests((updatedResults) => {
      setResults(updatedResults);
    });

    setIsRunning(false);
  };

  return {
    isRunning,
    results,
    startRequests,
  };
};
