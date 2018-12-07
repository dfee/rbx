import { cx } from "emotion";
import React from "react";

import { Image } from "@/elements/image";
import { ImageProps } from "@/elements/image/image";
import { Generic } from "@/generic";

export type CardImageProps = Prefer<
  ImageProps,
  React.HTMLAttributes<HTMLElement>
>;

export const CardImage = React.forwardRef<HTMLElement, CardImageProps>(
  ({ className, ...rest }, ref) => (
    <Generic className={cx("card-image", className)}>
      <Image ref={ref} {...rest} />
    </Generic>
  ),
);
