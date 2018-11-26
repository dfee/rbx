import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import modifiers, { ModifierProps } from "modifiers";
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

const NavbarBurger = React.forwardRef<HTMLDivElement, NavbarBurgerProps>(
  ({ style, className, ...allProps }, ref) => {
    const props = modifiers.clean(allProps);
    return (
      <ShowContext.Consumer>
        {({ active }) => (
          <Element
            ref={ref}
            role="button"
            tabIndex="0"
            style={{ outline: "none", ...style }}
            className={cx(
              "navbar-burger",
              modifiers.classNames(allProps),
              className,
              {
                "is-active": active,
              },
            )}
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

export default NavbarBurger;
