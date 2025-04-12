import { Logger } from './logger.interface';

/**
 * ConsoleLogger is a concrete implementation of the Logger interface.
 * It writes log messages to the browser console, prefixed with [RSVP LOG].
 * This is useful for development and debugging.
 */
export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[RSVP LOG]: ${message}`);
  }
}
