import { cx } from "emotion";
import React from "react";

import { Element } from "components/element";
import { renderAsExoticComponent } from "components/render-as-exotic-component";
import { classNames, ModifierProps } from "modifiers";
import { Colors } from "modifiers/colors";
import { canUseDOM } from "utils";
import { ShowContext } from "./context";
import { NavbarBrand } from "./navbar-brand";
import { NavbarBurger } from "./navbar-burger";
import { NavbarContainer } from "./navbar-container";
import { NavbarDivider } from "./navbar-divider";
import { NavbarDropdown } from "./navbar-dropdown";
import { NavbarItem } from "./navbar-item";
import { NavbarLink } from "./navbar-link";
import { NavbarMenu } from "./navbar-menu";

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
}>;

export type NavbarProps = ModifierProps & NavbarModifierProps;

type NavbarControllerProps = NavbarProps & {
  innerRef: React.Ref<HTMLDivElement>;
};

class NavbarController extends React.PureComponent<NavbarControllerProps> {
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
          className={cx("navbar", classNames(props), className, {
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

export const Navbar = Object.assign(
  renderAsExoticComponent<NavbarProps, "nav">(
    (props, ref) => <NavbarController innerRef={ref} {...props} />,
    "nav",
  ),
  {
    Brand: NavbarBrand,
    Burger: NavbarBurger,
    Container: NavbarContainer,
    Divider: NavbarDivider,
    Dropdown: NavbarDropdown,
    Item: NavbarItem,
    Link: NavbarLink,
    Menu: NavbarMenu,
  },
);
