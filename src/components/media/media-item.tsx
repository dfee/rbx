import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type MediaItemModifierProps = Partial<{
  position: "center" | "right" | "left";
}>;

export type MediaItemProps = ModifierProps & MediaItemModifierProps;

export const MediaItem = forwardRefAs<MediaItemProps, "div">((props, ref) => {
  const { as, position, ...rest } = transformModifiers(props);
  const p = position === "center" ? "content" : position;
  rest.className = cx(rest.className, {
    [`media-${p}`]: p,
  });
  return React.createElement(as!, { ref, ...rest });
}, "div");

MediaItem.defaultProps = Object.assign(
  { position: "center" },
  MediaItem.defaultProps,
);
