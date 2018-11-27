import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type MediaItemModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
  position: "center" | "right" | "left";
}>;

export type MediaItemProps = ModifierProps & MediaItemModifierProps;

export const MediaItem = renderAsExoticComponent<MediaItemProps, "div">(
  ({ children, className, position, ...props }, ref) => {
    const p = position === "center" ? "content" : position;
    return (
      <Element
        {...props}
        ref={ref}
        className={cx(className, {
          [`media-${p}`]: p,
        })}
      >
        {children}
      </Element>
    );
  },
  "div",
);
MediaItem.defaultProps = Object.assign(
  {
    children: null,
    position: "center",
  },
  MediaItem.defaultProps,
);
