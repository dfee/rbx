import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { ImageContainer } from "./image-container";

export type ImageModifierProps = Partial<{
  rounded: boolean;
}>;

export type ImageProps = HelpersProps & ImageModifierProps;

const propTypes = {
  ...genericPropTypes,
  rounded: PropTypes.bool,
};

export const Image = Object.assign(
  forwardRefAs<ImageProps, "img">(
    (props, ref) => {
      const { as, rounded, ...rest } = transformHelpers(props);
      rest.className = classNames(rest.className, { "is-rounded": rounded });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "img" },
  ),
  {
    Container: ImageContainer,
    propTypes,
  },
);
