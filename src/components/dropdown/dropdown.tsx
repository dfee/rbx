import { cx } from "emotion";
import React, { PureComponent } from "react";

import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { ModifierProps, transformModifiers } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { DropdownDivider } from "./dropdown-divider";
import { DropdownItem } from "./dropdown-item";

export type DropdownModifierProps = Partial<{
  align: "right";
  color: Colors;
  hoverable: boolean;
  innerRef: React.RefObject<HTMLDivElement>;
  onChange: (value: string) => void;
  value: string;
}> &
  Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "color" | "onChange" | "unselectable"
  >;

export type DropdownProps = ModifierProps & DropdownModifierProps;

const initialState = {
  open: false,
};

export type DropdownState = typeof initialState;

export class Dropdown extends PureComponent<DropdownProps, DropdownState> {
  public static Item = DropdownItem;
  public static Divider = DropdownDivider;

  public static defaultProps = {
    children: [],
  };

  public readonly state: DropdownState = initialState;

  private htmlElement: React.RefObject<HTMLDivElement>;
  private listener: (() => void) | null = null;

  constructor(props: DropdownProps) {
    super(props);
    this.htmlElement = props.innerRef || React.createRef<HTMLDivElement>();
  }

  public componentDidMount() {
    this.listener = () => this.close;
    document.addEventListener("click", this.listener);
  }

  public componentWillUnmount() {
    document.removeEventListener("click", this.listener!);
    this.listener = null;
  }

  public toggle = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (this.props.hoverable) {
      return;
    }
    if (evt) {
      evt.preventDefault();
    }
    this.setState(({ open }) => ({ open: !open }));
  }

  public select = (value: string) => () => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    this.close();
  }

  public render() {
    const {
      children,
      value,
      color,
      align,
      hoverable,
      onChange,
      ...rest
    } = transformModifiers(this.props);
    rest.className = cx("dropdown", rest.className, {
      "is-active": this.state.open,
      [`is-,${align}`]: align,
      "is-hoverable": hoverable,
    });

    let current = null;

    const childrenArray = React.Children.map(children, (child, i) => {
      if (typeof child !== "string" && typeof child !== "number") {
        if (i === 0 || child.props.value === value) {
          current = child.props.children;
        }
        return React.cloneElement(
          child,
          child.type === DropdownItem
            ? {
                active: child.props.value === value,
                onClick: this.select(child.props.value),
              }
            : {},
        );
      }
      return child;
    });

    return (
      <div {...rest} ref={this.htmlElement}>
        <div
          className="dropdown-trigger"
          role="presentation"
          onClick={this.toggle}
        >
          <Button color={color}>
            <span>{current}</span>
            <Icon icon="angle-down" size="small" />
          </Button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">{childrenArray}</div>
        </div>
      </div>
    );
  }

  private close(event?: MouseEvent) {
    // IDK yet how to test using the ref in enzyme
    if (
      this.props.hoverable ||
      (event &&
        this.htmlElement.current &&
        event.target instanceof HTMLElement &&
        !this.htmlElement.current.contains(event.target))
    ) {
      return;
    }
    this.setState({ open: false });
  }
}
