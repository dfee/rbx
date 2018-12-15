import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { tuple } from "../../utils";

export const MEDIA_ITEM_POSITIONS = tuple("content", "left", "right");
export type MediaItemPositions = (typeof MEDIA_ITEM_POSITIONS)[number];

export type MediaItemModifierProps = Partial<{
  className: string;
  position: MediaItemPositions;
}>;

export type MediaItemProps = HelpersProps & MediaItemModifierProps;

export const MediaItem = forwardRefAs<MediaItemProps, "div">(
  (props, ref) => {
    const { as, position, ...rest } = transformHelpers(props);
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
