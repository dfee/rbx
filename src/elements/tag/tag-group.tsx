import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";

export type TagGroupModifierProps = Partial<{
  gapless: boolean;
}>;

export type TagGroupProps = HelpersProps & TagGroupModifierProps;

const propTypes = {
  ...genericPropTypes,
  gapless: PropTypes.bool,
};

export const TagGroup = Object.assign(
  forwardRefAs<TagGroupProps, "span">(
    (props, ref) => {
      const { as, gapless, ...rest } = transformHelpers(props);
      rest.className = classNames("tags", rest.className, {
        "has-addons": gapless,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "span" },
  ),
  { propTypes },
);
