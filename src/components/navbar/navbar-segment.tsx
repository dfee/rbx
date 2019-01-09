import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const NAVBAR_SEGMENT_DEFAULTS = {
  alignments: tuple("start", "end"),
};

export interface NavbarSegmentVariablesOverrides {}

export interface NavbarSegmentVariablesDefaults {
  alignments: (typeof NAVBAR_SEGMENT_DEFAULTS["alignments"])[number];
}

export type NavbarSegmentVariables = Prefer<
  NavbarSegmentVariablesOverrides,
  NavbarSegmentVariablesDefaults
>;

export type NavbarSegmentModifierProps = {
  align: NavbarSegmentVariables["alignments"];
};

export type NavbarSegmentProps = HelpersProps & NavbarSegmentModifierProps;

const propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export const NavbarSegment = Object.assign(
  forwardRefAs<NavbarSegmentProps, "div">(
    ({ align, className, ...rest }, ref) => (
      <Generic
        className={classNames(
          {
            [`navbar-${align}`]: align,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  { propTypes },
);
