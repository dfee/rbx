import React from "react";

import { renderablePropType } from "../prop-types-extensions";

import { forwardRefAs } from "./exotic";
import { HelpersProps } from "./helpers";
import { useTheme } from "./theme";

export type GenericProps = HelpersProps;

export const Generic = forwardRefAs<GenericProps>(
  ({ as, ...rest }, ref) => {
    const { transform } = useTheme();
    return React.createElement(as, { ref, ...transform(rest, "Generic") });
  },
  { as: "div" },
);

Generic.displayName = "Generic";
Generic.propTypes = {
  as: renderablePropType,
};
