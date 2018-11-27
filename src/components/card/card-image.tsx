import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { Image } from "@/components/image";
import { ImageProps } from "@/components/image/image";

export type CardImageProps = ImageProps & { className?: string };

export const CardImage = React.forwardRef<HTMLElement, CardImageProps>(
  ({ className, ...props }, ref) => (
    <Element className={cx("card-image", className)}>
      <Image ref={ref} {...props} />
    </Element>
  ),
);
