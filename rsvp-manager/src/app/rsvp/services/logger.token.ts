import { InjectionToken } from '@angular/core';
import { Logger } from './logger.interface';

/**
 * LOGGER_TOKEN is an Angular InjectionToken used to abstract away
 * the Logger interface so you can inject different implementations
 * (e.g., ConsoleLogger, MockLogger) in a clean, testable way.
 */
export const LOGGER_TOKEN = new InjectionToken<Logger>('Logger');
