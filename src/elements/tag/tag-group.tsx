import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";

export type TagGroupModifierProps = Partial<{
  gapless: boolean;
}>;

export type TagGroupProps = HelpersProps & TagGroupModifierProps;

export const TagGroup = forwardRefAs<TagGroupProps>(
  ({ className, gapless, ...rest }, ref) => (
    <Generic
      className={classNames("tags", { "has-addons": gapless }, className)}
      ref={ref}
      {...rest}
    />
  ),
  { as: "span" },
);

TagGroup.displayName = "Tag.Group";
TagGroup.propTypes = {
  gapless: PropTypes.bool,
};
