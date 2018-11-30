import { tuple } from "@/utils";
import { cx } from "emotion";

import { makeTransform } from "./utils";

export const COLORS = tuple(
  "primary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "dark",
  "white",
  "black",
  "link",
);
export type Colors = (typeof COLORS)[number];

export const GREY_COLORS = tuple(
  "black-bis",
  "black-ter",
  "grey-darker",
  "grey-dark",
  "grey",
  "grey-light",
  "grey-lighter",
  "white-ter",
  "white-bis",
);
export type GreyColors = (typeof GREY_COLORS)[number];

export type ColorsProps = Partial<{
  backgroundColor: Colors | GreyColors;
  textColor: Colors | GreyColors;
}>;

export const transformColorModifiers = makeTransform<ColorsProps>(
  props =>
    cx(props.className, {
      [`has-background-${props.backgroundColor}`]: props.backgroundColor,
      [`has-text-${props.textColor}`]: props.textColor,
    }),
  ["backgroundColor", "textColor"],
);
