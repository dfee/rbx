import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";

export type TagGroupModifierProps = Partial<{
  className: string;
  gapless: boolean;
}>;

export type TagGroupProps = ModifierProps & TagGroupModifierProps;

export const TagGroup = forwardRefAs<TagGroupProps, "span">(
  (props, ref) => {
    const { as, gapless, ...rest } = transformModifiers(props);
    rest.className = cx("tags", rest.className, {
      "has-addons": gapless,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
