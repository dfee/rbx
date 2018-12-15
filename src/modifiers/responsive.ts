import classNames from "classnames";

import { tuple } from "../utils";
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

export type LimitiedResponsiveBreakpointProps = Partial<{
  display: {
    value: Displays;
  };
  hide: {
    value: boolean;
  };
  textAlignment: {
    value: TextAlignments;
  };
  textSize: {
    value: TextSizes;
  };
}>;

export type ResponsiveBreakpointProps = Partial<{
  display: {
    only?: boolean;
    value: Displays;
  };
  hide: {
    only?: boolean;
    value: boolean;
  };
  textAlignment: {
    only?: boolean;
    value: TextAlignments;
  };
  textSize: {
    only?: boolean;
    value: TextSizes;
  };
}>;

export type ResponsiveProps = Partial<{
  responsive: Partial<{
    mobile: LimitiedResponsiveBreakpointProps;
    tablet: ResponsiveBreakpointProps;
    desktop: ResponsiveBreakpointProps;
    widescreen: ResponsiveBreakpointProps;
    fullhd: LimitiedResponsiveBreakpointProps;
    touch: LimitiedResponsiveBreakpointProps;
  }>;
}>;

export const transformResponsiveModifiers = makeTransform<ResponsiveProps>(
  props => {
    return classNames(
      props.className,
      props.responsive &&
        Object.keys(props.responsive)
          .filter(breakpoint => props.responsive![breakpoint])
          .map(breakpoint => {
            const names = {};
            const {
              display,
              hide,
              textAlignment,
              textSize,
            } = props.responsive![breakpoint] as
              | ResponsiveBreakpointProps
              | LimitiedResponsiveBreakpointProps;
            if (display) {
              const value = display.value;
              const only = "only" in display ? display.only : false;
              names[`is-${value}-${breakpoint}${only ? "-only" : ""}`] = value;
            }
            if (hide) {
              const value = hide.value;
              const only = "only" in hide ? hide.only : false;
              names[`is-hidden-${breakpoint}${only ? "-only" : ""}`] = value;
            }
            if (textAlignment) {
              const value = textAlignment.value;
              const only = "only" in textAlignment ? textAlignment.only : false;
              names[
                `has-text-${value}-${breakpoint}${only ? "-only" : ""}`
              ] = value;
            }
            if (textSize) {
              const value = textSize.value;
              const only = "only" in textSize ? textSize.only : false;
              names[
                `is-size-${value}-${breakpoint}${only ? "-only" : ""}`
              ] = !!value;
            }
            return names;
          })
          .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
    );
  },
  ["responsive"],
);
