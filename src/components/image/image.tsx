import { cx } from "emotion";
import React from "react";

import { extendedForwardRef } from "@/components/element";
import { ModifierProps, modify } from "@/modifiers";
import { ImageSizes } from "./constants";

export type ImageModifierProps = Partial<{
  alt: string;
  onError: React.DOMAttributes<HTMLImageElement>["onError"];
  size: ImageSizes;
  src: string;
}>;

export type ImageProps = ModifierProps & ImageModifierProps;

export const Image = extendedForwardRef<ImageProps, "figure">((props, ref) => {
  const { as, alt, onError, size, src, ...rest } = modify(props);
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
