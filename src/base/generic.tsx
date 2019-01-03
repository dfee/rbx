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

          // tslint:disable-next-line:no-non-null-assertion
          return React.createElement(as!, { ref, ...transformed });
        }}
      </ThemeContext.Consumer>
    ),
    { as: "div" },
  ),
  { propTypes },
);
