import { cx } from "emotion";
import { ComponentProps } from "react";
import { tuple } from "utils";

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

export function classNames(props: ComponentProps<any>) {
  return cx({
    [`has-text-${props.textColor}`]: props.textColor,
    [`has-background-${props.backgroundColor}`]: props.backgroundColor,
  });
}

export function clean({
  textColor,
  backgroundColor,
  ...props
}: ComponentProps<any>) {
  return props;
}
