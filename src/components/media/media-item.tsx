import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const MEDIA_ITEM_DEFAULTS = {
  alignments: ["content", "left", "right"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MediaItemVariablesOverrides {}

export interface MediaItemVariablesDefaults {
  alignments: (typeof MEDIA_ITEM_DEFAULTS["alignments"])[number];
}

export type MediaItemVariables = Prefer<
  MediaItemVariablesOverrides,
  MediaItemVariablesDefaults
>;

export type MediaItemModifierProps = {
  align?: MediaItemVariables["alignments"];
};

export type MediaItemProps = HelpersProps & MediaItemModifierProps;

export const MediaItem = Object.assign(
  forwardRefAs<MediaItemProps>(
    ({ align, className, ...rest }, ref) => (
      <Generic
        ref={ref}
        className={classNames({ [`media-${align}`]: align }, className)}
        {...rest}
      />
    ),
    {
      align: "content",
      as: "div",
    },
  ),
  {
    DEFAULTS: MEDIA_ITEM_DEFAULTS,
  },
);

MediaItem.displayName = "Media.Item";
MediaItem.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
