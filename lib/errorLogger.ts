/**
 * Centralized error logging utility
 * In production, this can be integrated with services like Sentry, LogRocket, etc.
 */

export enum ErrorLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

interface ErrorLogEntry {
  level: ErrorLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
  timestamp: string;
}

class ErrorLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  log(level: ErrorLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const logEntry: ErrorLogEntry = {
      level,
      message,
      context,
      error,
      timestamp: new Date().toISOString(),
    };

    // In development, log to console for debugging
    if (this.isDevelopment) {
      const logMethod = this.getConsoleMethod(level);
      logMethod(`[${level}] ${message}`, context || {}, error);
    }

    // TODO: In production, send to error tracking service (e.g., Sentry)
    // Example: Sentry.captureException(error, { level: level.toLowerCase(), extra: context });
  }

  private getConsoleMethod(level: ErrorLevel) {
    switch (level) {
      case ErrorLevel.CRITICAL:
        return console.error;
      case ErrorLevel.ERROR:
        return console.error;
      case ErrorLevel.WARN:
        return console.warn;
      case ErrorLevel.INFO:
        return console.info;
      default:
        return console.log;
    }
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log(ErrorLevel.INFO, message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log(ErrorLevel.WARN, message, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log(ErrorLevel.ERROR, message, context, error);
  }

  critical(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log(ErrorLevel.CRITICAL, message, context, error);
  }
}

export const errorLogger = new ErrorLogger();
