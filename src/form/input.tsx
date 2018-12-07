import { cx } from "emotion";
import React from "react";

import { Generic } from "@/generic";
import { ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";

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
  disabled: boolean;
  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: string;
  placeholder: string;
  readOnly: boolean;
  rounded: boolean;
  size: InputSizes;
  state: InputStates;
  static: boolean;
  type: InputTypes;
  value: string;
}>;

export type InputProps = Prefer<
  ModifierProps & InputModifierProps,
  React.HTMLAttributes<HTMLInputElement>
>;

type InputControllerProps = InputProps & {
  innerRef: React.Ref<HTMLInputElement>;
};

class InputController extends React.PureComponent<InputControllerProps> {
  public static defaultProps = {
    disabled: false,
    readOnly: false,
    static: false,
    type: "text",
  };

  public render() {
    const {
      className,
      color,
      disabled,
      innerRef,
      name,
      placeholder,
      readOnly,
      rounded,
      size,
      state,
      static: isStatic,
      type,
      value,
      ...props
    } = this.props;
    return (
      <Generic<"input">
        {...props}
        ref={innerRef}
        as="input"
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly || isStatic}
        disabled={disabled}
        className={cx("input", className, {
          [`is-${color}`]: color,
          "is-rounded": rounded,
          [`is-${size}`]: size,
          "is-static": isStatic,
          [`is-${state}`]: state,
        })}
      />
    );
  }
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <InputController innerRef={ref} {...props} />,
);
