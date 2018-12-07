import { cx } from "emotion";
import React from "react";

import { forwardRefAs, Generic } from "@/base";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { canUseDOM } from "@/utils";
import { tuple } from "@/utils";
import { NavbarBrand } from "./navbar-brand";
import { NavbarBurger } from "./navbar-burger";
import { NavbarContext } from "./navbar-context";
import { NavbarDivider } from "./navbar-divider";
import { NavbarDropdown } from "./navbar-dropdown";
import { NavbarEnd } from "./navbar-end";
import { NavbarItem } from "./navbar-item";
import { NavbarLink } from "./navbar-link";
import { NavbarMenu } from "./navbar-menu";
import { NavbarStart } from "./navbar-start";

let htmlClass = "";

export const getHtmlClasses = () => htmlClass;

export const NAVBAR_FIXED_ALIGNMENTS = tuple("top", "bottom");
export type NavbarFixedAlignments = (typeof NAVBAR_FIXED_ALIGNMENTS)[number];

export type NavbarModifierProps = Partial<{
  /**
   * Determines whether the menu is displayed on mobile
   */
  active: boolean;
  className: string;
  color: Colors;
  fixed: NavbarFixedAlignments;
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
    } = transformModifiers(this.props);

    rest.className = cx("navbar", rest.className, {
      "is-transparent": transparent,
      [`is-fixed-${fixed}`]: fixed,
      [`is-${color}`]: color,
    });

    return (
      <NavbarContext.Provider
        value={{
          active: this.active,
          setActive: (value: boolean) => {
            this.active = value;
          },
        }}
      >
        <Generic ref={innerRef} role="navigation" {...rest} />
      </NavbarContext.Provider>
    );
  }

  private get managed() {
    return this.props.active !== undefined;
  }

  private get active() {
    return this.managed ? this.props.active || false : this.state.active;
  }

  private set active(value: boolean) {
    if (!this.managed) {
      this.setState({ active: value });
    }
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
  forwardRefAs<NavbarProps, "nav">(
    (props, ref) => <NavbarController innerRef={ref} {...props} />,
    "nav",
  ),
  {
    Brand: NavbarBrand,
    Burger: NavbarBurger,
    Context: NavbarContext,
    Divider: NavbarDivider,
    Dropdown: NavbarDropdown,
    End: NavbarEnd,
    Item: NavbarItem,
    Link: NavbarLink,
    Menu: NavbarMenu,
    Start: NavbarStart,
  },
);
