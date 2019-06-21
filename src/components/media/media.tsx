import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

import { MediaItem } from "./media-item";

export type MediaProps = HelpersProps;

export const Media = Object.assign(
  forwardRefAs<MediaProps>(
    ({ className, ...rest }, ref) => (
      <Generic ref={ref} className={classNames("media", className)} {...rest} />
    ),
    { as: "article" },
  ),
  { Item: MediaItem },
);

Media.displayName = "Media";
