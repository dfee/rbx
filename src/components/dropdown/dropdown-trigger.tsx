import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { DropdownContext } from "./dropdown-context";

export type DropdownTriggerModifierProps = Partial<{
  onClick: React.MouseEventHandler<any>;
}>;

const propTypes = {
  onClick: PropTypes.func,
};

export type DropdownTriggerProps = HelpersProps & DropdownTriggerModifierProps;

export const DropdownTrigger = Object.assign(
  forwardRefAs<DropdownTriggerProps, "div">(
    ({ className, onClick, ...rest }, ref) => (
      <DropdownContext.Consumer>
        {({ active, setActive }) => (
          <Generic
            className={classNames("dropdown-trigger", className)}
            onClick={(event: React.MouseEvent<any>) => {
              if (onClick) {
                onClick(event);
              }
              setActive(!active);
            }}
            ref={ref}
            {...rest}
          />
        )}
      </DropdownContext.Consumer>
    ),
    { as: "div" },
  ),
  { propTypes },
);
