import { writable, derived, readable } from "svelte/store";

export const ipfsNode = writable(0);
export const nodeId = writable(0);
export const nodeAgentVersion = writable(0);
export const nodeProtocolVersion = writable(0);
export const rootHash = writable(0);

export const appSection = writable(0);
export const walletSection = writable(0);
export const username = writable("");
export const password = writable("");
export const pemEncrypted = writable(0);
export const deviceName = writable(0);
export const deviceType = writable(0);
export const error = writable(0);
export const dnsSuccess = writable(0);

export const wallet = writable(0);

// start function is called when the store gets its first subscriber;
export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 250);

  //stop is called when the last subscriber unsubscribes
  return function stop() {
    clearInterval(interval);
  };
});

// ### elaspe timer
// this can be reset with: $start = new Date();
export const start = writable(new Date());

//Derives a store from one or more other stores. Whenever those dependencies change, the callback runs.
export const elapsed = derived([time, start], ([$time, $start]) =>
  Math.max(Math.round(($time - $start) / 250), 2)
);
