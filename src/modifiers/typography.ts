import classNames from "classnames";

import { tuple } from "@/utils";
import { makeTransform } from "./utils";

export const TEXT_ALIGNMENTS = tuple("centered", "justified", "left", "right");
export type TextAlignments = (typeof TEXT_ALIGNMENTS)[number];

export const TEXT_SIZES = tuple(1, 2, 3, 4, 5, 6);
export type TextSizes = (typeof TEXT_SIZES)[number];

export const TEXT_TRANSFORMS = tuple("capitalized", "lowercase", "uppercase");
export type TextTransforms = (typeof TEXT_TRANSFORMS)[number];

export const TEXT_WEIGHTS = tuple("light", "normal", "semibold", "bold");
export type TextWeights = (typeof TEXT_WEIGHTS)[number];

export type TypographyProps = Partial<{
  italic: boolean;
  textAlignment: TextAlignments;
  textSize: TextSizes;
  textTransform: TextTransforms;
  textWeight: TextWeights;
}>;

export const transformTypographyModifiers = makeTransform<TypographyProps>(
  props =>
    classNames(props.className, {
      "is-italic": props.italic,
      [`is-${props.textTransform}`]: props.textTransform,
      [`has-text-${props.textAlignment}`]: props.textAlignment,
      [`has-text-weight-${props.textWeight}`]: props.textWeight,
      [`is-size-${props.textSize}`]: !!props.textSize,
    }),
  ["italic", "textAlignment", "textSize", "textTransform", "textWeight"],
);
