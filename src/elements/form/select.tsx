import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { tuple } from "../../utils";
import { SelectOption } from "./select-option";

export const SELECT_CONTAINER_DEFAULTS = {
  sizes: tuple("small", "medium", "large"),
  states: tuple("focused", "hovered", "loading"),
};

export interface SelectContainerVariablesOverrides {}

export interface SelectContainerVariablesDefaults {
  sizes: (typeof SELECT_CONTAINER_DEFAULTS["sizes"])[number];
  states: (typeof SELECT_CONTAINER_DEFAULTS["states"])[number];
}

export type SelectContainerVariables = Prefer<
  SelectContainerVariablesOverrides,
  SelectContainerVariablesDefaults
>;

export type SelectContainerModifierProps = Partial<{
  color: Variables["colors"];
  fullwidth: boolean;
  rounded: boolean;
  size: SelectContainerVariables["sizes"];
  state: SelectContainerVariables["states"];
}>;

export type SelectContainerProps = HelpersProps & SelectContainerModifierProps;

const propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullwidth: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const mapSelectContainerChildren = (
  children: React.ReactNode,
  state?: SelectContainerVariables["states"],
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
