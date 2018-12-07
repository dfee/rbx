import { noop } from "@/utils";
import React from "react";

export interface DropdownContextState {
  active: boolean;
  setActive: (value: boolean) => void;
}

export const initialState: DropdownContextState = {
  active: false,
  setActive: noop,
};

export const DropdownContext = React.createContext<DropdownContextState>(
  initialState,
);
