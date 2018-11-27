import { JSDOM } from "jsdom";

export interface GlobalWithWindow extends NodeJS.Global {
  window?: JSDOM["window"];
}

export function getWindow() {
  return (global as GlobalWithWindow).window!;
}

export function setupWindow() {
  (global as GlobalWithWindow).window = new JSDOM(
    '<html><body><div id="app-root"></div></body></html>',
  ).window;
}

export function teardownWindow() {
  (global as GlobalWithWindow).window = undefined;
}
