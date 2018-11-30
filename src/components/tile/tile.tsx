import { cx } from "emotion";
import React from "react";

import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/color";

export type TileModifierProps = Partial<{
  children: React.ReactNode;
  color: Colors;
  kind: "ancestor" | "parent" | "child";
  notification: boolean;
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  style: React.CSSProperties;
  vertical: boolean;
}>;

export type TileProps = ModifierProps & TileModifierProps;

export const Tile = asExoticComponent<TileProps, "div">((props, ref) => {
  const { as, color, kind, notification, size, vertical, ...rest } = modify(
    props,
  );
  rest.className = cx("tile", rest.className, {
    "is-vertical": vertical,
    [`is-${kind}`]: kind,
    [`is-${size}`]: !!size,
    [`is-${color}`]: color,
    notification,
  });
  return React.createElement(as!, { ref, ...rest });
}, "div");

Tile.defaultProps = Object.assign(
  {
    notification: false,
    vertical: false,
  },
  Tile.defaultProps,
);
