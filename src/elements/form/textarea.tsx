import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";

export const TEXTAREA_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
  states: ["focused", "hovered"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TextareaVariablesOverrides {}

export interface TextareaVariablesDefaults {
  sizes: (typeof TEXTAREA_DEFAULTS["sizes"])[number];
  states: (typeof TEXTAREA_DEFAULTS["states"])[number];
}

export type TextareaVariables = Prefer<
  TextareaVariablesOverrides,
  TextareaVariablesDefaults
>;

export type TextareaModifierProps = {
  color?: Variables["colors"];
  fixedSize?: boolean;
  size?: TextareaVariables["sizes"];
  state?: TextareaVariables["states"];
};

export type TextareaProps = HelpersProps & TextareaModifierProps;

export const Textarea = forwardRefAs<TextareaProps>(
  ({ className, color, fixedSize, size, state, ...rest }, ref) => (
    <Generic
      ref={ref}
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
      {...rest}
    />
  ),
  {
    as: "textarea",
    rows: 4,
  },
);

Textarea.displayName = "Textarea";
Textarea.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fixedSize: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
