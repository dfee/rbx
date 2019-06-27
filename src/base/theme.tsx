import * as React from "react";

import { HelpersProps, makeRootValidatingTransform } from "./helpers";
import { ValidatingTransformFunction } from "./helpers/factory";
import { DEFAULTS } from "./helpers/variables";

export interface ThemeContextValue<
  TTransformProps extends {} = HelpersProps,
  TNewProps extends {} = {}
> {
  transform: ValidatingTransformFunction<TTransformProps, TNewProps>;
}

export const initialValue: ThemeContextValue = {
  transform: makeRootValidatingTransform(DEFAULTS),
};

export const ThemeContext = React.createContext(initialValue);

export const useTheme = () => React.useContext(ThemeContext);
