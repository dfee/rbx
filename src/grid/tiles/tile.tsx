import { cx } from "emotion";
import React from "react";

import { forwardRefAs } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { tuple } from "@/utils";

export const TILE_KINDS = tuple("ancestor", "parent", "child");
export type TileKinds = (typeof TILE_KINDS)[number];

export const TILE_SIZES = tuple(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
export type TileSizes = (typeof TILE_SIZES)[number];

export type TileModifierProps = Partial<{
  className: string;
  color: Colors;
  kind: TileKinds;
  notification: boolean;
  size: TileSizes;
  vertical: boolean;
}>;

export type TileProps = ModifierProps & TileModifierProps;

export const Tile = forwardRefAs<TileProps, "div">(
  (props, ref) => {
    const {
      as,
      color,
      kind,
      notification,
      size,
      vertical,
      ...rest
    } = transformModifiers(props);
    rest.className = cx("tile", rest.className, {
      "is-vertical": vertical,
      [`is-${kind}`]: kind,
      [`is-${size}`]: !!size,
      [`is-${color}`]: color,
      notification,
    });
    return React.createElement(as!, { ref, ...rest });
  },
  {
    as: "div",
    notification: false,
    vertical: false,
  },
);
