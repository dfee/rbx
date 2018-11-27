import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { classNames, clean, ModifierProps } from "modifiers";
import { noop } from "utils";
import { ShowContext } from "./context";

export type NavbarBurgerModifierProps = Partial<{
  className: string;
  onClick: React.MouseEventHandler<any>;
  style: React.CSSProperties;
}>;

export type NavbarBurgerProps = ModifierProps &
  NavbarBurgerModifierProps &
  Partial<Omit<React.ComponentPropsWithoutRef<"div">, "unselectable">>;

export const NavbarBurger = React.forwardRef<HTMLDivElement, NavbarBurgerProps>(
  ({ style, className, ...allProps }, ref) => {
    const props = clean(allProps);
    return (
      <ShowContext.Consumer>
        {({ active }) => (
          <Element
            ref={ref}
            role="button"
            tabIndex="0"
            style={{ outline: "none", ...style }}
            className={cx("navbar-burger", classNames(allProps), className, {
              "is-active": active,
            })}
            {...props}
          >
            <span />
            <span />
            <span />
          </Element>
        )}
      </ShowContext.Consumer>
    );
  },
);
NavbarBurger.defaultProps = {
  onClick: noop,
};
