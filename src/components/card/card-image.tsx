import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";

export type CardImageModifierProps = Partial<{ className: string }>;

export type CardImageProps = ModifierProps & CardImageModifierProps;

export const CardImage = forwardRefAs<CardImageProps, "div">(
  (props, ref) => {
    const { as, ...rest } = transformModifiers(props);
    rest.className = classNames("card-image", rest.className);
    return React.createElement(as!, { ref, ...rest });
  },
  { as: "div" },
);
