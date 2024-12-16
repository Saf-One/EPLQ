type LogLevel = 'info' | 'warn' | 'error';

export function log(level: LogLevel, message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  switch (level) {
    case 'info':
      console.log(logMessage, data);
      break;
    case 'warn':
      console.warn(logMessage, data);
      break;
    case 'error':
      console.error(logMessage, data);
      break;
  }
  
  // Here you can also implement sending logs to a server or saving them to a file
}

