import { cx } from "emotion";
import { ComponentProps } from "react";

export type Colors =
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark"
  | "white"
  | "black"
  | "link";

export type GreyColors =
  | "black-bis"
  | "black-ter"
  | "grey-darker"
  | "grey-dark"
  | "grey"
  | "grey-light"
  | "grey-lighter"
  | "white-ter"
  | "white-bis";

export type ColorsProps = Partial<{
  textColor: Colors | GreyColors;
  backgroundColor: Colors | GreyColors;
}>;

export default {
  classNames: (props: ComponentProps<any>) =>
    cx({
      [`has-text-${props.textColor}`]: props.textColor,
      [`has-background-${props.backgroundColor}`]: props.backgroundColor,
    }),
  clean: ({ textColor, backgroundColor, ...props }: ComponentProps<any>) =>
    props,
};
