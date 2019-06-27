import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

import { useDropdown } from "./dropdown-context";

export type DropdownItemModifierProps = {
  active?: boolean;
  onClick?: React.MouseEventHandler;
};

export type DropdownItemProps = HelpersProps & DropdownItemModifierProps;

export const DropdownItem = forwardRefAs<DropdownItemProps>(
  ({ active, className, onClick, ...rest }, ref) => {
    const ctx = useDropdown();

    const handleClick = React.useCallback(
      (event: React.MouseEvent) => {
        if (onClick !== undefined) {
          onClick(event);
        }
        ctx.setActive(false);
      },
      [ctx, onClick],
    );

    return (
      <Generic
        ref={ref}
        className={classNames(
          "dropdown-item",
          { "is-active": active },
          className,
        )}
        onClick={handleClick}
        {...rest}
      />
    );
  },
  { as: "a" },
);

DropdownItem.displayName = "Dropdown.Item";
DropdownItem.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
