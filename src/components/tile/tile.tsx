import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";

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

export const Tile = renderAsExoticComponent<TileProps, "div">(
  (
    {
      children,
      className,
      kind,
      vertical,
      size,
      color,
      notification,
      ...props
    },
    ref,
  ) => (
    <Element
      {...props}
      ref={ref}
      className={cx("tile", className, {
        "is-vertical": vertical,
        [`is-${kind}`]: kind,
        [`is-${size}`]: !!size,
        [`is-${color}`]: color,
        notification,
      })}
    >
      {children}
    </Element>
  ),
  "div",
);
Tile.defaultProps = Object.assign(
  {
    children: null,
    notification: false,
    vertical: false,
  },
  Tile.defaultProps,
);
