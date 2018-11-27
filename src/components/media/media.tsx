import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { MediaContent } from "./media-content";
import { MediaItem } from "./media-item";

export type MediaModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
}>;

export type MediaProps = ModifierProps & MediaModifierProps;

export const Media = Object.assign(
  renderAsExoticComponent(
    ({ children, className, ...props }, ref) => (
      <Element {...props} ref={ref} className={cx("media", className, {})}>
        {children}
      </Element>
    ),
    "article",
  ),
  {
    Content: MediaContent,
    Item: MediaItem,
  },
);
Media.defaultProps = Object.assign(
  {
    children: null,
  },
  Media.defaultProps,
);
