import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";
import { LevelItem } from "./level-item";

export type LevelModifierProps = Partial<{
  breakpoint: Variables["breakpoints"];
}>;

export type LevelProps = HelpersProps & LevelModifierProps;

export const Level = Object.assign(
  forwardRefAs<HTMLElement, LevelProps>(
    ({ breakpoint, className, ...rest }, ref) => (
      <Generic
        className={classNames(
          "level",
          { [`is-${breakpoint}`]: breakpoint },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "nav" },
  ),
  { Item: LevelItem },
);

Level.displayName = "Level";
Level.propTypes = {
  breakpoint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
