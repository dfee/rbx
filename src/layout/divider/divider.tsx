import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";

export type DividerModifierProps = {
  children?: string | number;
  color?: Variables["colors"];
  vertical?: boolean;
};

export type DividerProps = HelpersProps & DividerModifierProps;

export const Divider = forwardRefAs<DividerProps>(
  ({ children, className, color, vertical, ...rest }, ref) => (
    <Generic
      className={classNames(
        "is-divider",
        {
          [`is-${color}`]: color,
          ["is-divider-vertical"]: vertical,
        },
        className,
      )}
      data-content={children}
      ref={ref}
      {...rest}
    />
  ),
  {
    as: "div",
    children: "",
  },
);

Divider.displayName = "Divider";
Divider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  vertical: PropTypes.bool,
};
