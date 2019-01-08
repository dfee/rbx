import classNames from "classnames";
import * as PropTypes from "prop-types";

import { tuple } from "../../utils";
import { TransformFunc } from "./types";
import {
  TEXT_ALIGNMENTS,
  TEXT_SIZES,
  TextAlignments,
  TextSizes,
} from "./typography";
import { DISPLAYS, Displays } from "./visibility";

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

export const responsiveBreakpointPropTypes = {
  display: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.oneOf(DISPLAYS).isRequired,
  }),
  hide: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.bool.isRequired,
  }),
  textAlignment: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.oneOf(TEXT_ALIGNMENTS).isRequired,
  }),
  textSize: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.oneOf(TEXT_SIZES).isRequired,
  }),
};

export const limitedResponsiveBreakpointPropTypes = {
  display: PropTypes.shape({
    value: PropTypes.oneOf(DISPLAYS).isRequired,
  }),
  hide: PropTypes.shape({
    value: PropTypes.bool.isRequired,
  }),
  textAlignment: PropTypes.shape({
    value: PropTypes.oneOf(TEXT_ALIGNMENTS).isRequired,
  }),
  textSize: PropTypes.shape({
    value: PropTypes.oneOf(TEXT_SIZES).isRequired,
  }),
};

export const responsiveHelpersPropTypes = {
  responsive: PropTypes.shape({
    // tslint:disable:object-literal-sort-keys
    mobile: PropTypes.shape(limitedResponsiveBreakpointPropTypes),
    tablet: PropTypes.shape(responsiveBreakpointPropTypes),
    desktop: PropTypes.shape(responsiveBreakpointPropTypes),
    widescreen: PropTypes.shape(responsiveBreakpointPropTypes),
    fullhd: PropTypes.shape(limitedResponsiveBreakpointPropTypes),
    touch: PropTypes.shape(limitedResponsiveBreakpointPropTypes),
    // tslint:enable:object-literal-sort-keys
  }),
};

export const transformResponsiveHelpers: TransformFunc<
  ResponsiveHelpersProps
> = (props, componentName, location = "prop") => {
  PropTypes.checkPropTypes(
    responsiveHelpersPropTypes,
    props,
    location,
    componentName,
  );
  const { className, responsive, ...rest } = props;

  return {
    className: classNames(
      responsive !== undefined
        ? Object.keys(responsive)
            .filter(breakpoint => responsive[breakpoint] !== undefined)
            .map(breakpoint => {
              const names = {};
              const { display, hide, textAlignment, textSize } = responsive[
                breakpoint
              ] as
                | ResponsiveBreakpointProps
                | LimitiedResponsiveBreakpointProps;
              if (display !== undefined) {
                const value = display.value;
                const only = "only" in display ? display.only === true : false;
                names[
                  `is-${value}-${breakpoint}${only ? "-only" : ""}`
                ] = value;
              }
              if (hide !== undefined) {
                const value = hide.value;
                const only = "only" in hide ? hide.only === true : false;
                names[`is-hidden-${breakpoint}${only ? "-only" : ""}`] = value;
              }
              if (textAlignment !== undefined) {
                const value = textAlignment.value;
                const only =
                  "only" in textAlignment ? textAlignment.only === true : false;
                names[
                  `has-text-${value}-${breakpoint}${only ? "-only" : ""}`
                ] = value;
              }
              if (textSize !== undefined) {
                const value = textSize.value;
                const only =
                  "only" in textSize ? textSize.only === true : false;
                names[
                  `is-size-${value}-${breakpoint}${only ? "-only" : ""}`
                ] = value;
              }

              return names;
            })
            .reduce((acc, cv) => ({ ...acc, ...cv }), {})
        : undefined,
      className,
    ),
    ...rest,
  };
};
