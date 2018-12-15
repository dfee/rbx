import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type TagGroupModifierProps = Partial<{
  className: string;
  gapless: boolean;
}>;

export type TagGroupProps = HelpersProps & TagGroupModifierProps;

export const TagGroup = forwardRefAs<TagGroupProps, "span">(
  (props, ref) => {
    const { as, gapless, ...rest } = transformHelpers(props);
    rest.className = classNames("tags", rest.className, {
      "has-addons": gapless,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "span" },
);
