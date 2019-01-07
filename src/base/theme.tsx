import React from "react";
import { HelpersProps, TransformFunc, transformHelpers } from "./helpers";

export interface ThemeContextValue<T = HelpersProps> {
  transform: TransformFunc<T>;
}

export const initialValue: ThemeContextValue = {
  transform: transformHelpers,
};

export const ThemeContext = React.createContext(initialValue);
