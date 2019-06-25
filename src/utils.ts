import React, { Component as _Component } from "react";

export const canReceiveRef = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: keyof JSX.IntrinsicElements | React.ComponentType<any>,
) => {
  // JSX Element (e.g. 'div', 'span', 'svg', etc.)
  if (typeof Component === "string") {
    return true;
  }
  // React Component Class
  if (Object.getPrototypeOf(Component) === _Component) {
    return true;
  }
  // ForwardRef func (has render function property)
  if (typeof Component === "object" && "render" in Component) {
    return true;
  }
  return false;
};

export const canUseDOM = () =>
  !(
    typeof window === "undefined" || // tslint:disable-line:no-typeof-undefined
    window.document === undefined ||
    window.document.createElement === undefined
  );

export const combineRefs = <T>(
  ...refs: (React.Ref<T> | null | undefined)[]
) => (instance: T | null) => {
  for (const item of refs) {
    if (item === null || item === undefined) {
      continue;
    }

    if (typeof item === "object") {
      (item as React.MutableRefObject<T | null>).current = instance;
    } else {
      item(instance);
    }
  }
};

export const noop = () => {}; // tslint:disable-line:no-empty
