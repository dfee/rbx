import * as React from "react";

import { renderablePropType } from "src/prop-types-extensions";
import { forwardRefAs } from "./exotic";
import { HelpersProps } from "./helpers";
import { ThemeContext } from "./theme";

export type GenericProps = HelpersProps;

export const propTypes = {
  as: renderablePropType,
};

export const Generic = Object.assign(
  forwardRefAs<GenericProps, "div">(
    ({ as, ...rest }, ref) => (
      <ThemeContext.Consumer>
        {({ transform }) => {
          const transformed = transform(rest, "Generic");

          return as !== undefined
            ? React.createElement(as, { ref, ...transformed })
            : /* istanbul ignore next: typescript typecheck */ undefined;
        }}
      </ThemeContext.Consumer>
    ),
    { as: "div" },
  ),
  { propTypes },
);
