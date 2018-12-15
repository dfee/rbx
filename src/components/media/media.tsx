import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";
import { MediaItem } from "./media-item";

export type MediaModifierProps = Partial<{ className: string }>;

export type MediaProps = HelpersProps & MediaModifierProps;

export const Media = Object.assign(
  forwardRefAs<MediaProps, "article">(
    (props, ref) => {
      const { as, ...rest } = transformHelpers(props);
      rest.className = classNames("media", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "article" },
  ),
  {
    Item: MediaItem,
  },
);
