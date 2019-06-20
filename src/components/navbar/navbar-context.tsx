import React, { useContext } from "react";

import { noop } from "../../utils";

export interface NavbarContextValue {
  active: boolean;
  setActive(value: boolean): void;
}

export const initialValue: NavbarContextValue = {
  active: false,
  setActive: noop,
};

export const NavbarContext = React.createContext<NavbarContextValue>(
  initialValue,
);

export const useNavbar = () => useContext(NavbarContext);
