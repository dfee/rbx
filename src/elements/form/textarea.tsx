import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const TEXTAREA_DEFAULTS = {
  sizes: tuple("small", "medium", "large"),
  states: tuple("focused", "hovered"),
};

export interface TextareaVariablesOverrides {}

export interface TextareaVariablesDefaults {
  sizes: (typeof TEXTAREA_DEFAULTS["sizes"])[number];
  states: (typeof TEXTAREA_DEFAULTS["states"])[number];
}

export type TextareaVariables = Prefer<
  TextareaVariablesOverrides,
  TextareaVariablesDefaults
>;

export type TextareaModifierProps = Partial<{
  color: Variables["colors"];
  fixedSize: boolean;
  size: TextareaVariables["sizes"];
  state: TextareaVariables["states"];
}>;

export type TextareaProps = HelpersProps & TextareaModifierProps;

const propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fixedSize: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
