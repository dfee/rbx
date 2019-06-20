import React, { useContext } from "react";

import { noop } from "../../utils";

export interface ModalContextValue {
  closeOnBlur: boolean;
  closeOnEsc: boolean;
  close(): void;
}

export const initialValue: ModalContextValue = {
  close: noop,
  closeOnBlur: false,
  closeOnEsc: true,
};

export const ModalContext = React.createContext<ModalContextValue>(
  initialValue,
);

export const useModal = () => useContext(ModalContext);
