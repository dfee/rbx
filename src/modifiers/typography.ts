import { cx } from "emotion";

import { makeModify } from "./utils";

export type TypographyProps = Partial<{
  textSize: 1 | 2 | 3 | 4 | 5 | 6;
  textAlignment: "centered" | "justified" | "left" | "right";
  textTransform: "capitalized" | "lowercase" | "uppercase";
  textWeight: "light" | "normal" | "semibold" | "bold";
  italic: boolean;
}>;

export const modify = makeModify<TypographyProps>(
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
