import { tuple } from "@/utils";
import { cx } from "emotion";

import { TextAlignments, TextSizes } from "./typography";
import { makeTransform } from "./utils";

export const BREAKPOINTS = tuple(
  "mobile",
  "tablet",
  "desktop",
  "widescreen",
  "fullhd",
  "touch",
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
  display?: {
    only?: boolean;
    value: Displays;
  };
  hide?: {
    only?: boolean;
    value: boolean;
  };
  textAlignment?: {
    only?: boolean;
    value: TextAlignments;
  };
  textSize?: {
    value: TextSizes;
  };
}>;

export type ResponsiveProps = Partial<{
  responsive: Partial<{
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
        .map(([breakpoint, obj]) => {
          const names = {};
          if (obj && obj.display) {
            const { only, value } = obj.display;
            names[`is-${value}-${breakpoint}${only ? "-only" : ""}`] = value;
          }
          if (obj && obj.hide) {
            const { only, value } = obj.hide;
            names[`is-hidden-${breakpoint}${only ? "-only" : ""}`] = value;
          }
          if (obj && obj.textAlignment) {
            const { only, value } = obj.textAlignment;
            names[
              `has-text-${value}-${breakpoint}${only ? "-only" : ""}`
            ] = value;
          }
          if (obj && obj.textSize) {
            const { value } = obj.textSize;
            names[`is-size-${value}-${breakpoint}`] = !!value;
          }
          return names;
        })
        .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
    ) || undefined,
  ["responsive"],
);
