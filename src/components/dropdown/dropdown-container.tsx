import classNames from "classnames";
import React from "react";

import { Generic, HelpersProps } from "../../base";
import { combineRefs, tuple } from "../../utils";
import { DropdownContext } from "./dropdown-context";

export const DROPDOWN_ALIGNMENTS = tuple("right");
export type DropdownAlignments = (typeof DROPDOWN_ALIGNMENTS)[number];

export type DropdownContainerModifierProps = Partial<{
  active: boolean;
  align: DropdownAlignments;
  as: React.ReactType; // tslint:disable-line:no-reserved-keywords
  hoverable: boolean;
  innerRef: React.Ref<HTMLElement | keyof JSX.IntrinsicElements>;
  managed: boolean;
  up: boolean;
}>;

export type DropdownContainerProps = HelpersProps &
  DropdownContainerModifierProps;

const initialState = {
  active: false,
};

export type DropdownContainerState = typeof initialState;

export class DropdownContainer extends React.PureComponent<
  DropdownContainerProps,
  DropdownContainerState
> {
  public readonly state: DropdownContainerState;
  private readonly ref = React.createRef<HTMLElement>();

  constructor(props: DropdownContainerProps) {
    super(props);
    this.state = { active: props.active === true };
  }

  public componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  public render() {
    const {
      active,
      align,
      className,
      hoverable,
      innerRef,
      managed,
      up,
      ...rest
    } = this.props;

    return (
      <DropdownContext.Provider
        value={{
          active: this.active,
          setActive: (value: boolean) => (this.active = value),
        }}
      >
        <Generic
          className={classNames(
            "dropdown",
            {
              [`is-${align}`]: align,
              "is-active": this.active,
              "is-hoverable": hoverable,
              "is-up": up,
            },
            className,
          )}
          ref={combineRefs(this.ref, innerRef)}
          {...rest}
        />
      </DropdownContext.Provider>
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

  private readonly handleClick = (event: MouseEvent) => {
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
}
