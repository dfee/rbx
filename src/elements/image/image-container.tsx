import classNames from "classNames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { tuple } from "src/utils";

export const IMAGE_CONTAINER_SIZES = tuple(
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

export type ImageContainerSizes = (typeof IMAGE_CONTAINER_SIZES)[number];

export type ImageContainerModifierProps = Partial<{
  size: ImageContainerSizes;
}>;

export type ImageContainerProps = HelpersProps & ImageContainerModifierProps;

const propTypes = {
  size: PropTypes.oneOf(IMAGE_CONTAINER_SIZES),
};

export const ImageContainer = Object.assign(
  forwardRefAs<ImageContainerProps, "figure">(
    ({ className, size, ...rest }, ref) => {
      let s: string | undefined;
      if (typeof size === "string") {
        s = size;
      } else if (typeof size === "number") {
        s = `${size}x${size}`;
      }

      return (
        <Generic
          className={classNames("image", { [`is-${s}`]: s }, className)}
          ref={ref}
          {...rest}
        />
      );
    },
    { as: "figure" },
  ),
  { propTypes },
);
