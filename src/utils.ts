export const noop = () => {}; // tslint:disable-line:no-empty

export const canUseDOM = () =>
  !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );

export const tuple = <T extends Lit[]>(...args: T) => args;
