import React from "react";

import { renderablePropType } from "../prop-types-extensions";
import { forwardRefAs } from "./exotic";
import { HelpersProps } from "./helpers";
import { ThemeContext } from "./theme";

export type GenericProps = HelpersProps;

export const propTypes = {
  as: renderablePropType,
};

export const Generic = Object.assign(
  forwardRefAs<GenericProps, "div">(
    ({ as, ...rest }, ref) => {
      return (
        <ThemeContext.Consumer>
          {({ transform }) => {
            const transformed = transform(rest, "Generic");
            return React.createElement(as!, { ref, ...transformed });
          }}
        </ThemeContext.Consumer>
      );
    },
    { as: "div" },
  ),
  { propTypes },
);
