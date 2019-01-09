import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";

export type HelpModifierProps = Partial<{
  color: Variables["colors"];
}>;

export type HelpProps = HelpersProps & HelpModifierProps;

const propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
