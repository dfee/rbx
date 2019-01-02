import classNames from "classnames";
import React from "react";

import { Generic, HelpersProps } from "../../base";
import { Colors } from "../../base/helpers";
import { canUseDOM, tuple } from "../../utils";
import { NavbarContext } from "./navbar-context";

export const NAVBAR_FIXED_ALIGNMENTS = tuple("top", "bottom");
export type NavbarFixedAlignments = (typeof NAVBAR_FIXED_ALIGNMENTS)[number];

export type NavbarContainerModifierProps = Partial<{
  /** * Determines whether the menu is displayed on mobile */
  active: boolean;
  as: React.ReactType<any>;
  color: Colors;
  fixed: NavbarFixedAlignments;
  innerRef: React.Ref<HTMLDivElement>;
  managed: boolean;
  transparent: boolean;
}>;

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
