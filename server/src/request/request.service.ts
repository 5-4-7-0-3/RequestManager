import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class RequestService {
  private requestsPerSecond = 0;
  private readonly RATE_LIMIT = Number(process.env.RATE_LIMIT) || 50;
  private readonly resetInterval = Number(process.env.RESET_INTERVAL) || 1000;
  private resetTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.startResetTimer();
  }

  private startResetTimer() {
    if (this.resetTimeout) {
      clearTimeout(this.resetTimeout);
    }
    this.resetTimeout = setTimeout(() => {
      this.requestsPerSecond = 0;
      this.startResetTimer();
    }, this.resetInterval);
  }

  private checkRateLimit() {
    if (this.requestsPerSecond >= this.RATE_LIMIT) {
      return false;
    }
    this.requestsPerSecond++;
    return true;
  }

  async processRequest(index: number) {
    if (!this.checkRateLimit()) {
      throw new HttpException(
        'Too Many Requests',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const delay = Math.floor(Math.random() * 1000) + 1;
    await this.simulateDelay(delay);

    return { index };
  }

  private simulateDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
