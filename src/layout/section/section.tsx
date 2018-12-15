import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { tuple } from "../../utils";

export const SECTION_SIZES = tuple("medium", "large");
export type SectionSizes = (typeof SECTION_SIZES)[number];

export type SectionModifierProps = Partial<{
  className: string;
  size: SectionSizes;
}>;

export type SectionProps = HelpersProps & SectionModifierProps;

export const Section = forwardRefAs<SectionProps, "section">(
  (props, ref) => {
    const { as, size, ...rest } = transformHelpers(props);
    rest.className = classNames("section", rest.className, {
      [`is-${size}`]: size,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "section" },
);
