import { cx } from "emotion";

import { makeTransform } from "./utils";

export type TypographyProps = Partial<{
  italic: boolean;
  textAlignment: "centered" | "justified" | "left" | "right";
  textSize: 1 | 2 | 3 | 4 | 5 | 6;
  textTransform: "capitalized" | "lowercase" | "uppercase";
  textWeight: "light" | "normal" | "semibold" | "bold";
}>;

export const transformTypographyModifiers = makeTransform<TypographyProps>(
  props =>
    cx(props.className, {
      [`has-text-${props.textAlignment}`]: props.textAlignment,
      [`has-text-weight-${props.textWeight}`]: props.textWeight,
      [`is-size-${props.textSize}`]: !!props.textSize,
      [`is-${props.textTransform}`]: props.textTransform,
      "is-italic": props.italic,
    }),
  ["textWeight", "textTransform", "italic", "textSize", "textAlignment"],
);
