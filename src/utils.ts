import React from "react";

export const canUseDOM = () =>
  !(
    window === undefined ||
    window.document === undefined ||
    window.document.createElement === undefined
  );

export const combineRefs = <T>(
  ...refs: (React.Ref<T> | null | undefined)[]
) => {
  return (instance: T | null) => {
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
};

export const noop = () => {}; // tslint:disable-line:no-empty

export type Lit = string | number | boolean | undefined | null | void | {};

export const tuple = <T extends Lit[]>(...args: T) => args;
