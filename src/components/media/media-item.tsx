import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";

export type MediaItemModifierProps = Partial<{
  position: "center" | "right" | "left";
}>;

export type MediaItemProps = ModifierProps & MediaItemModifierProps;

export const MediaItem = asExoticComponent<MediaItemProps, "div">(
  (props, ref) => {
    const { as, position, ...rest } = modify(props);
    const p = position === "center" ? "content" : position;
    rest.className = cx(rest.className, {
      [`media-${p}`]: p,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);

MediaItem.defaultProps = Object.assign(
  { position: "center" },
  MediaItem.defaultProps,
);
