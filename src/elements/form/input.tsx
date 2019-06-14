import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";

export const INPUT_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
  states: ["focused", "hovered"] as const,
  types: [
    "text",
    "email",
    "tel",
    "password",
    "number",
    "search",
    "color",
    "date",
    "time",
  ] as const,
};

export interface InputVariablesOverrides {}

export interface InputVariablesDefaults {
  sizes: (typeof INPUT_DEFAULTS["sizes"])[number];
  states: (typeof INPUT_DEFAULTS["states"])[number];
  types: (typeof INPUT_DEFAULTS["types"])[number];
}

export type InputVariables = Prefer<
  InputVariablesOverrides,
  InputVariablesDefaults
>;

export type InputModifierProps = Partial<{
  color: Variables["colors"];
  readOnly: React.InputHTMLAttributes<HTMLInputElement>["readOnly"];
  rounded: boolean;
  size: InputVariables["sizes"];
  state: InputVariables["states"];
  static: boolean; // tslint:disable-line:no-reserved-keywords
  type: InputVariables["types"]; // tslint:disable-line:no-reserved-keywords
}>;

export type InputProps = HelpersProps & InputModifierProps;

export const Input = forwardRefAs<InputProps>(
  (
    {
      className,
      color,
      readOnly,
      rounded,
      size,
      state,
      static: isStatic,
      ...rest
    },
    ref,
  ) => {
    const isReadOnly = readOnly === true || isStatic === true;

    return (
      <Generic
        className={classNames(
          "input",
          {
            [`is-${color}`]: color,
            "is-rounded": rounded,
            [`is-${size}`]: size,
            "is-static": isStatic,
            [`is-${state}`]: state,
          },
          className,
        )}
        readOnly={isReadOnly}
        ref={ref}
        {...rest}
      />
    );
  },
  { as: "input" },
);

Input.displayName = "Input";
Input.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  static: PropTypes.bool,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
