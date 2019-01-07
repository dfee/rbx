import classNames from "classnames";
import React from "react";

import { Generic, HelpersProps } from "../../base";
import { combineRefs } from "../../utils";
import {
  NavbarItemContext,
  NavbarItemContextValue,
} from "./navbar-item-context";

export type NavbarItemContainerModifierProps = Partial<{
  active: boolean;
  as: React.ReactType; // tslint:disable-line:no-reserved-keywords
  dropdown: boolean;
  dropdownUp: boolean;
  hoverable: boolean;
  innerRef: React.Ref<HTMLElement | keyof JSX.IntrinsicElements>;
  managed: boolean;
  onClick: React.MouseEventHandler;
}>;

export type NavbarItemContainerProps = HelpersProps &
  NavbarItemContainerModifierProps;

export interface NavbarItemContainerState {
  active: boolean;
}

export class NavbarItemContainer extends React.PureComponent<
  NavbarItemContainerProps,
  NavbarItemContainerState
> {
  public readonly state: NavbarItemContainerState;
  private readonly ref = React.createRef<HTMLElement>();

  constructor(props: NavbarItemContainerProps) {
    super(props);
    this.state = { active: props.active === true };
  }

  public componentDidMount() {
    if (this.props.dropdown === true) {
      document.addEventListener("click", this.handleDocumentClick);
    }
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  public render() {
    const {
      as,
      active,
      className: initialClassName,
      dropdown,
      dropdownUp,
      hoverable,
      innerRef,
      managed,
      onClick,
      ...rest
    } = this.props;

    const className = classNames(
      "navbar-item",
      {
        "has-dropdown": dropdown,
        "has-dropdown-up": dropdownUp,
        "is-active": this.active,
        "is-hoverable": hoverable,
      },
      initialClassName,
    );

    const ref = combineRefs(this.ref, innerRef);

    if (dropdown === true) {
      const asOverride = as === "a" ? "div" : as;

      return (
        <NavbarItemContext.Provider
          value={{
            active: this.active,
            setActive: (value: boolean) => (this.active = value),
          }}
        >
          <Generic as={asOverride} className={className} ref={ref} {...rest} />
        </NavbarItemContext.Provider>
      );
    }

    return (
      <NavbarItemContext.Consumer>
        {ctx => (
          <Generic
            as={as}
            className={className}
            onClick={this.handleOnClick(ctx)}
            ref={ref}
            {...rest}
          />
        )}
      </NavbarItemContext.Consumer>
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

  private readonly handleDocumentClick = (event: MouseEvent) => {
    if (
      this.props.managed !== true &&
      this.active &&
      this.ref.current !== null
    ) {
      if (
        event.target instanceof Element &&
        !this.ref.current.contains(event.target)
      ) {
        this.active = false;
      }
    }
  }

  private readonly handleOnClick = (ctx: NavbarItemContextValue) => (
    event: React.MouseEvent,
  ) => {
    if (this.props.onClick !== undefined) {
      this.props.onClick(event);
    }
    ctx.setActive(!ctx.active);
  }
}
