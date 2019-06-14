import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { DropdownContext, DropdownContextValue } from "./dropdown-context";

export type DropdownItemModifierProps = {
  active?: boolean;
  onClick?: React.MouseEventHandler;
};

export type DropdownItemProps = HelpersProps & DropdownItemModifierProps;

const onClickHandler = (
  onClick: DropdownItemProps["onClick"] | undefined,
  ctx: DropdownContextValue,
) => (event: React.MouseEvent) => {
  if (onClick !== undefined) {
    onClick(event);
  }
  ctx.setActive(false);
};

export const DropdownItem = forwardRefAs<DropdownItemProps>(
  ({ active, className, onClick, ...rest }, ref) => (
    <DropdownContext.Consumer>
      {ctx => (
        <Generic
          className={classNames(
            "dropdown-item",
            { "is-active": active },
            className,
          )}
          onClick={onClickHandler(onClick, ctx)}
          ref={ref}
          {...rest}
        />
      )}
    </DropdownContext.Consumer>
  ),
  { as: "a" },
);

DropdownItem.displayName = "Dropdown.Item";
DropdownItem.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
