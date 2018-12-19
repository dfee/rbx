import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Breakpoints, BREAKPOINTS } from "../../base/helpers";

export type ContainerModifierProps = Partial<{
  breakpoint: Breakpoints;
  fluid: boolean;
}>;

export type ContainerProps = HelpersProps & ContainerModifierProps;

const propTypes = {
  ...genericPropTypes,
  breakpoint: PropTypes.oneOf(BREAKPOINTS),
  fluid: PropTypes.bool,
};

export const Container = Object.assign(
  forwardRefAs<ContainerProps, "div">(
    (props, ref) => {
      const { as, fluid, breakpoint, ...rest } = transformHelpers(props);
      rest.className = classNames("container", rest.className, {
        "is-fluid": fluid,
        [`is-${breakpoint}`]: breakpoint,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes },
);
