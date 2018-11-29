import { cx } from "emotion";
import React from "react";

import { Element, extendedForwardRef } from "@/components/element";
import { ModifierProps } from "@/modifiers";

export type MediaItemModifierProps = Partial<{
  children: React.ReactNode;
  style: React.CSSProperties;
  position: "center" | "right" | "left";
}>;

export type MediaItemProps = ModifierProps & MediaItemModifierProps;

export const MediaItem = extendedForwardRef<MediaItemProps, "div">(
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
