import { cx } from "emotion";
import { ComponentProps } from "react";
import { tuple } from "utils";

export const BREAKPOINTS = tuple(
  "mobile",
  "desktop",
  "tablet",
  "widescreen",
  "fullhd",
);
export type Breakpoints = (typeof BREAKPOINTS)[number];

export const DISPLAYS = tuple(
  "block",
  "flex",
  "inline",
  "inline-block",
  "inline-flex",
);
export type Displays = (typeof DISPLAYS)[number];

export type ResponsiveSizeProps = Partial<{
  display: Partial<{
    value: Displays;
    only: boolean;
  }>;
  hide: Partial<{
    value: boolean;
    only: boolean;
  }>;
  textSize: Partial<{
    value: 1 | 2 | 3 | 4 | 5 | 6;
  }>;
  textAlignment: Partial<{
    value: "centered" | "justified" | "left" | "right";
    only: boolean;
  }>;
}>;

export type ResponsivesProps = Partial<{
  responsive: Partial<{
    [key: string]: ResponsiveSizeProps;
    mobile: ResponsiveSizeProps;
    tablet: ResponsiveSizeProps;
    desktop: ResponsiveSizeProps;
    widescreen: ResponsiveSizeProps;
    fullhd: ResponsiveSizeProps;
    touch: ResponsiveSizeProps;
  }>;
}>;

const getSizeClassFromProp = (sizes: ResponsivesProps["responsive"]) => {
  return sizes
    ? Object.keys(sizes).reduce((classes, size) => {
        const display = sizes[size]!.display || {};
        const hide = sizes[size]!.hide || {};
        const textSize = sizes[size]!.textSize || {};
        const textAlignment = sizes[size]!.textAlignment || {};

        const obj = {
          ...classes,
          [`is-${display.value}-${size}${
            display.only ? "-only" : ""
          }`]: display.value,
          [`is-hidden-${size}${hide.only ? "-only" : ""}`]: hide.value,
          [`has-text-${textAlignment.value}-${size}${
            textAlignment.only ? "-only" : ""
          }`]: textAlignment.value,
          [`is-size-${textSize.value}-${size}`]:
            textSize.value !== undefined && textSize.value > 0,
        };

        return obj;
      }, {})
    : {};
};

export default {
  classNames: (props: ComponentProps<any>) =>
    cx({
      ...getSizeClassFromProp(props.responsive || {}),
    }),
  clean: ({ responsive, hide, ...props }: ComponentProps<any>) => props,
};
