import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Prefer } from "../../types";

export const IMAGE_CONTAINER_DEFAULTS = {
  dimmensions: [16, 24, 32, 48, 64, 96, 128] as const,
  ratios: [
    "16by9",
    "1by1",
    "1by2",
    "1by3",
    "2by1",
    "2by3",
    "3by1",
    "3by2",
    "3by4",
    "3by5",
    "4by3",
    "4by5",
    "5by3",
    "5by4",
    "9by16",
    "square",
  ] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ImageContainerVariablesOverrides {}

export interface ImageContainerVariablesDefaults {
  sizes:
    | (typeof IMAGE_CONTAINER_DEFAULTS["dimmensions"])[number]
    | (typeof IMAGE_CONTAINER_DEFAULTS["ratios"])[number];
}

export type ImageContainerVariables = Prefer<
  ImageContainerVariablesOverrides,
  ImageContainerVariablesDefaults
>;

export type ImageContainerModifierProps = {
  size?: ImageContainerVariables["sizes"];
};

export type ImageContainerProps = HelpersProps & ImageContainerModifierProps;

const mapImageContainerChildren = (
  children: React.ReactNode,
  size?: ImageContainerVariables["sizes"],
): React.ReactNode => {
  // Check if size is a "ratio", but also support user overrides;
  //   i.e.can't use IMAGE_CONTAINER_DEFAULTS["ratios"]
  // ...assume that if it's a string, it's a ratio.
  if (typeof size !== "string") {
    return children;
  }

  return React.Children.map(children, (child, i) => {
    if (typeof child === "object" && child !== null && "type" in child) {
      if (child.type !== React.Fragment) {
        return React.cloneElement(child, {
          className: classNames(
            "has-ratio",
            (child.props as React.HTMLAttributes<Element>).className,
          ),
        });
      }
      const fragmentMapped = mapImageContainerChildren(
        (child.props as React.ComponentPropsWithoutRef<typeof React.Fragment>)
          .children,
        size,
      );

      return <>{fragmentMapped}</>;
    }

    return child;
  });
};

export const ImageContainer = Object.assign(
  forwardRefAs<ImageContainerProps>(
    ({ children, className, size, ...rest }, ref) => {
      let s: string | undefined;
      if (typeof size === "string") {
        s = size;
      } else if (typeof size === "number") {
        s = `${size}x${size}`;
      }

      return (
        <Generic
          ref={ref}
          className={classNames("image", { [`is-${s}`]: s }, className)}
          {...rest}
        >
          {mapImageContainerChildren(children, size)}
        </Generic>
      );
    },
    { as: "figure" },
  ),
  {
    VARIABLE_DEFAULTS: IMAGE_CONTAINER_DEFAULTS,
  },
);

ImageContainer.displayName = "Image.Container";
ImageContainer.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
