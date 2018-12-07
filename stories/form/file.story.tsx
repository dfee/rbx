import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, File } from "@/form";
import { FILE_ALIGNMENTS, FILE_SIZES, FileProps } from "@/form/file";
import { Section } from "@/layout";

import { iterableToSelectObject } from "../helpers";
import { knobs as modifiersKnobs } from "../modifiers";

export const knobs = {
  align: (title: string = "Alignment") =>
    select(
      title,
      iterableToSelectObject(FILE_ALIGNMENTS, { undefined: "" }),
      "",
    ),
  boxed: (title: string = "Boxed") => boolean(title, false),
  fullwidth: (title: string = "Fullwidth") => boolean(title, false),
  hasName: (title: string = "Has name") => boolean(title, true),
  size: (title: string = "Size") =>
    select(title, iterableToSelectObject(FILE_SIZES, { undefined: "" }), ""),
};

export type ControlledFileProps = Pick<
  FileProps,
  "align" | "boxed" | "color" | "fullwidth" | "hasName" | "size"
> & { name: string; onChange?: React.FormEventHandler<HTMLInputElement> };

export interface ControlledFileState {
  filename?: string;
}

export class ControlledFile extends React.PureComponent<
  ControlledFileProps,
  ControlledFileState
> {
  public readonly state: ControlledFileState = {};
  constructor(props: ControlledFileProps) {
    super(props);
    this.state = {};
  }
  public render() {
    const { hasName, name, onChange, ...rest } = this.props;
    const withName = hasName && this.state.filename ? true : false;

    return (
      <Control>
        <File {...rest} hasName={withName}>
          <File.Label>
            <File.Input name={name} onChange={this.select} />
            <File.CTA>
              <File.Icon>
                <FontAwesomeIcon icon={faUpload} />
              </File.Icon>
              <File.Label<"span"> as="span">Choose a File</File.Label>
            </File.CTA>
            {withName && <File.Name>{this.state.filename}</File.Name>}
          </File.Label>
        </File>
      </Control>
    );
  }

  private select = (event: React.FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    this.setState({
      filename: files && files.length > 0 ? files[0].name : undefined,
    });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }
}

storiesOf("Form/File", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const { align, color, size, ...rest } = {
      align: knobs.align(),
      boxed: knobs.boxed(),
      color: modifiersKnobs.color(),
      fullwidth: knobs.fullwidth(),
      hasName: knobs.hasName(),
      size: knobs.size(),
    };
    return (
      <Control>
        <File
          align={align || undefined}
          color={color || undefined}
          {...rest}
          size={size || undefined}
        >
          <File.Label>
            <File.Input name="resume" />
            <File.CTA>
              <File.Icon>
                <FontAwesomeIcon icon={faUpload} />
              </File.Icon>
              <File.Label<"span"> as="span">Choose a File</File.Label>
            </File.CTA>
            {rest.hasName && (
              <File.Name>Screen Shot 2017-07-29 at 15.54.25.png</File.Name>
            )}
          </File.Label>
        </File>
      </Control>
    );
  })
  .add("Controlled", () => {
    const { align, color, size, ...rest } = {
      align: knobs.align(),
      boxed: knobs.boxed(),
      color: modifiersKnobs.color(),
      fullwidth: knobs.fullwidth(),
      hasName: knobs.hasName(),
      size: knobs.size(),
    };
    return (
      <ControlledFile
        align={align || undefined}
        color={color || undefined}
        name="resume"
        size={size || undefined}
        {...rest}
      />
    );
  });
