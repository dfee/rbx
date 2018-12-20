import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Colors, COLORS } from "../../base/helpers";
import { canUseDOM, tuple } from "../../utils";
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

export const NAVBAR_FIXED_ALIGNMENTS = tuple("top", "bottom");
export type NavbarFixedAlignments = (typeof NAVBAR_FIXED_ALIGNMENTS)[number];

export type NavbarModifierProps = Partial<{
  /** * Determines whether the menu is displayed on mobile */
  active: boolean;
  color: Colors;
  fixed: NavbarFixedAlignments;
  managed: boolean;
  transparent: boolean;
}>;

export type NavbarProps = HelpersProps & NavbarModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
  color: PropTypes.oneOf(COLORS),
  fixed: PropTypes.oneOf(NAVBAR_FIXED_ALIGNMENTS),
  managed: PropTypes.bool,
  transparent: PropTypes.bool,
};

export type NavbarContainerProps = NavbarProps & {
  as: React.ReactType<any>;
  innerRef: React.Ref<HTMLDivElement>;
};

export interface NavbarContainerState {
  active: boolean;
}

export class NavbarContainer extends React.PureComponent<
  NavbarContainerProps,
  NavbarContainerState
> {
  public static defaultProps = {
    transparent: false,
  };

  public readonly state: NavbarContainerState;

  constructor(props: NavbarContainerProps) {
    super(props);
    this.state = { active: !!props.active };
  }

  public componentWillUnmount() {
    if (canUseDOM()) {
      const { fixed } = this.props;
      const html = document.querySelector("html");
      /* istanbul ignore else: typeguard */
      if (html) {
        html.classList.remove(`has-navbar-fixed-${fixed}`);
      }
    }
  }

  public render() {
    this.manageHtmlAttributes();

    const {
      active, // only used for initialState (in constructor)
      as,
      color,
      fixed,
      innerRef,
      managed,
      transparent,
      ...rest
    } = transformHelpers(this.props);

    rest.className = classNames("navbar", rest.className, {
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
        {React.createElement(as!, {
          ref: innerRef,
          role: "navigation",
          ...rest,
        })}
      </NavbarContext.Provider>
    );
  }

  private get active() {
    return this.props.managed ? this.props.active || false : this.state.active;
  }

  private set active(value: boolean) {
    if (!this.props.managed) {
      this.setState({ active: value });
    }
  }

  private manageHtmlAttributes() {
    if (canUseDOM()) {
      const html = document.querySelector("html");
      /* istanbul ignore else: typeguard */
      if (html) {
        html.classList.remove("has-navbar-fixed-top");
        html.classList.remove("has-navbar-fixed-bottom");
        if (this.props.fixed) {
          html.classList.add(`has-navbar-fixed-${this.props.fixed}`);
        }
      }
    }
  }
}

export const Navbar = Object.assign(
  forwardRefAs<NavbarProps, "nav">(
    (props, ref) => {
      const { as, ...rest } = props;
      return <NavbarContainer as={as!} innerRef={ref} {...rest} />;
    },
    { as: "nav" },
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
    propTypes,
  },
);
