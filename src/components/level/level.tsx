import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";

import { LevelItem } from "./level-item";

export type LevelModifierProps = {
  breakpoint?: Variables["breakpoints"];
};

export type LevelProps = HelpersProps & LevelModifierProps;

export const Level = Object.assign(
  forwardRefAs<LevelProps>(
    ({ breakpoint, className, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames(
          "level",
          { [`is-${breakpoint}`]: breakpoint },
          className,
        )}
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
