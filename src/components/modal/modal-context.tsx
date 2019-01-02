import React from "react";

import { noop } from "../../utils";

export interface ModalContextValue {
  close: () => void;
  closeOnBlur: boolean;
  closeOnEsc: boolean;
}

export const initialValue: ModalContextValue = {
  close: noop,
  closeOnBlur: false,
  closeOnEsc: true,
};

export const ModalContext = React.createContext<ModalContextValue>(
  initialValue,
);
