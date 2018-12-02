import { cx } from "emotion";
import React from "react";

import { Generic } from "@/extras/generic";
import { ModifierProps } from "@/modifiers";
import { Colors } from "@/modifiers/color";
import { noop } from "@/utils";

export type InputFileModifierProps = Partial<{
  boxed: boolean;
  className: string;
  color: Colors;
  fileName: boolean;
  fullwidth: boolean;
  icon: React.ReactElement<any>;
  label: string;
  /**
   * The name of the input field Commonly used for
   * [multi-input handling]
   * (https://reactjs.org/docs/forms.html#handling-multiple-inputs)
   */
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  right: boolean;
  size: "small" | "medium" | "large";
  style: React.CSSProperties;
}>;

export type InputFileProps = Prefer<
  ModifierProps & InputFileModifierProps,
  React.HTMLAttributes<HTMLInputElement>
>;

export interface InputFileState {
  filename?: string;
}

export class InputFile extends React.PureComponent<
  InputFileProps,
  InputFileState
> {
  public static defaultProps = {
    fileName: true,
    label: "Choose a file...",
    onChange: noop,
  };

  public readonly state: InputFileState = { filename: undefined };

  public select = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    this.setState({
      filename: files && files.length > 0 ? files[0].name : undefined,
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  public render() {
    const {
      boxed,
      className,
      color,
      fileName,
      fullwidth,
      icon,
      label,
      name,
      onChange,
      right,
      size,
      style,
      unselectable,
      ...rest
    } = this.props;

    const { filename } = this.state;

    return (
      <Generic
        className={cx("file", className, {
          "has-name": !fileName,
          [`is-${size}`]: size,
          [`is-${color}`]: color,
          "is-boxed": boxed,
          "is-fullwidth": fullwidth,
          "is-right": right,
        })}
        style={style}
        unselectable={unselectable}
      >
        <label className="file-label">
          <input
            className="file-input"
            name={name}
            onChange={this.select}
            type="file"
            value=""
            {...rest}
          />
          <span className="file-cta">
            {icon && <span className="file-icon">{icon}</span>}
            <span className="file-label">{label}</span>
          </span>
          {fileName && filename && (
            <span className="file-name">{filename}</span>
          )}
        </label>
      </Generic>
    );
  }
}
