import classNames from "classnames";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { MediaItem } from "./media-item";

export type MediaProps = HelpersProps;

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
    propTypes: genericPropTypes,
  },
);
