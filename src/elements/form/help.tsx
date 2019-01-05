import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { Colors, COLORS } from "src/base/helpers";

export type HelpModifierProps = Partial<{
  color: Colors;
}>;

export type HelpProps = HelpersProps & HelpModifierProps;

const propTypes = {
  color: PropTypes.oneOf(COLORS),
};

export const Help = Object.assign(
  forwardRefAs<HelpProps, "p">(
    ({ className, color, ...rest }, ref) => (
      <Generic
        className={classNames("help", { [`is-${color}`]: color }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "p" },
  ),
  { propTypes },
);
