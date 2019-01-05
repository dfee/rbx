import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type PanelBlockModifierProps = Partial<{
  active: boolean;
}>;

export type PanelBlockProps = HelpersProps & PanelBlockModifierProps;

const propTypes = {
  active: PropTypes.bool,
};

export const PanelBlock = Object.assign(
  forwardRefAs<PanelBlockProps, "div">(
    ({ active, className, ...rest }, ref) => (
      <Generic
        className={classNames(
          "panel-block",
          { "is-active": active },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  { propTypes },
);
