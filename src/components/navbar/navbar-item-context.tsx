import React from "react";

import { noop } from "../../utils";

export interface NavbarItemContextState {
  active: boolean;
  setActive: (value: boolean) => void;
}

export const initialState: NavbarItemContextState = {
  active: false,
  setActive: noop,
};

export const NavbarItemContext = React.createContext<NavbarItemContextState>(
  initialState,
);
