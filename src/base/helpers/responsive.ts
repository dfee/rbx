import classNames from "classnames";
import PropTypes from "prop-types";

import {
  makePropTypesFactory,
  makeValidatingTransformFactory,
  TransformFunction,
} from "./factory";
import { Variables } from "./variables";

export type LimitedResponsiveBreakpointProps = {
  display?: {
    value: Variables["displays"];
  };
  hide?: {
    value: boolean;
  };
  textAlign?: {
    value: Variables["textAlignments"];
  };
  textSize?: {
    value: Variables["textSizes"];
  };
};

export type ResponsiveBreakpointProps = {
  display?: {
    only?: boolean;
    value: Variables["displays"];
  };
  hide?: {
    only?: boolean;
    value: boolean;
  };
  textAlign?: {
    only?: boolean;
    value: Variables["textAlignments"];
  };
  textSize?: {
    only?: boolean;
    value: Variables["textSizes"];
  };
};

export type ResponsiveHelpersProps = {
  responsive?: {
    [B in Variables["breakpointsLimited"]]?: LimitedResponsiveBreakpointProps;
  } &
    {
      [B in Exclude<
        Variables["breakpoints"],
        Variables["breakpointsLimited"]
      >]?: ResponsiveBreakpointProps;
    };
};

export const makeResponsiveBreakpointPropTypes = makePropTypesFactory(vars => ({
  display: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.oneOf(vars.displays).isRequired,
  }),
  hide: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.bool.isRequired,
  }),
  textAlign: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.oneOf(vars.textAlignments).isRequired,
  }),
  textSize: PropTypes.shape({
    only: PropTypes.bool,
    value: PropTypes.oneOf(vars.textSizes).isRequired,
  }),
}));

export const makeResponsiveBreakpointLimitedPropTypes = makePropTypesFactory(
  vars => ({
    display: PropTypes.shape({
      value: PropTypes.oneOf(vars.displays).isRequired,
    }),
    hide: PropTypes.shape({
      value: PropTypes.bool.isRequired,
    }),
    textAlign: PropTypes.shape({
      value: PropTypes.oneOf(vars.textAlignments).isRequired,
    }),
    textSize: PropTypes.shape({
      value: PropTypes.oneOf(vars.textSizes).isRequired,
    }),
  }),
);

// Factories
export const makePropTypes = makePropTypesFactory(vars => ({
  responsive: PropTypes.shape(
    vars.breakpoints
      .map(breakpoint => ({
        [breakpoint]: PropTypes.shape(
          vars.breakpointsLimited.indexOf(breakpoint) === -1
            ? makeResponsiveBreakpointPropTypes(vars)
            : makeResponsiveBreakpointLimitedPropTypes(vars),
        ),
      }))
      .reduce((acc, cv) => ({ ...acc, ...cv }), {}),
  ),
}));

export const transform: TransformFunction<ResponsiveHelpersProps> = props => {
  const { className, responsive, ...rest } = props;

  return {
    className: classNames(
      responsive !== undefined
        ? Object.keys(responsive)
            .filter(breakpoint => responsive[breakpoint] !== undefined)
            .map(breakpoint => {
              const names = {};
              const { display, hide, textAlign, textSize } = responsive[
                breakpoint
              ] as ResponsiveBreakpointProps | LimitedResponsiveBreakpointProps;
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
              if (textAlign !== undefined) {
                const value = textAlign.value;
                const only =
                  "only" in textAlign ? textAlign.only === true : false;
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

export const makeValidatingTransform = makeValidatingTransformFactory(
  makePropTypes,
  transform,
);
