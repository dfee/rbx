import classNames from "classnames";
import * as PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { tuple } from "../../utils";

export const MEDIA_ITEM_POSITIONS = tuple("content", "left", "right");
export type MediaItemPositions = (typeof MEDIA_ITEM_POSITIONS)[number];

export type MediaItemModifierProps = Partial<{
  position: MediaItemPositions;
}>;

export type MediaItemProps = HelpersProps & MediaItemModifierProps;

const propTypes = {
  position: PropTypes.oneOf(MEDIA_ITEM_POSITIONS),
};

export const MediaItem = Object.assign(
  forwardRefAs<MediaItemProps, "div">(
    ({ className, position, ...rest }, ref) => (
      <Generic
        className={classNames({ [`media-${position}`]: position }, className)}
        ref={ref}
        {...rest}
      />
    ),
    {
      as: "div",
      position: "content",
    },
  ),
  { propTypes },
);
