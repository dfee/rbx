import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { MediaContent } from "./media-content";
import { MediaItem } from "./media-item";

export type MediaProps = ModifierProps;

export const Media = Object.assign(
  asExoticComponent<MediaProps, "article">((props, ref) => {
    const { as, ...rest } = modify(props);
    rest.className = cx("media", rest.className);
    return React.createElement(as!, { ref, ...rest });
  }, "article"),
  {
    Content: MediaContent,
    Item: MediaItem,
  },
);
