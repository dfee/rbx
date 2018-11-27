import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { renderAsExoticComponent } from "@/components/render-as-exotic-component";
import { ModifierProps } from "@/modifiers";

export type MediaContentModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type MediaContentProps = ModifierProps & MediaContentModifierProps;

export const MediaContent = renderAsExoticComponent<MediaContentProps, "div">(
  ({ children, className, ...props }, ref) => (
    <Element {...props} ref={ref} className={cx(className, "content")}>
      {children}
    </Element>
  ),
  "div",
);
MediaContent.defaultProps = Object.assign(
  {
    children: null,
  },
  MediaContent.defaultProps,
);
