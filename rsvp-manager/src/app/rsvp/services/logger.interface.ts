/**
 * Logger is a generic logging interface that can be implemented by
 * any concrete logging service (e.g., ConsoleLogger, FileLogger, MockLogger).
 * It defines a single method to log messages in a standardized way.
 */
export interface Logger {
    log(message: string): void;
  }
  