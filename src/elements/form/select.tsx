import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { forwardRefAs, Generic, HelpersProps } from "src/base";
import { Colors, COLORS } from "src/base/helpers";
import { tuple } from "src/utils";
import { SelectOption } from "./select-option";

export const SELECT_CONTAINER_SIZES = tuple("small", "medium", "large");
export type SelectContainerSizes = (typeof SELECT_CONTAINER_SIZES)[number];

export const SELECT_CONTAINER_STATES = tuple("focused", "hovered", "loading");
export type SelectContainerStates = (typeof SELECT_CONTAINER_STATES)[number];

export type SelectContainerModifierProps = Partial<{
  color: Colors;
  fullwidth: boolean;
  rounded: boolean;
  size: SelectContainerSizes;
  state: SelectContainerStates;
}>;

export type SelectContainerProps = HelpersProps & SelectContainerModifierProps;

const propTypes = {
  color: PropTypes.oneOf(COLORS),
  fullwidth: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(SELECT_CONTAINER_SIZES),
  state: PropTypes.oneOf(SELECT_CONTAINER_STATES),
};

const mapSelectContainerChildren = (
  children: React.ReactNode,
  state?: SelectContainerStates,
) => {
  let classNameExtension: string | undefined;
  const mapped = React.Children.map(children, (child, i) => {
    if (
      typeof child === "object" &&
      // tslint:disable-next-line:no-use-before-declare
      (child.type === "select" || child.type === Select)
    ) {
      classNameExtension = classNames({
        "is-multiple": (child.props as React.SelectHTMLAttributes<Element>)
          .multiple,
      });
      if (state === "focused" || state === "hovered") {
        return React.cloneElement(child, {
          className: classNames(
            `is-${state}`,
            (child.props as React.SelectHTMLAttributes<Element>).className,
          ),
        });
      }

      return child;
    } else if (typeof child === "object" && child.type === React.Fragment) {
      const fragmentMapped = mapSelectContainerChildren(
        (child.props as React.ComponentPropsWithoutRef<typeof React.Fragment>)
          .children,
        state,
      );
      classNameExtension = classNames(
        classNameExtension,
        fragmentMapped.classNameExtension,
      );

      return <React.Fragment children={fragmentMapped.children} />;
    }

    return child;
  });

  return { children: mapped, classNameExtension };
};

export const SelectContainer = Object.assign(
  forwardRefAs<SelectContainerProps, "div">(
    (
      { className, children, color, fullwidth, rounded, size, state, ...rest },
      ref,
    ) => {
      const mapped = mapSelectContainerChildren(children, state);

      return (
        <Generic
          className={classNames(
            "select",
            {
              [`is-${color}`]: color,
              "is-fullwidth": fullwidth,
              "is-loading": state === "loading",
              "is-rounded": rounded,
              [`is-${size}`]: size,
            },
            mapped.classNameExtension,
            className,
          )}
          children={mapped.children}
          ref={ref}
          {...rest}
        />
      );
    },
    { as: "div" },
  ),
  { propTypes },
);

export type SelectProps = HelpersProps;

export const Select = Object.assign(
  forwardRefAs<SelectProps, "select">(
    (props, ref) => <Generic ref={ref} {...props} />,
    { as: "select" },
  ),
  {
    Container: SelectContainer,
    Option: SelectOption,
  },
);
