import classNames from "classNames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { Colors, COLORS } from "src/base/helpers";
import { tuple } from "src/utils";

export const INPUT_SIZES = tuple("small", "medium", "large");
export type InputSizes = (typeof INPUT_SIZES)[number];

export const INPUT_STATES = tuple("focused", "hovered");
export type InputStates = (typeof INPUT_STATES)[number];

export const INPUT_TYPES = tuple(
  "text",
  "email",
  "tel",
  "password",
  "number",
  "search",
  "color",
  "date",
  "time",
);
export type InputTypes = (typeof INPUT_TYPES)[number];

export type InputModifierProps = Partial<{
  color: Colors;
  readOnly: React.InputHTMLAttributes<HTMLInputElement>["readOnly"];
  rounded: boolean;
  size: InputSizes;
  state: InputStates;
  // tslint:disable-next-line:no-reserved-keywords
  static: boolean;
  // tslint:disable-next-line:no-reserved-keywords
  type: InputTypes;
}>;

export type InputProps = HelpersProps & InputModifierProps;

const propTypes = {
  color: PropTypes.oneOf(COLORS),
  readOnly: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(INPUT_SIZES),
  state: PropTypes.oneOf(INPUT_STATES),
  static: PropTypes.bool,
  type: PropTypes.oneOf(INPUT_TYPES),
};

export const Input = Object.assign(
  forwardRefAs<InputProps, "input">(
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
  ),
  { propTypes },
);
