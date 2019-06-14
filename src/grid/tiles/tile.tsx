import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const TILE_DEFAULTS = {
  kinds: ["ancestor", "parent", "child"] as const,
  sizes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const,
};

export interface TileVariablesOverrides {}

export interface TileVariablesDefaults {
  kinds: (typeof TILE_DEFAULTS["kinds"])[number];
  sizes: (typeof TILE_DEFAULTS["sizes"])[number];
}

export type TileVariables = Prefer<
  TileVariablesOverrides,
  TileVariablesDefaults
>;

export type TileModifierProps = Partial<{
  kind: TileVariables["kinds"];
  size: TileVariables["sizes"];
  vertical: boolean;
}>;

export type TileProps = HelpersProps & TileModifierProps;

export const Tile = forwardRefAs<TileProps>(
  ({ className, kind, size, vertical, ...rest }, ref) => (
    <Generic
      className={classNames(
        "tile",
        {
          [`is-${kind}`]: kind,
          [`is-${size}`]: size !== undefined,
          "is-vertical": vertical,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  ),
  { as: "div" },
);

Tile.displayName = "Tile";
Tile.propTypes = {
  kind: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  vertical: PropTypes.bool,
};
