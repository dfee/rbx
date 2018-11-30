import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { Image } from "@/components/image";
import { ImageProps } from "@/components/image/image";

export type CardImageModifierProps = Partial<{
  className: string;
}>;

export type CardImageProps = ImageProps & CardImageModifierProps;

export const CardImage = React.forwardRef<HTMLElement, CardImageProps>(
  ({ className, ...rest }, ref) => (
    <Element className={cx("card-image", className)}>
      <Image ref={ref} {...rest} />
    </Element>
  ),
);
