import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type SectionModifierProps = Partial<{
  children: React.ReactNode;
  size: "medium" | "large";
  style: React.CSSProperties;
}>;

export type SectionProps = ModifierProps & SectionModifierProps;

const Section = renderAsExoticComponent<SectionProps, "section">(
  ({ children, className, size, ...props }, ref) => (
    <Element
      ref={ref}
      {...props}
      className={cx("section", className, {
        [`is-${size}`]: size,
      })}
    >
      {children}
    </Element>
  ),
  "section",
);
Section.defaultProps = Object.assign(
  {
    children: null,
  },
  Section.defaultProps,
);

export default Section;
