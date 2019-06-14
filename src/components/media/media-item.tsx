import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const MEDIA_ITEM_DEFAULTS = {
  alignments: ["content", "left", "right"] as const,
};

export interface MediaItemVariablesOverrides {}

export interface MediaItemVariablesDefaults {
  alignments: (typeof MEDIA_ITEM_DEFAULTS["alignments"])[number];
}

export type MediaItemVariables = Prefer<
  MediaItemVariablesOverrides,
  MediaItemVariablesDefaults
>;

export type MediaItemModifierProps = Partial<{
  align: MediaItemVariables["alignments"];
}>;

export type MediaItemProps = HelpersProps & MediaItemModifierProps;

export const MediaItem = forwardRefAs<MediaItemProps>(
  ({ align, className, ...rest }, ref) => (
    <Generic
      className={classNames({ [`media-${align}`]: align }, className)}
      ref={ref}
      {...rest}
    />
  ),
  {
    align: "content",
    as: "div",
  },
);

MediaItem.displayName = "Media.Item";
MediaItem.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
