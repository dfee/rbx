import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const MEDIA_ITEM_DEFAULTS = {
  positions: tuple("content", "left", "right"),
};

export interface MediaItemVariablesOverrides {}

export interface MediaItemVariablesDefaults {
  positions: (typeof MEDIA_ITEM_DEFAULTS["positions"])[number];
}

export type MediaItemVariables = Prefer<
  MediaItemVariablesOverrides,
  MediaItemVariablesDefaults
>;

export type MediaItemModifierProps = Partial<{
  position: MediaItemVariables["positions"];
}>;

export type MediaItemProps = HelpersProps & MediaItemModifierProps;

const propTypes = {
  position: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
