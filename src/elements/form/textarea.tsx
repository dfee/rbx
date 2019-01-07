import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Colors, COLORS } from "../../base/helpers";
import { tuple } from "../../utils";

export const TEXTAREA_SIZES = tuple("small", "medium", "large");
export type TextareaSizes = (typeof TEXTAREA_SIZES)[number];

export const TEXTAREA_STATES = tuple("focused", "hovered");
export type TextareaStates = (typeof TEXTAREA_STATES)[number];

export type TextareaModifierProps = Partial<{
  color: Colors;
  fixedSize: boolean;
  size: TextareaSizes;
  state: TextareaStates;
}>;

export type TextareaProps = HelpersProps & TextareaModifierProps;

const propTypes = {
  color: PropTypes.oneOf(COLORS),
  fixedSize: PropTypes.bool,
  size: PropTypes.oneOf(TEXTAREA_SIZES),
  state: PropTypes.oneOf(TEXTAREA_STATES),
};

export const Textarea = Object.assign(
  forwardRefAs<TextareaProps, "textarea">(
    ({ className, color, fixedSize, size, state, ...rest }, ref) => (
      <Generic
        className={classNames(
          "textarea",
          {
            "has-fixed-size": fixedSize,
            [`is-${color}`]: color,
            [`is-${size}`]: size,
            [`is-${state}`]: state,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    {
      as: "textarea",
      rows: 4,
    },
  ),
  { propTypes },
);
