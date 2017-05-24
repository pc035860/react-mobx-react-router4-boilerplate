/* eslint no-console: 0, guard-for-in: 0 */
const noop = function () {};

export function createLogger(showDebug) {
  const log = {};

  const consoleApply = fn => {
    return (...args) => fn.apply(console, args);
  };

  for (const k in console) {
    const v = console[k];
    if (typeof v === 'function') {
      if (k === 'debug' && !showDebug) {
        log[k] = noop;
      }
      else {
        log[k] = consoleApply(v);
      }
    }
  }

  return log;
}

export default createLogger(process.env.NODE_ENV !== 'production');
