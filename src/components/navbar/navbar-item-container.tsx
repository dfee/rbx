import classNames from "classnames";
import React from "react";

import { Generic, HelpersProps } from "../../base";
import { combineRefs } from "../../utils";
import { NavbarItemContext } from "./navbar-item-context";

export type NavbarItemContainerModifierProps = Partial<{
  active: boolean;
  as: React.ReactType<any>;
  dropdown: boolean;
  dropdownUp: boolean;
  hoverable: boolean;
  innerRef: React.Ref<HTMLElement>;
  managed: boolean;
  onClick: React.MouseEventHandler<any>;
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
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: NavbarItemContainerProps) {
    super(props);
    this.state = { active: props.active || false };
  }

  public componentDidMount() {
    if (this.props.dropdown) {
      document.addEventListener("click", this.handleClick);
    }
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this.handleClick!);
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

    const asOverride = dropdown && as === "a" ? "div" : as;
    const ref = combineRefs(this.ref, innerRef);

    if (dropdown) {
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
        {context => (
          <Generic
            as={asOverride}
            className={className}
            onClick={(event: React.MouseEvent<any>) => {
              if (onClick) {
                onClick(event);
              }
              context.setActive(!context.active);
            }}
            ref={ref}
            {...rest}
          />
        )}
      </NavbarItemContext.Consumer>
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

  private handleClick = (event: MouseEvent) => {
    if (!this.props.managed && this.active && this.ref.current) {
      if (
        event.target instanceof Element &&
        !this.ref.current.contains(event.target)
      ) {
        this.active = false;
      }
    }
  }
}
