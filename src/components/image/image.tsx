import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";

export type ImageSizes =
  | 16
  | 24
  | 32
  | 48
  | 64
  | 96
  | 128
  | "square"
  | "1by1"
  | "4by3"
  | "3by2"
  | "16by9"
  | "2by1"
  | "5by4"
  | "5by3"
  | "3by1"
  | "4by5"
  | "3by4"
  | "2by3"
  | "3by5"
  | "9by16"
  | "1by2"
  | "1by3";

export type ImageModifierProps = Partial<{
  src: string;
  alt: string;
  size: ImageSizes;
  onError: React.DOMAttributes<HTMLImageElement>["onError"];
}>;

export type ImageProps = ModifierProps & ImageModifierProps;

const Image = renderAsExoticComponent<ImageProps, "figure">(
  ({ alt, className, onError, size, src, ...props }, ref) => {
    let s: string | undefined;
    if (typeof size === "string") {
      s = size;
    } else if (typeof size === "number") {
      s = `${size}x${size}`;
    }
    return (
      <Element
        {...props}
        className={cx("image", className, {
          [`is-${s}`]: s,
        })}
        ref={ref}
      >
        <img onError={onError} src={src} alt={alt} />
      </Element>
    );
  },
  "figure",
);
export default Image;
