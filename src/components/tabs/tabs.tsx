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
import { Tab } from "./tab";

export const TABS_ALIGNMENTS = tuple("centered", "right");
export type TabsAlignments = (typeof TABS_ALIGNMENTS)[number];

export const TABS_SIZES = tuple("small", "medium", "large");
export type TabsSizes = (typeof TABS_SIZES)[number];

export const TABS_TYPES = tuple("boxed", "toggle", "toggle-rounded");
export type TabsTypes = (typeof TABS_TYPES)[number];

export type TabsModifierProps = Partial<{
  align: TabsAlignments;
  fullwidth: boolean;
  size: TabsSizes;
  /** * This is called style on Bulma documentation */
  type: TabsTypes;
}>;

export type TabsProps = HelpersProps & TabsModifierProps;

const propTypes = {
  ...genericPropTypes,
  align: PropTypes.oneOf(TABS_ALIGNMENTS),
  fullwidth: PropTypes.bool,
  size: PropTypes.oneOf(TABS_SIZES),
  type: PropTypes.oneOf(TABS_TYPES),
};

export const Tabs = Object.assign(
  forwardRefAs<TabsProps, "div">(
    (props, ref) => {
      const {
        align,
        as,
        children,
        fullwidth,
        size,
        type,
        ...rest
      } = transformHelpers(props);
      rest.className = classNames("tabs", rest.className, {
        [`is-${align}`]: align,
        [`is-${size}`]: size,
        "is-fullwidth": fullwidth,
        "is-toggle": type === "toggle" || type === "toggle-rounded",
        "is-toggle-rounded": type === "toggle-rounded",
        [`is-${type}`]: type,
      });
      return React.createElement(as!, {
        children: <ul>{children}</ul>,
        ref,
        ...rest,
      });
    },
    { as: "div" },
  ),
  {
    Tab,
    propTypes,
  },
);
