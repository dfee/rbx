import React from "react";

import { noop } from "../../utils";

export interface ModalContextState {
  closeOnBlur: boolean;
  closeOnEsc: boolean;
  onClose: () => void;
}

export const initialState: ModalContextState = {
  closeOnBlur: false,
  closeOnEsc: true,
  onClose: noop,
};

export const ModalContext = React.createContext<ModalContextState>(
  initialState,
);
