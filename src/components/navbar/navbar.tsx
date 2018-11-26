import { cx } from "emotion";
import React from "react";

import Element from "components/element";
import renderAsExoticComponent, {
  RenderAsExoticComponent,
} from "components/render-as-exotic-component";
import modifiers, { ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";
import { canUseDOM } from "utils";
import { ShowContext } from "./context";
import NavbarBrand from "./NavbarBrand";
import NavbarBurger from "./NavbarBurger";
import NavbarContainer from "./NavbarContainer";
import NavbarDivider from "./NavbarDivider";
import NavbarDropdown from "./NavbarDropdown";
import NavbarItem from "./NavbarItem";
import NavbarLink from "./NavbarLink";
import NavbarMenu from "./NavbarMenu";

let htmlClass = "";

export const getHtmlClasses = () => htmlClass;

export type NavbarModifierProps = Partial<{
  active: boolean;
  children: React.ReactNode;
  className: string;
  color: Colors;
  fixed: "top" | "bottom";
  style: React.CSSProperties;
  transparent: boolean;
}> & {
  innerRef: React.Ref<HTMLDivElement>;
};

export type NavbarProps = ModifierProps & NavbarModifierProps;

class Navbar extends React.PureComponent<NavbarProps> {
  public static defaultProps = {
    active: false,
    children: null,
    transparent: false,
  };

  public componentWillUnmount() {
    if (canUseDOM()) {
      const { fixed } = this.props;
      const html = window.document.querySelector("html");
      if (html) {
        html.classList.remove(`has-navbar-fixed-${fixed}`);
      }
    }
  }

  public render() {
    const {
      innerRef,
      children,
      className,
      fixed,
      transparent,
      color,
      active,
      ...props
    } = this.props;

    this.manageHtmlAttributes();
    return (
      <ShowContext.Provider value={{ active: active! }}>
        <Element
          {...props}
          ref={innerRef}
          role="navigation"
          className={cx("navbar", modifiers.classNames(props), className, {
            "is-transparent": transparent,
            [`is-fixed-${fixed}`]: fixed,
            [`is-${color}`]: color,
          })}
        >
          {children}
        </Element>
      </ShowContext.Provider>
    );
  }

  private manageHtmlAttributes() {
    if (canUseDOM()) {
      const html = window.document.querySelector("html");
      if (html) {
        html.classList.remove("has-navbar-fixed-top");
        html.classList.remove("has-navbar-fixed-bottom");
        if (this.props.fixed) {
          htmlClass = `has-navbar-fixed-${this.props.fixed}`;
          html.classList.add(`has-navbar-fixed-${this.props.fixed}`);
        }
      }
    }
  }
}

export type NavbarRefProps = Omit<NavbarProps, "innerRef">;

type NavbarRef = RenderAsExoticComponent<NavbarRefProps, "nav"> & {
  Brand: typeof NavbarBrand;
  Burger: typeof NavbarBurger;
  Container: typeof NavbarContainer;
  Divider: typeof NavbarDivider;
  Dropdown: typeof NavbarDropdown;
  Item: typeof NavbarItem;
  Link: typeof NavbarLink;
  Menu: typeof NavbarMenu;
};

const NavbarRef: Partial<NavbarRef> = renderAsExoticComponent<
  NavbarRefProps,
  "nav"
>((props, ref) => <Navbar innerRef={ref} {...props} />, "nav");

NavbarRef.Brand = NavbarBrand;
NavbarRef.Burger = NavbarBurger;
NavbarRef.Menu = NavbarMenu;
NavbarRef.Item = NavbarItem;
NavbarRef.Dropdown = NavbarDropdown;
NavbarRef.Link = NavbarLink;
NavbarRef.Divider = NavbarDivider;
NavbarRef.Container = NavbarContainer;

export default NavbarRef as NavbarRef;
