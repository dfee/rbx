import { tuple } from "@/utils";
import { cx } from "emotion";

import { makeModify } from "./utils";

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
  textColor: Colors | GreyColors;
  backgroundColor: Colors | GreyColors;
}>;

export const modify = makeModify<ColorsProps>(
  props =>
    cx(props.className, {
      [`has-text-${props.textColor}`]: props.textColor,
      [`has-background-${props.backgroundColor}`]: props.backgroundColor,
    }),
  ["backgroundColor", "textColor"],
);
