import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { combineRefs } from "@/utils";
import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { NavbarItemContext } from "./navbar-item-context";

export type NavbarItemModifierProps = Partial<{
  active: boolean;
  dropdown: boolean;
  dropdownUp: boolean;
  hoverable: boolean;
  managed: boolean; // todo: test
  onClick: React.MouseEventHandler<any>; // todo: test
}>;

export type NavbarItemProps = HelpersProps & NavbarItemModifierProps;

const propTypes = {
  ...genericPropTypes,
  active: PropTypes.bool,
  dropdown: PropTypes.bool,
  dropdownUp: PropTypes.bool,
  hoverable: PropTypes.bool,
  managed: PropTypes.bool,
  onClick: PropTypes.func,
};

export type NavbarItemContainerProps = NavbarItemProps & {
  as: React.ReactType<any>;
  innerRef: React.Ref<HTMLElement>;
};

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
      dropdown,
      dropdownUp,
      hoverable,
      innerRef,
      managed,
      onClick,
      ...rest
    } = transformHelpers(this.props);

    rest.className = classNames("navbar-item", rest.className, {
      "has-dropdown": dropdown,
      "has-dropdown-up": dropdownUp,
      "is-active": this.active,
      "is-hoverable": hoverable,
    });

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
          {React.createElement(asOverride!, { ref, ...rest })}
        </NavbarItemContext.Provider>
      );
    }
    return (
      <NavbarItemContext.Consumer>
        {context =>
          React.createElement(asOverride!, {
            onClick: (event: React.MouseEvent<any>) => {
              if (onClick) {
                onClick(event);
              }
              context.setActive(!context.active);
            },
            ref,
            ...rest,
          })
        }
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

export const NavbarItem = Object.assign(
  forwardRefAs<NavbarItemProps, "a">(
    (props, ref) => {
      const { as, ...rest } = props;
      return <NavbarItemContainer as={as!} innerRef={ref} {...rest} />;
    },
    { as: "a" },
  ),
  { propTypes },
);
