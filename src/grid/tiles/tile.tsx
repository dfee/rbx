import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Colors, COLORS } from "../../base/helpers";
import { tuple } from "../../utils";

export const TILE_KINDS = tuple("ancestor", "parent", "child");
export type TileKinds = (typeof TILE_KINDS)[number];

export const TILE_SIZES = tuple(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
export type TileSizes = (typeof TILE_SIZES)[number];

export type TileModifierProps = Partial<{
  color: Colors;
  kind: TileKinds;
  notification: boolean;
  size: TileSizes;
  vertical: boolean;
}>;

export type TileProps = HelpersProps & TileModifierProps;

const propTypes = {
  ...genericPropTypes,
  color: PropTypes.oneOf(COLORS),
  kind: PropTypes.oneOf(TILE_KINDS),
  notification: PropTypes.bool,
  size: PropTypes.oneOf(TILE_SIZES),
  vertical: PropTypes.bool,
};

export const Tile = Object.assign(
  forwardRefAs<TileProps, "div">(
    (props, ref) => {
      const {
        as,
        color,
        kind,
        notification,
        size,
        vertical,
        ...rest
      } = transformHelpers(props);
      rest.className = classNames("tile", rest.className, {
        [`is-${color}`]: color,
        [`is-${kind}`]: kind,
        [`is-${size}`]: !!size,
        "is-vertical": vertical,
        notification,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  { propTypes },
);
