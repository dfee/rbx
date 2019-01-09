import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const MEDIA_ITEM_DEFAULTS = {
  alignments: tuple("content", "left", "right"),
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

const propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const MediaItem = Object.assign(
  forwardRefAs<MediaItemProps, "div">(
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
  ),
  { propTypes },
);
