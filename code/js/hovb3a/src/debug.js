
// an alternative the console.log() working only in the DEBUG mode 
const DEBUG = true;
export const ppp = (...args) => {
    if (DEBUG) {
        const handler = {
            get: (target, prop) => {
                if (prop === 'log') {
                    return function(...args) {
                        console.log('[DEBUG]', ...args);
                    };
                }
                return target[prop];
            }
        };
        const customConsole = new Proxy(console, handler);
        customConsole.log(...args);
    }
}
