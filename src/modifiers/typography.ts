import { cx } from "emotion";
import { ComponentProps } from "react";

export type TypographyProps = Partial<{
  textSize: 1 | 2 | 3 | 4 | 5 | 6;
  textAlignment: "centered" | "justified" | "left" | "right";
  textTransform: "capitalized" | "lowercase" | "uppercase";
  textWeight: "light" | "normal" | "semibold" | "bold";
  italic: boolean;
}>;

export function classNames(props: ComponentProps<any>) {
  return cx({
    [`has-text-${props.textAlignment}`]: props.textAlignment,
    [`has-text-weight-${props.textWeight}`]: props.textWeight,
    [`is-size-${props.textSize}`]: props.textSize,
    [`is-${props.textTransform}`]: props.textTransform,
    "is-italic": props.italic,
  });
}

export function clean({
  textWeight,
  textTransform,
  italic,
  textSize,
  textAlignment,
  ...props
}: ComponentProps<any>) {
  return props;
}
