import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

export const MEDIA_ITEM_POSITIONS = tuple("content", "left", "right");
export type MediaItemPositions = (typeof MEDIA_ITEM_POSITIONS)[number];

export type MediaItemModifierProps = Partial<{
  className: string;
  position: MediaItemPositions;
}>;

export type MediaItemProps = ModifierProps & MediaItemModifierProps;

export const MediaItem = forwardRefAs<MediaItemProps, "div">(
  (props, ref) => {
    const { as, position, ...rest } = transformModifiers(props);
    rest.className = classNames(rest.className, {
      [`media-${position}`]: position,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "div",
    position: "content",
  },
);
