import { shallow } from "enzyme";
import { JSDOM } from "jsdom";
import React from "react";

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

export const hasProperties = (
  component: React.ReactType<any>,
  obj: { [s: string]: any },
) =>
  Object.entries(obj).map(([name, value]) =>
    it(`should have property ${name}`, () => {
      expect(component[name]).toEqual(value);
    }),
  );

export const makeContextFactory = <P extends {}>(initial: P) => (
  overrides?: Partial<P>,
) =>
  Object.entries(initial)
    .map(([key, value]) => ({
      [key]: overrides ? overrides[key] || value : value,
    }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {}) as P;

export const shallowInContext = <P, T>(
  Component: React.ComponentType<P>,
  context: T,
  props: P,
) => {
  const outer = shallow(<Component {...props} />);
  const Children = outer.props().children;
  return shallow(<Children {...context} />);
};
