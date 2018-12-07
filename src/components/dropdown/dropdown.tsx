import { cx } from "emotion";
import React, { PureComponent } from "react";

import { ModifierProps, transformModifiers } from "@/modifiers";
import { tuple } from "@/utils";
import { combineRefs } from "@/utils";
import { DropdownContent } from "./dropdown-content";
import { DropdownContext } from "./dropdown-context";
import { DropdownDivider } from "./dropdown-divider";
import { DropdownItem } from "./dropdown-item";
import { DropdownMenu } from "./dropdown-menu";
import { DropdownTrigger } from "./dropdown-trigger";

export const DROPDOWN_ALIGNMENTS = tuple("right");
export type DropdownAlignments = (typeof DROPDOWN_ALIGNMENTS)[number];

export type DropdownModifierProps = Partial<{
  active: boolean;
  align: DropdownAlignments;
  hoverable: boolean;
  up: boolean;
}>;

export type DropdownProps = Prefer<
  ModifierProps & DropdownModifierProps,
  React.HTMLAttributes<HTMLDivElement>
>;

const initialState = {
  active: false,
};

export type DropdownControllerProps = DropdownProps & {
  innerRef: React.Ref<HTMLDivElement>;
};
export type DropdownControllerState = typeof initialState;

export class DropdownController extends PureComponent<
  DropdownControllerProps,
  DropdownControllerState
> {
  public static Menu = DropdownMenu;
  public static Trigger = DropdownTrigger;

  public static defaultProps = {
    children: [],
  };

  public readonly state: DropdownControllerState = initialState;

  private ref = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this.handleClick!);
  }

  public toggle = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (this.props.hoverable) {
      return;
    }
    if (evt) {
      evt.preventDefault();
    }
    this.setState(({ active }) => ({ active: !active }));
  }

  public render() {
    const {
      align,
      active,
      hoverable,
      innerRef,
      up,
      ...rest
    } = transformModifiers(this.props);
    rest.className = cx("dropdown", rest.className, {
      [`is-${align}`]: align,
      "is-active": this.active,
      "is-hoverable": hoverable,
      "is-up": up,
    });

    return (
      <DropdownContext.Provider
        value={{
          active: this.active,
          setActive: (value: boolean) => (this.active = value),
        }}
      >
        <div {...rest} ref={combineRefs(this.ref, innerRef)} />
      </DropdownContext.Provider>
    );
  }

  private get managed() {
    return this.props.hoverable || this.props.active !== undefined;
  }

  private get active() {
    return this.managed ? this.props.active || false : this.state.active;
  }

  private set active(value: boolean) {
    if (!this.managed) {
      this.setState({ active: value });
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (!this.managed && this.active && this.ref.current) {
      if (
        event.target instanceof Element &&
        !this.ref.current.contains(event.target)
      ) {
        this.active = false;
      }
    }
  }
}

export const Dropdown = Object.assign(
  React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
    return <DropdownController innerRef={ref} {...props} />;
  }),
  {
    Content: DropdownContent,
    Context: DropdownContext,
    Divider: DropdownDivider,
    Item: DropdownItem,
    Menu: DropdownMenu,
    Trigger: DropdownTrigger,
  },
);
