import { cx } from "emotion";
import { ComponentProps } from "react";

export type TypographyProps = Partial<{
  textSize: 1 | 2 | 3 | 4 | 5 | 6;
  textAlignment: "centered" | "justified" | "left" | "right";
  textTransform: "capitalized" | "lowercase" | "uppercase";
  textWeight: "light" | "normal" | "semibold" | "bold";
  italic: boolean;
}>;

export default {
  classNames: (props: ComponentProps<any>) =>
    cx({
      [`has-text-${props.textAlignment}`]: props.textAlignment,
      [`has-text-weight-${props.textWeight}`]: props.textWeight,
      [`is-size-${props.textSize}`]: props.textSize,
      [`is-${props.textTransform}`]: props.textTransform,
      "is-italic": props.italic,
    }),

  clean: ({
    textWeight,
    textTransform,
    italic,
    textSize,
    textAlignment,
    ...props
  }: ComponentProps<any>) => props,
};
