import { canUseDOM as _canUseDom } from "../utils";

// tslint:disable-next-line:variable-name
let __canUseDom = true;

export type MockCanUseDomFunction = typeof _canUseDom & {
  __set: (v: boolean) => void;
};

export const canUseDOM: MockCanUseDomFunction = Object.assign(
  () => __canUseDom,
  {
    __set: (value: boolean) => {
      __canUseDom = value;
    },
  },
);
