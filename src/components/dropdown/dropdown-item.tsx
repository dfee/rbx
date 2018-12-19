import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { DropdownContext } from "./dropdown-context";

export type DropdownItemModifierProps = Partial<{
  active: boolean;
  onClick: React.MouseEventHandler<any>;
}>;

export type DropdownItemProps = HelpersProps & DropdownItemModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export const DropdownItem = Object.assign(
  forwardRefAs<DropdownItemProps, "a">(
    (props, ref) => {
      const { as, active, onClick, ...rest } = transformHelpers(props);
      rest.className = classNames("dropdown-item", rest.className, {
        "is-active": active,
      });
      return (
        <DropdownContext.Consumer>
          {ctx =>
            React.createElement(as!, {
              onClick: (event: React.MouseEvent<any>) => {
                if (onClick) {
                  onClick(event);
                }
                ctx.setActive(false);
              },
              ref,
              ...rest,
            })
          }
        </DropdownContext.Consumer>
      );
    },
    { as: "a" },
  ),
  { propTypes },
);
