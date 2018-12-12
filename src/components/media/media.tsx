import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { MediaItem } from "./media-item";

export type MediaModifierProps = Partial<{ className: string }>;

export type MediaProps = ModifierProps & MediaModifierProps;

export const Media = Object.assign(
  forwardRefAs<MediaProps, "article">(
    (props, ref) => {
      const { as, ...rest } = transformModifiers(props);
      rest.className = classNames("media", rest.className);
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "article" },
  ),
  {
    Item: MediaItem,
  },
);
