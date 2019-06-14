import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const NAVBAR_SEGMENT_DEFAULTS = {
  alignments: ["start", "end"] as const,
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

export const NavbarSegment = forwardRefAs<NavbarSegmentProps>(
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
);

NavbarSegment.displayName = "Navbar.Segment";
NavbarSegment.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
