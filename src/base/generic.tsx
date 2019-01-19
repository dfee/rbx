import React from "react";

import { renderablePropType } from "../prop-types-extensions";
import { forwardRefAs } from "./exotic";
import { HelpersProps } from "./helpers";
import { ThemeContext } from "./theme";

export type GenericProps = HelpersProps;

export const Generic = forwardRefAs<GenericProps>(
  ({ as, ...rest }, ref) => (
    <ThemeContext.Consumer>
      {({ transform }) =>
        React.createElement(as, { ref, ...transform(rest, "Generic") })
      }
    </ThemeContext.Consumer>
  ),
  { as: "div" },
);

Generic.displayName = "Generic";
Generic.propTypes = {
  as: renderablePropType,
};
