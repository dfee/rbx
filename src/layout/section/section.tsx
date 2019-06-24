import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const SECTION_DEFAULTS = {
  sizes: ["medium", "large"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SectionVariablesOverrides {}

export interface SectionVariablesDefaults {
  sizes: (typeof SECTION_DEFAULTS["sizes"])[number];
}

export type SectionVariables = Prefer<
  SectionVariablesOverrides,
  SectionVariablesDefaults
>;

export type SectionModifierProps = {
  size?: SectionVariables["sizes"];
};

export type SectionProps = HelpersProps & SectionModifierProps;

export const Section = Object.assign(
  forwardRefAs<SectionProps>(
    ({ className, size, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames("section", { [`is-${size}`]: size }, className)}
        {...rest}
      />
    ),
    { as: "section" },
  ),
  {
    VARIABLE_DEFAULTS: SECTION_DEFAULTS,
  },
);

Section.displayName = "Section";
Section.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
