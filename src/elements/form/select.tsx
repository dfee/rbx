import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";

import { SelectOption } from "./select-option";

export const SELECT_CONTAINER_DEFAULTS = {
  sizes: ["small", "medium", "large"] as const,
  states: ["focused", "hovered", "loading"] as const,
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectContainerVariablesOverrides {}

export interface SelectContainerVariablesDefaults {
  sizes: (typeof SELECT_CONTAINER_DEFAULTS["sizes"])[number];
  states: (typeof SELECT_CONTAINER_DEFAULTS["states"])[number];
}

export type SelectContainerVariables = Prefer<
  SelectContainerVariablesOverrides,
  SelectContainerVariablesDefaults
>;

export type SelectContainerModifierProps = {
  color?: Variables["colors"];
  fullwidth?: boolean;
  rounded?: boolean;
  size?: SelectContainerVariables["sizes"];
  state?: SelectContainerVariables["states"];
};

export type SelectContainerProps = HelpersProps & SelectContainerModifierProps;

const mapSelectContainerChildren = (
  children: React.ReactNode,
  state?: SelectContainerVariables["states"],
): { children: React.ReactNode; classNameExtension: string | undefined } => {
  let classNameExtension: string | undefined;
  const mapped = React.Children.map(children, (child, i) => {
    if (typeof child === "object" && child !== null && "type" in child) {
      if (child.type === "select" || child.type === Select) {
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
      }
      if (child.type === React.Fragment) {
        const fragmentMapped = mapSelectContainerChildren(
          (child.props as React.ComponentPropsWithoutRef<typeof React.Fragment>)
            .children,
          state,
        );
        classNameExtension = classNames(
          classNameExtension,
          fragmentMapped.classNameExtension,
        );

        return <>{fragmentMapped.children}</>;
      }
    }

    return child;
  });

  return { children: mapped, classNameExtension };
};

export const SelectContainer = forwardRefAs<SelectContainerProps>(
  (
    { className, children, color, fullwidth, rounded, size, state, ...rest },
    ref,
  ) => {
    const mapped = mapSelectContainerChildren(children, state);

    return (
      <Generic
        ref={ref}
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
        {...rest}
      >
        {mapped.children}
      </Generic>
    );
  },
  { as: "div" },
);

SelectContainer.displayName = "Select.Container";
SelectContainer.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullwidth: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export type SelectProps = HelpersProps;

export const Select = Object.assign(
  forwardRefAs<SelectProps>((props, ref) => <Generic ref={ref} {...props} />, {
    as: "select",
  }),
  {
    Container: SelectContainer,
    Option: SelectOption,
  },
);

Select.displayName = "Select";
