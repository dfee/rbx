import classNames from "classnames";
import React from "react";

import { forwardRefAs, HelpersProps, transformHelpers } from "../../base";

export type CardImageModifierProps = Partial<{ className: string }>;

export type CardImageProps = HelpersProps & CardImageModifierProps;

export const CardImage = forwardRefAs<CardImageProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformHelpers(props);
    rest.className = classNames("card-image", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
