import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs } from "./exotic";
import { HelpersProps } from "./helpers";
import { ThemeContext } from "./theme";

export type GenericProps = HelpersProps;

export const propTypes = {
  /** The component this should render as */
  as: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ render: PropTypes.func.isRequired }),
  ]),
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
