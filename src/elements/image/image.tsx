import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { ImageContainer } from "./image-container";

export type ImageModifierProps = Partial<{
  rounded: boolean;
}>;

export type ImageProps = HelpersProps & ImageModifierProps;

export const Image = Object.assign(
  forwardRefAs<HTMLImageElement, ImageProps>(
    ({ className, rounded, ...rest }, ref) => (
      <Generic
        className={classNames({ "is-rounded": rounded }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "img" },
  ),
  { Container: ImageContainer },
);

Image.displayName = "Image";
Image.propTypes = {
  rounded: PropTypes.bool,
};
