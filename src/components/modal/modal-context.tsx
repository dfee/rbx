import { noop } from "@/utils";
import React from "react";

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
