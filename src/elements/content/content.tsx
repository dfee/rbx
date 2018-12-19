import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { tuple } from "../../utils";
import { ContentOrderedList } from "./content-ordered-list";

export const CONTENT_SIZES = tuple("small", "medium", "large");
export type ContentSizes = (typeof CONTENT_SIZES)[number];

export type ContentModifierProps = Partial<{
  size: ContentSizes;
}>;

export type ContentProps = HelpersProps & ContentModifierProps;

const propTypes = {
  ...genericPropTypes,
  size: PropTypes.oneOf(CONTENT_SIZES),
};

export const Content = Object.assign(
  forwardRefAs<ContentProps, "div">(
    (props, ref) => {
      const { as, size, ...rest } = transformHelpers(props);
      rest.className = classNames("content", rest.className, {
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  {
    OrderedList: ContentOrderedList,
    propTypes,
  },
);
