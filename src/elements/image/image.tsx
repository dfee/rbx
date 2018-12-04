import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/generic";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";

export const IMAGE_SIZES = tuple(
  16,
  24,
  32,
  48,
  64,
  96,
  128,
  "16by9",
  "1by1",
  "1by2",
  "1by3",
  "2by1",
  "2by3",
  "3by1",
  "3by2",
  "3by4",
  "3by5",
  "4by3",
  "4by5",
  "5by3",
  "5by4",
  "9by16",
  "square",
);

export type ImageSizes = (typeof IMAGE_SIZES)[number];

export type ImageModifierProps = Partial<{
  alt: string;
  onError: React.DOMAttributes<HTMLImageElement>["onError"];
  rounded: boolean;
  size: ImageSizes;
  src: string;
}>;

export type ImageProps = ModifierProps & ImageModifierProps;

export const Image = forwardRefAs<ImageProps, "figure">((props, ref) => {
  const { as, alt, onError, rounded, size, src, ...rest } = transformModifiers(
    props,
  );
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
    children: (
      <img
        className={cx({ "is-rounded": rounded }) || undefined}
        onError={onError}
        src={src}
        alt={alt}
      />
    ),
    ref,
    ...rest,
  });
}, "figure");
