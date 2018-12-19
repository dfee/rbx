import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { tuple } from "../../utils";

export const SECTION_SIZES = tuple("medium", "large");
export type SectionSizes = (typeof SECTION_SIZES)[number];

export type SectionModifierProps = Partial<{
  size: SectionSizes;
}>;

export type SectionProps = HelpersProps & SectionModifierProps;

const propTypes = {
  ...genericPropTypes,
  size: PropTypes.oneOf(SECTION_SIZES),
};

export const Section = Object.assign(
  forwardRefAs<SectionProps, "section">(
    (props, ref) => {
      const { as, size, ...rest } = transformHelpers(props);
      rest.className = classNames("section", rest.className, {
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "section" },
  ),
  { propTypes },
);
