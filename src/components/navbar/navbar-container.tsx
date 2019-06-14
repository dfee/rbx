import classNames from "classnames";
import React from "react";

import { Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";
import { canUseDOM } from "../../utils";
import { NavbarContext } from "./navbar-context";

export const NAVBAR_DEFAULTS = {
  fixedAlignments: ["top", "bottom"] as const,
};

export interface NavbarVariablesOverrides {}

export interface NavbarVariablesDefaults {
  fixedAlignments: (typeof NAVBAR_DEFAULTS["fixedAlignments"])[number];
}

export type NavbarVariables = Prefer<
  NavbarVariablesOverrides,
  NavbarVariablesDefaults
>;

export type NavbarContainerModifierProps = {
  /** * Determines whether the menu is displayed on mobile */
  active?: boolean;
  as?: React.ReactType; // tslint:disable-line:no-reserved-keywords
  color?: Variables["colors"];
  document?: Document;
  fixed?: NavbarVariables["fixedAlignments"];
  innerRef?: React.Ref<HTMLElement | SVGElement | React.ComponentType>;
  managed?: boolean;
  transparent?: boolean;
};

export type NavbarContainerProps = HelpersProps & NavbarContainerModifierProps;

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
  public static displayName = "Navbar.Container";

  public readonly state: NavbarContainerState;

  constructor(props: NavbarContainerProps) {
    super(props);
    this.state = { active: props.active === true };
  }

  public componentWillUnmount() {
    if (canUseDOM()) {
      const { fixed } = this.props;
      const html = this.document.querySelector("html");
      /* istanbul ignore else: typeguard */
      if (html !== null) {
        html.classList.remove(`has-navbar-fixed-${fixed}`);
      }
    }
  }

  public render() {
    this.manageHtmlAttributes();

    const {
      active, // only used for initialState (in constructor)
      className,
      color,
      fixed,
      innerRef,
      managed,
      transparent,
      ...rest
    } = this.props;

    return (
      <NavbarContext.Provider
        value={{
          active: this.active,
          setActive: (value: boolean) => {
            this.active = value;
          },
        }}
      >
        <Generic
          className={classNames(
            "navbar",
            {
              "is-transparent": transparent,
              [`is-fixed-${fixed}`]: fixed,
              [`is-${color}`]: color,
            },
            className,
          )}
          ref={innerRef}
          role="navigation"
          {...rest}
        />
      </NavbarContext.Provider>
    );
  }

  private get active() {
    return this.props.managed === true
      ? this.props.active === true
      : this.state.active;
  }

  private set active(value: boolean) {
    if (this.props.managed !== true) {
      this.setState({ active: value });
    }
  }

  private get document() {
    return this.props.document !== undefined ? this.props.document : document;
  }

  private manageHtmlAttributes() {
    if (canUseDOM()) {
      const html = this.document.querySelector("html");
      /* istanbul ignore else: typeguard */
      if (html !== null) {
        html.classList.remove("has-navbar-fixed-top");
        html.classList.remove("has-navbar-fixed-bottom");
        if (this.props.fixed !== undefined) {
          html.classList.add(`has-navbar-fixed-${this.props.fixed}`);
        }
      }
    }
  }
}
