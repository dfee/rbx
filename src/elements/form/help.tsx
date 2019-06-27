import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";

export type HelpModifierProps = {
  color?: Variables["colors"];
};

export type HelpProps = HelpersProps & HelpModifierProps;

export const Help = forwardRefAs<HelpProps>(
  ({ className, color, ...rest }, ref) => (
    <Generic
      ref={ref}
      className={classNames("help", { [`is-${color}`]: color }, className)}
      {...rest}
    />
  ),
  { as: "p" },
);

Help.displayName = "Help";
Help.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
