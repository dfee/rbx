import * as React from "react";

import { noop } from "src/utils";

export interface NavbarItemContextValue {
  active: boolean;
  setActive(value: boolean): void;
}

export const initialValue: NavbarItemContextValue = {
  active: false,
  setActive: noop,
};

export const NavbarItemContext = React.createContext<NavbarItemContextValue>(
  initialValue,
);
