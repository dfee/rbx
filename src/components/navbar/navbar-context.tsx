import { noop } from "@/utils";
import React from "react";

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
