import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/components/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type MediaContentProps = ModifierProps;

export const MediaContent = forwardRefAs<MediaContentProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = cx("content", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  "div",
);
