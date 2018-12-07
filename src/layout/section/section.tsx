import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

export const SECTION_SIZES = tuple("medium", "large");
export type SectionSizes = (typeof SECTION_SIZES)[number];

export type SectionModifierProps = Partial<{
  className: string;
  size: SectionSizes;
}>;

export type SectionProps = ModifierProps & SectionModifierProps;

export const Section = forwardRefAs<SectionProps, "section">(
  (props, ref) => {
    const { as, size, ...rest } = transformModifiers(props);
    rest.className = cx("section", rest.className, {
      [`is-${size}`]: size,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "section" },
);
