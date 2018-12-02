import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/exotic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { ImageSizes } from "./constants";

export type ImageModifierProps = Partial<{
  alt: string;
  onError: React.DOMAttributes<HTMLImageElement>["onError"];
  size: ImageSizes;
  src: string;
}>;

export type ImageProps = ModifierProps & ImageModifierProps;

export const Image = forwardRefAs<ImageProps, "figure">((props, ref) => {
  const { as, alt, onError, size, src, ...rest } = transformModifiers(props);
  let s: string | undefined;
  if (typeof size === "string") {
    s = size;
  } else if (typeof size === "number") {
    s = `${size}x${size}`;
  }
  rest.className = cx("image", rest.className, {
    [`is-${s}`]: s,
  });

  return React.createElement(as!, {
    children: <img onError={onError} src={src} alt={alt} />,
    ref,
    ...rest,
  });
}, "figure");
