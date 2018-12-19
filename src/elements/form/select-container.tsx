import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Colors, COLORS } from "../../base/helpers";
import { tuple } from "../../utils";
import { Select } from "./select";

export const SELECT_CONTAINER_SIZES = tuple("small", "medium", "large");
export type SelectContainerSizes = (typeof SELECT_CONTAINER_SIZES)[number];

export const SELECT_CONTAINER_STATES = tuple("focused", "hovered", "loading");
export type SelectContainerStates = (typeof SELECT_CONTAINER_STATES)[number];

export type SelectContainerModifierProps = Partial<{
  color: Colors;
  fullwidth: boolean;
  rounded: boolean;
  size: SelectContainerSizes;
  state: SelectContainerStates;
}>;

export type SelectContainerProps = HelpersProps & SelectContainerModifierProps;

const propTypes = {
  ...genericPropTypes,
  color: PropTypes.oneOf(COLORS),
  fullwidth: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(SELECT_CONTAINER_SIZES),
  state: PropTypes.oneOf(SELECT_CONTAINER_STATES),
};

export const SelectContainer = Object.assign(
  forwardRefAs<SelectContainerProps, "div">(
    (props, ref) => {
      const {
        as,
        children,
        color,
        fullwidth,
        rounded,
        size,
        state,
        ...rest
      } = transformHelpers(props);
      rest.className = classNames("select", rest.className, {
        [`is-${color}`]: color,
        "is-fullwidth": fullwidth,
        "is-loading": state === "loading",
        "is-rounded": rounded,
        [`is-${size}`]: size,
      });

      const mapped = React.Children.map(children, (child, i) => {
        if (
          typeof child === "object" &&
          (child.type === "select" || child.type === Select)
        ) {
          rest.className = classNames(rest.className, {
            "is-multiple": child.props.multiple,
          });
          if (state === "focused" || state === "hovered") {
            return React.cloneElement(child, {
              className: classNames(`is-${state}`, child.props.className),
            });
          }
          return child;
        }
        return child;
      });

      return React.createElement(as!, { children: mapped, ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes },
);
