import React from "react";

import { noop } from "../../utils";

export interface NavbarContextState {
  active: boolean;
  setActive: (value: boolean) => void;
}

export const initialState: NavbarContextState = {
  active: false,
  setActive: noop,
};

export const NavbarContext = React.createContext<NavbarContextState>(
  initialState,
);
