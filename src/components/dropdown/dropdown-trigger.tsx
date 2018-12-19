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

export type DropdownTriggerModifierProps = Partial<{
  onClick: React.MouseEventHandler<any>;
}>;

const propTypes = {
  ...genericPropTypes,
  onClick: PropTypes.func,
};

export type DropdownTriggerProps = HelpersProps & DropdownTriggerModifierProps;

export const DropdownTrigger = Object.assign(
  forwardRefAs<DropdownTriggerProps, "div">(
    (props, ref) => {
      const { as, onClick, ...rest } = transformHelpers(props);
      rest.className = classNames("dropdown-trigger", rest.className);
      return (
        <DropdownContext.Consumer>
          {({ active, setActive }) => {
            return React.createElement(as!, {
              onClick: (event: React.MouseEvent<any>) => {
                if (onClick) {
                  onClick(event);
                }
                setActive(!active);
              },
              ref,
              ...rest,
            });
          }}
        </DropdownContext.Consumer>
      );
    },
    { as: "div" },
  ),
  { propTypes },
);
