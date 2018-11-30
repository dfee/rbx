import { cx } from "emotion";
import React from "react";

import { Element } from "@/components/element";
import { asExoticComponent } from "@/components/exotic";
import { ModifierProps, modify } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { canUseDOM } from "@/utils";
import { NavbarBrand } from "./navbar-brand";
import { NavbarBurger } from "./navbar-burger";
import { NavbarContainer } from "./navbar-container";
import { NavbarContext } from "./navbar-context";
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

interface NavbarControllerState {
  active: boolean;
}

class NavbarController extends React.PureComponent<
  NavbarControllerProps,
  NavbarControllerState
> {
  public static defaultProps = {
    active: false,
    children: null,
    transparent: false,
  };

  public readonly state: NavbarControllerState;

  constructor(props: NavbarControllerProps) {
    super(props);
    this.state = { active: props.active! };
  }

  public setActive = (value: boolean) => {
    this.setState({ active: value });
  }

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
    this.manageHtmlAttributes();

    const {
      active, // only used for initialState (in constructor)
      color,
      fixed,
      innerRef,
      transparent,
      ...rest
    } = modify(this.props);

    rest.className = cx("navbar", rest.className, {
      "is-transparent": transparent,
      [`is-fixed-${fixed}`]: fixed,
      [`is-${color}`]: color,
    });

    return (
      <NavbarContext.Provider
        value={{ active: this.state.active, setActive: this.setActive }}
      >
        <Element ref={innerRef} role="navigation" {...rest} />
      </NavbarContext.Provider>
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
  asExoticComponent<NavbarProps, "nav">(
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
