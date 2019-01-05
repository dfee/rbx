import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { ImageContainer } from "./image-container";

export type ImageModifierProps = Partial<{
  rounded: boolean;
}>;

export type ImageProps = HelpersProps & ImageModifierProps;

const propTypes = {
  rounded: PropTypes.bool,
};

export const Image = Object.assign(
  forwardRefAs<ImageProps, "img">(
    ({ className, rounded, ...rest }, ref) => (
      <Generic
        className={classNames({ "is-rounded": rounded }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "img" },
  ),
  {
    Container: ImageContainer,
    propTypes,
  },
);
