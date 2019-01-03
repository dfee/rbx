import classNames from "classNames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";

export type TagGroupModifierProps = Partial<{
  gapless: boolean;
}>;

export type TagGroupProps = HelpersProps & TagGroupModifierProps;

const propTypes = {
  gapless: PropTypes.bool,
};

export const TagGroup = Object.assign(
  forwardRefAs<TagGroupProps, "span">(
    ({ className, gapless, ...rest }, ref) => (
      <Generic
        className={classNames("tags", { "has-addons": gapless }, className)}
        ref={ref}
        {...rest}
      />
    ),
    { as: "span" },
  ),
  { propTypes },
);
