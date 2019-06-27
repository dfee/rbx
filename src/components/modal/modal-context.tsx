import * as React from "react";

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

export const useModal = () => React.useContext(ModalContext);
