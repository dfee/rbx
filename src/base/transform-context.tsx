import React from "react";
import { TransformFunc, transformHelpers } from "./helpers";

export interface TransformContextState {
  transform: TransformFunc<any>;
}

export const initialState: TransformContextState = {
  transform: transformHelpers,
};

export const TransformContext = React.createContext<TransformContextState>(
  initialState,
);
