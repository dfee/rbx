import classNames from "classnames";
import React from "react";

import { forwardRefAs } from "../../base";
import { ModifierProps, transformModifiers } from "../../modifiers";
import { ImageContainer } from "./image-container";

export type ImageModifierProps = Partial<{
  className: string;
  rounded: boolean;
}>;

export type ImageProps = ModifierProps & ImageModifierProps;

export const Image = Object.assign(
  forwardRefAs<ImageProps, "img">(
    (props, ref) => {
      const { as, rounded, ...rest } = transformModifiers(props);
      rest.className = classNames(rest.className, { "is-rounded": rounded });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "img" },
  ),
  { Container: ImageContainer },
);
