import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DropdownContext } from "./dropdown-context";

export type DropdownItemModifierProps = Partial<{
  active: boolean;
  onClick: React.MouseEventHandler<any>;
}>;

export type DropdownItemProps = HelpersProps & DropdownItemModifierProps;

const propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const DropdownItem = Object.assign(
  forwardRefAs<DropdownItemProps, "a">(
    ({ active, className, onClick, ...rest }, ref) => (
      <DropdownContext.Consumer>
        {ctx => (
          <Generic
            className={classNames(
              "dropdown-item",
              { "is-active": active },
              className,
            )}
            onClick={(event: React.MouseEvent<any>) => {
              if (onClick) {
                onClick(event);
              }
              ctx.setActive(false);
            }}
            ref={ref}
            {...rest}
          />
        )}
      </DropdownContext.Consumer>
    ),
    { as: "a" },
  ),
  { propTypes },
);
