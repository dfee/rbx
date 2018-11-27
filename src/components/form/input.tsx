import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/colors";

export type InputModifierProps = Partial<{
  className: string;
  color: Colors;
  disabled: boolean;
  isStatic: boolean;
  /**
   * The name of the input field Commonly used for [multi-input handling](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: string;
  placeholder: string;
  readOnly: boolean;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
  type:
    | "text"
    | "email"
    | "tel"
    | "password"
    | "number"
    | "search"
    | "color"
    | "date"
    | "time";
  value: string;
}>;

export type InputProps = ModifierProps &
  InputModifierProps &
  Partial<
    Omit<
      React.ComponentPropsWithoutRef<"input">,
      "color" | "size" | "unselectable"
    >
  >;

type InputControllerProps = InputProps & {
  innerRef: React.Ref<HTMLInputElement>;
};

class InputController extends React.PureComponent<InputControllerProps> {
  public static defaultProps = {
    disabled: false,
    isStatic: false,
    readOnly: false,
    type: "text",
  };

  public render() {
    const {
      className,
      color,
      disabled,
      isStatic,
      name,
      placeholder,
      readOnly,
      size,
      type,
      value,
      innerRef,
      ...props
    } = this.props;
    return (
      <Element
        {...props}
        ref={innerRef}
        renderAs="input"
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly || isStatic}
        disabled={disabled}
        className={cx("input", className, {
          "is-static": isStatic,
          [`is-${size}`]: size,
          [`is-${color}`]: color,
        })}
      />
    );
  }
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <InputController innerRef={ref} {...props} />,
);
