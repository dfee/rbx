import React from "react";

import { noop } from "../../utils";

export interface DropdownContextValue {
  active: boolean;
  setActive(value: boolean): void;
}

export const initialValue: DropdownContextValue = {
  active: false,
  setActive: noop,
};

export const DropdownContext = React.createContext<DropdownContextValue>(
  initialValue,
);
