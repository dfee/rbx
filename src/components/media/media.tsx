import classNames from "classnames";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { MediaItem } from "./media-item";

export type MediaProps = HelpersProps;

export const Media = Object.assign(
  forwardRefAs<MediaProps, "article">(
    ({ className, ...rest }, ref) => (
      <Generic className={classNames("media", className)} ref={ref} {...rest} />
    ),
    { as: "article" },
  ),
  { Item: MediaItem },
);
