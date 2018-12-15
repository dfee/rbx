import classNames from "classnames";

import { tuple } from "../utils";

/**
 * Float
 */
export const FLOAT_PULLED_ALIGNMENTS = tuple("left", "right");
export type FloatPulledAlignments = (typeof FLOAT_PULLED_ALIGNMENTS)[number];

export type FloatHelpersProps = Partial<{
  /** Fixes an element's floating children */
  clearfix: boolean;
  /** Moves an element to the left or right */
  pull: FloatPulledAlignments;
}>;

export const transformFloatHelpers = <
  P extends object & FloatHelpersProps & { className?: string }
>(
  props: P,
) => {
  const { className: initialClassName, clearfix, pull, ...rest } = props;
  const className =
    classNames(
      {
        "is-clearfix": clearfix,
        [`is-pulled-${pull}`]: pull,
      },
      initialClassName,
    ) || undefined;
  return { className, ...rest };
};

/**
 * Overflow
 */
export type OverflowHelpersProps = Partial<{
  /** Adds overflow hidden */
  clipped: boolean;
}>;

export const transformOverflowHelpers = <
  P extends object & OverflowHelpersProps & { className?: string }
>(
  props: P,
) => {
  const { className: initialClassName, clipped, ...rest } = props;
  const className =
    classNames({ "is-clipped": clipped }, initialClassName) || undefined;
  return { className, ...rest };
};

/**
 * Overlay
 */
export type OverlayHelpersProps = Partial<{
  /** Completely covers the first positioned parent */
  overlay: boolean;
}>;

export const transformOverlayHelpers = <
  P extends object & OverlayHelpersProps & { className?: string }
>(
  props: P,
) => {
  const { className: initialClassName, overlay, ...rest } = props;
  const className =
    classNames({ "is-overlay": overlay }, initialClassName) || undefined;
  return { className, ...rest };
};

/**
 * Typography
 */
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

export const TEXT_ALIGNMENTS = tuple("centered", "justified", "left", "right");
export type TextAlignments = (typeof TEXT_ALIGNMENTS)[number];

export const TEXT_SIZES = tuple(1, 2, 3, 4, 5, 6);
export type TextSizes = (typeof TEXT_SIZES)[number];

export const TEXT_TRANSFORMS = tuple("capitalized", "lowercase", "uppercase");
export type TextTransforms = (typeof TEXT_TRANSFORMS)[number];

export const TEXT_WEIGHTS = tuple("light", "normal", "semibold", "bold");
export type TextWeights = (typeof TEXT_WEIGHTS)[number];

export type TypographyHelpersProps = Partial<{
  backgroundColor: Colors | GreyColors;
  italic: boolean;
  textAlignment: TextAlignments;
  textColor: Colors | GreyColors;
  textSize: TextSizes;
  textTransform: TextTransforms;
  textWeight: TextWeights;
}>;

export const transformTypographyHelpers = <
  P extends object & TypographyHelpersProps & { className?: string }
>(
  props: P,
) => {
  const {
    backgroundColor,
    className: initialClassName,
    italic,
    textAlignment,
    textColor,
    textSize,
    textTransform,
    textWeight,
    ...rest
  } = props;

  const className =
    classNames(
      {
        [`has-background-${backgroundColor}`]: backgroundColor,
        [`has-text-${textColor}`]: textColor,
        "is-italic": italic,
        [`is-${textTransform}`]: textTransform,
        [`has-text-${textAlignment}`]: textAlignment,
        [`has-text-weight-${textWeight}`]: textWeight,
        [`is-size-${textSize}`]: !!textSize,
      },
      initialClassName,
    ) || undefined;

  return { className, ...rest };
};

/**
 * Visibility
 */
export const DISPLAYS = tuple(
  "block",
  "flex",
  "inline",
  "inline-block",
  "inline-flex",
);
export type Displays = (typeof DISPLAYS)[number];

export type VisibilityHelpersProps = Partial<{
  /** Hides an element (unclear on where this is documented in Bulma) */
  hidden: boolean;
  /** Adds visibility hidden */
  invisible: boolean;
  /**
   * Hide elements visually but keep the element available to be announced by a
   * screen reader
   */
  srOnly: boolean;
}>;

export const transformVisibilityHelpers = <
  P extends object & VisibilityHelpersProps & { className?: string }
>(
  props: P,
) => {
  const {
    className: initialClassName,
    hidden,
    invisible,
    srOnly,
    ...rest
  } = props;
  const className =
    classNames(
      {
        "is-hidden": hidden,
        "is-invisible": invisible,
        "is-sr-only": srOnly,
      },
      initialClassName,
    ) || undefined;
  return { className, ...rest };
};

/**
 * Other
 */
export type OtherHelpersProps = Partial<{
  /** Removes any margin */
  marginless: boolean;
  /** Removes any padding */
  paddingless: boolean;
  /** Removes any radius */
  radiusless: boolean;
  /** Removes any shadow */
  shadowless: boolean;
  /** Prevents the text from being selectable */
  unselectable: boolean;
}>;

export const transformOtherHelpers = <
  P extends object & OtherHelpersProps & { className?: string }
>(
  props: P,
) => {
  const {
    className: initialClassName,
    marginless,
    paddingless,
    radiusless,
    shadowless,
    unselectable,
    ...rest
  } = props;

  const className =
    classNames(
      {
        "is-marginless": props.marginless,
        "is-paddingless": props.paddingless,
        "is-radiusless": props.radiusless,
        "is-shadowless": props.shadowless,
        "is-unselectable": props.unselectable,
      },
      initialClassName,
    ) || undefined;

  return { className, ...rest };
};

/**
 * Responsive
 */
export const BREAKPOINTS = tuple(
  "mobile",
  "tablet",
  "desktop",
  "widescreen",
  "fullhd",
  "touch",
);
export type Breakpoints = (typeof BREAKPOINTS)[number];

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

export type ResponsiveHelpersProps = Partial<{
  responsive: Partial<{
    mobile: LimitiedResponsiveBreakpointProps;
    tablet: ResponsiveBreakpointProps;
    desktop: ResponsiveBreakpointProps;
    widescreen: ResponsiveBreakpointProps;
    fullhd: LimitiedResponsiveBreakpointProps;
    touch: LimitiedResponsiveBreakpointProps;
  }>;
}>;

export const transformResponsiveHelpers = <
  P extends object & ResponsiveHelpersProps & { className?: string }
>(
  props: P,
) => {
  const { className: initialClassName, responsive, ...rest } = props;

  const className =
    classNames(
      responsive &&
        Object.keys(responsive)
          .filter(breakpoint => responsive![breakpoint])
          .map(breakpoint => {
            const names = {};
            const { display, hide, textAlignment, textSize } = responsive![
              breakpoint
            ] as ResponsiveBreakpointProps | LimitiedResponsiveBreakpointProps;
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
      initialClassName,
    ) || undefined;

  return { className, ...rest };
};

export type HelpersProps = FloatHelpersProps &
  OverflowHelpersProps &
  OverlayHelpersProps &
  TypographyHelpersProps &
  VisibilityHelpersProps &
  OtherHelpersProps &
  ResponsiveHelpersProps;

export const transformHelpers = <T extends object & { className?: string }>(
  props: T,
): Omit<T, keyof HelpersProps> & { className?: string } =>
  [
    transformFloatHelpers,
    transformOverflowHelpers,
    transformOverlayHelpers,
    transformTypographyHelpers,
    transformVisibilityHelpers,
    transformOtherHelpers,
    transformResponsiveHelpers,
  ].reduce((acc, transformer) => transformer(acc as any), props);
