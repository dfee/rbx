import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { tuple } from "../../utils";

export const SECTION_SIZES = tuple("medium", "large");
export type SectionSizes = (typeof SECTION_SIZES)[number];

export type SectionModifierProps = Partial<{
  size: SectionSizes;
}>;

export type SectionProps = HelpersProps & SectionModifierProps;

const propTypes = {
  size: PropTypes.oneOf(SECTION_SIZES),
};

export const Section = Object.assign(
  forwardRefAs<SectionProps, "section">(
    (props, ref) => {
      const { as, size, ...rest } = props;
      rest.className = classNames(
        "section",
        { [`is-${size}`]: size },
        rest.className,
      );
      return <Generic as={as!} ref={ref} {...rest} />;
    },
    { as: "section" },
  ),
  { propTypes },
);
