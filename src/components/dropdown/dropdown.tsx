import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic, HelpersProps } from "../../base";
import { tuple } from "../../utils";
import { combineRefs } from "../../utils";
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
  managed: boolean;
  up: boolean;
}>;

export type DropdownProps = HelpersProps & DropdownModifierProps;

const propTypes = {
  active: PropTypes.bool,
  align: PropTypes.oneOf(DROPDOWN_ALIGNMENTS),
  hoverable: PropTypes.bool,
  managed: PropTypes.bool,
  up: PropTypes.bool,
};

const initialState = {
  active: false,
};

export type DropdownContainerProps = DropdownProps & {
  as?: React.ReactType<any>;
  innerRef: React.Ref<HTMLDivElement>;
};
export type DropdownContainerState = typeof initialState;

export class DropdownContainer extends React.PureComponent<
  DropdownContainerProps,
  DropdownContainerState
> {
  public static Menu = DropdownMenu;
  public static Trigger = DropdownTrigger;

  public readonly state: DropdownContainerState;

  private ref = React.createRef<HTMLDivElement>();

  constructor(props: DropdownContainerProps) {
    super(props);
    this.state = { active: props.active || false };
  }

  public componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this.handleClick!);
  }

  public render() {
    const {
      align,
      active,
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
        {
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
        }
      </DropdownContext.Provider>
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

export const Dropdown = Object.assign(
  forwardRefAs<DropdownProps, "div">(
    (props, ref) => <DropdownContainer innerRef={ref} {...props} />,
    { as: "div" },
  ),
  {
    Content: DropdownContent,
    Context: DropdownContext,
    Divider: DropdownDivider,
    Item: DropdownItem,
    Menu: DropdownMenu,
    Trigger: DropdownTrigger,
    propTypes,
  },
);
