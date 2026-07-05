import { Buffer } from 'buffer';
declare global {
    interface Window {
        Buffer: typeof Buffer;
    }
}
// @coinbase/cdp-hooks pulls in bn.js for elliptic-curve wallet operations,
// which expects Node's Buffer global. Vite doesn't polyfill Node built-ins,
// so it has to be provided manually before anything from the SDK runs.
window.Buffer = window.Buffer || Buffer;