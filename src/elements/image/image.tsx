import { cx } from "emotion";
import React from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { ImageContainer } from "./image-container";

export type ImageModifierProps = Partial<{
  rounded: boolean;
}>;

export type ImageProps = Prefer<
  ModifierProps & ImageModifierProps,
  React.ImgHTMLAttributes<HTMLImageElement>
>;

export const Image = Object.assign(
  React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
    const { rounded, ...rest } = transformModifiers(props);
    rest.className = cx(rest.className, { "is-rounded": rounded });
    return <img {...rest} ref={ref} />;
  }),
  { Container: ImageContainer },
);
