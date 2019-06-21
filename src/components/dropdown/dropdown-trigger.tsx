import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useCallback } from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

import { useDropdown } from "./dropdown-context";

export type DropdownTriggerModifierProps = {
  onClick?: React.MouseEventHandler;
};

export type DropdownTriggerProps = HelpersProps & DropdownTriggerModifierProps;

export const DropdownTrigger = forwardRefAs<DropdownTriggerProps>(
  ({ className, onClick, ...rest }, ref) => {
    const ctx = useDropdown();

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        if (onClick !== undefined) {
          onClick(event);
        }
        ctx.setActive(!ctx.active);
      },
      [ctx, onClick],
    );

    return (
      <Generic
        ref={ref}
        className={classNames("dropdown-trigger", className)}
        onClick={handleClick}
        {...rest}
      />
    );
  },
  { as: "div" },
);

DropdownTrigger.displayName = "Dropdown.Trigger";
DropdownTrigger.propTypes = {
  onClick: PropTypes.func,
};
