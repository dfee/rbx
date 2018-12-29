import React from "react";
import { TransformFunc, transformHelpers } from "./helpers";

export interface ThemeContextValue {
  transform: TransformFunc<any>;
}

export const initialValue: ThemeContextValue = {
  transform: transformHelpers,
};

export const ThemeContext = React.createContext<ThemeContextValue>(
  initialValue,
);
