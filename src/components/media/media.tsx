import classNames from "classnames";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { MediaItem } from "./media-item";

export type MediaProps = HelpersProps;

export const Media = Object.assign(
  forwardRefAs<MediaProps>(
    ({ className, ...rest }, ref) => (
      <Generic className={classNames("media", className)} ref={ref} {...rest} />
    ),
    { as: "article" },
  ),
  { Item: MediaItem },
);

Media.displayName = "Media";
