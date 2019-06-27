import classNames from "classnames";
import * as PropTypes from "prop-types";
import * as React from "react";

import { Generic, forwardRefAs } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { combineRefs } from "../../utils";

import { NavbarItemContext, useNavbarItem } from "./navbar-item-context";

export type NavbarItemModifierProps = {
  active?: boolean;
  dropdown?: boolean;
  expanded?: boolean;
  hoverable?: boolean;
  managed?: boolean;
  onClick?: React.MouseEventHandler;
  tab?: boolean;
  up?: boolean;
};

export type NavbarItemProps = HelpersProps & NavbarItemModifierProps;

export const NavbarItem = Object.assign(
  forwardRefAs<NavbarItemProps>(
    (
      {
        as,
        active: _active,
        className: initialClassName,
        dropdown,
        expanded,
        hoverable,
        managed,
        onClick,
        tab,
        up,
        ...rest
      },
      ref,
    ) => {
      const [active, _setActive] = React.useState(
        managed ? Boolean(_active) : false,
      );
      const setActive = React.useCallback(
        (v: boolean) => {
          if (managed !== true) {
            _setActive(v);
          }
        },
        [managed],
      );
      React.useEffect(() => setActive(Boolean(_active)), [_active, setActive]);

      const innerRef = React.useRef<HTMLElement>(null);

      const { active: ctxActive, setActive: ctxSetActive } = useNavbarItem();

      const handleClick = React.useCallback(
        (event: React.MouseEvent) => {
          if (onClick !== undefined) {
            onClick(event);
          }
          ctxSetActive(!ctxActive);
        },
        [ctxActive, ctxSetActive, onClick],
      );

      React.useEffect(() => {
        if (dropdown !== true) {
          return undefined;
        }

        const handleDocumentClick = (event: MouseEvent) => {
          if (managed !== true && active && innerRef.current !== null) {
            if (
              event.target instanceof Element &&
              !innerRef.current.contains(event.target)
            ) {
              setActive(false);
            }
          }
        };

        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
      }, [active, dropdown, managed, setActive]);

      const genericProps: React.ComponentProps<typeof Generic> = {
        as,
        className: classNames(
          "navbar-item",
          {
            "has-dropdown": dropdown,
            "has-dropdown-up": up,
            "is-active": active,
            "is-expanded": expanded,
            "is-hoverable": hoverable,
            "is-tab": tab,
          },
          initialClassName,
        ),
        ...rest,
      };

      if (dropdown === true) {
        genericProps.as = as === "a" ? "div" : as;
      } else {
        genericProps.onClick = handleClick;
      }

      const node = (
        <Generic {...genericProps} ref={combineRefs(ref, innerRef)} />
      );

      if (dropdown === true) {
        return (
          <NavbarItemContext.Provider value={{ active, setActive }}>
            {node}
          </NavbarItemContext.Provider>
        );
      }

      return node;
    },
    { as: "a" },
  ),
);

NavbarItem.displayName = "Navbar.Item";
NavbarItem.propTypes = {
  active: PropTypes.bool,
  dropdown: PropTypes.bool,
  expanded: PropTypes.bool,
  hoverable: PropTypes.bool,
  managed: PropTypes.bool,
  onClick: PropTypes.func,
  tab: PropTypes.bool,
  up: PropTypes.bool,
};
