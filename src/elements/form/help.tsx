import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DEFAULTS, Variables } from "../../base/helpers/variables";

export type HelpModifierProps = Partial<{
  color: Variables["Colors"];
}>;

export type HelpProps = HelpersProps & HelpModifierProps;

const propTypes = {
  color: PropTypes.oneOf(DEFAULTS.colors),
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
