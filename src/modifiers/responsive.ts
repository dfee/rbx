import { tuple } from "@/utils";
import { cx } from "emotion";

import { makeTransform } from "./utils";

export const BREAKPOINTS = tuple(
  "mobile",
  "tablet",
  "desktop",
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
  textAlignment: Partial<{
    value: "centered" | "justified" | "left" | "right";
    only: boolean;
  }>;
  textSize: Partial<{
    value: 1 | 2 | 3 | 4 | 5 | 6;
  }>;
}>;

export const RESPONSIVE_SIZES = tuple(
  "mobile",
  "tablet",
  "desktop",
  "widescreen",
  "fullhd",
  "touch",
);
export type ResponsiveSizes = (typeof RESPONSIVE_SIZES)[number];

export type ResponsiveProps = Partial<{
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

export const transformResponsiveModifiers = makeTransform<ResponsiveProps>(
  props =>
    cx(
      props.className,
      Object.entries(props.responsive || {})
        .filter(([size, value]) => value)
        .map(([size, value]) => {
          const display = value!.display || {};
          const hide = value!.hide || {};
          const textSize = value!.textSize || {};
          const textAlignment = value!.textAlignment || {};
          return {
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
        })
        .reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            ...currentValue,
          }),
          {},
        ),
    ) || undefined,
  ["responsive"],
);
