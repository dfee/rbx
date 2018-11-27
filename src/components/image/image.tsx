import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { renderAsExoticComponent } from "@/components/render-as-exotic-component";
import { ModifierProps } from "@/modifiers";
import { ImageSizes } from "./constants";

export type ImageModifierProps = Partial<{
  src: string;
  alt: string;
  size: ImageSizes;
  onError: React.DOMAttributes<HTMLImageElement>["onError"];
}>;

export type ImageProps = ModifierProps & ImageModifierProps;

export const Image = renderAsExoticComponent<ImageProps, "figure">(
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
