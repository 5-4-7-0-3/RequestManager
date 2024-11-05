import axios from "axios";

type UpdateResultsCallback = (results: number[]) => void;

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
const DEFAULT_CONCURRENCY =
  Number(process.env.REACT_APP_DEFAULT_CONCURRENCY) || 10;
const REQUEST_LIMIT_PER_SECOND =
  Number(process.env.REACT_APP_REQUEST_LIMIT_PER_SECOND) || 10;
const MAX_REQUESTS = Number(process.env.REACT_APP_MAX_REQUESTS) || 1000;

class RequestService {
  private concurrencyLimit: number;
  private requestLimitPerSecond: number;
  private activeRequests: number = 0;
  private completedRequests: number = 0;
  private results: number[] = [];

  constructor(
    concurrencyLimit: number = DEFAULT_CONCURRENCY,
    requestLimitPerSecond: number = REQUEST_LIMIT_PER_SECOND
  ) {
    this.concurrencyLimit = concurrencyLimit;
    this.requestLimitPerSecond = requestLimitPerSecond;
  }

  private async sendRequest(index: number): Promise<void> {
    try {
      const response = await axios.post<{ index: number }>(`${API_URL}`, {
        index,
      });
      this.results.push(response.data.index);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      this.activeRequests--;
    }
  }

  public startRequests(onUpdateResults: UpdateResultsCallback): void {
    const intervalId = setInterval(() => {
      if (this.completedRequests >= MAX_REQUESTS) {
        clearInterval(intervalId);
        return;
      }

      for (let i = 0; i < this.concurrencyLimit; i++) {
        if (
          this.activeRequests < this.concurrencyLimit &&
          this.completedRequests < MAX_REQUESTS
        ) {
          this.activeRequests++;
          this.completedRequests++;
          this.sendRequest(this.completedRequests).then(() =>
            onUpdateResults([...this.results])
          );
        }
      }
    }, 1000 / this.requestLimitPerSecond);
  }
}

export default RequestService;
