import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";
import { tuple } from "../../utils";

export const IMAGE_CONTAINER_DEFAULTS = {
  sizes: tuple(
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
  ),
};

export interface ImageContainerVariablesOverrides {}

export interface ImageContainerVariablesDefaults {
  sizes: (typeof IMAGE_CONTAINER_DEFAULTS["sizes"])[number];
}

export type ImageContainerVariables = Prefer<
  ImageContainerVariablesOverrides,
  ImageContainerVariablesDefaults
>;

export type ImageContainerModifierProps = Partial<{
  size: ImageContainerVariables["sizes"];
}>;

export type ImageContainerProps = HelpersProps & ImageContainerModifierProps;

export const ImageContainer = forwardRefAs<ImageContainerProps>(
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
);

ImageContainer.displayName = "Image.Container";
ImageContainer.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
