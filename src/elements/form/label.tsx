import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { tuple } from "../../utils";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";

export const LABEL_SIZES = tuple("small", "medium", "large");
export type LabelSizes = (typeof LABEL_SIZES)[number];

export type LabelModifierProps = Partial<{
  disabled: boolean;
  size: LabelSizes;
}>;

export type LabelProps = HelpersProps & LabelModifierProps;

const propTypes = {
  ...genericPropTypes,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(LABEL_SIZES),
};

export const Label = Object.assign(
  forwardRefAs<LabelProps, "label">(
    (props, ref) => {
      const { as, disabled, size, ...rest } = transformHelpers(props);
      let kind = "label";
      React.Children.forEach(rest.children, (child, i) => {
        if (typeof child === "object") {
          if (
            child.type === Checkbox ||
            (child.type === "input" && child.props.type === "checkbox")
          ) {
            kind = "checkbox";
          } else if (
            child.type === Radio ||
            (child.type === "input" && child.props.type === "radio")
          ) {
            kind = "radio";
          }
        }
      });
      rest.className = classNames(rest.className, {
        "is-disabled": disabled,
        [`is-${size}`]: size,
        [`${kind}`]: kind,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "label" },
  ),
  { propTypes },
);
