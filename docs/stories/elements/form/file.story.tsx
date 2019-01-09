import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, File } from "src/elements";
import { FILE_DEFAULTS, FileProps } from "src/elements/form/file";
import { Section } from "src/layout";

import { colorKnob } from "docs/stories/common";
import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  align: (title: string = "Alignment") =>
    select(
      title,
      iterableToSelectObject(FILE_DEFAULTS.alignments, { undefined: "" }),
      "",
    ),
  boxed: (title: string = "Boxed") => boolean(title, false),
  fullwidth: (title: string = "Fullwidth") => boolean(title, false),
  hasName: (title: string = "Has name") => boolean(title, true),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(FILE_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
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

    const withName = hasName === true && this.state.filename !== undefined;
    const filename = withName ? (
      <File.Name>{this.state.filename}</File.Name>
    ) : (
      undefined
    );

    return (
      <Control>
        <File {...rest} hasName={withName}>
          <File.Label>
            <File.Input name={name} onChange={this.select} />
            <File.CTA>
              <File.Icon>
                <FontAwesomeIcon icon={faUpload} />
              </File.Icon>
              <File.Label as="span">Choose a File</File.Label>
            </File.CTA>
            {filename}
          </File.Label>
        </File>
      </Control>
    );
  }

  private readonly select = (event: React.FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    this.setState({
      filename: files !== null && files.length > 0 ? files[0].name : undefined,
    });
    if (this.props.onChange !== undefined) {
      this.props.onChange(event);
    }
  }
}

storiesOf("Elements/Form/File", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = filterUndefined({
      align: knobs.align(),
      boxed: knobs.boxed(),
      color: colorKnob(),
      fullwidth: knobs.fullwidth(),
      hasName: knobs.hasName(),
      size: knobs.size(),
    });

    const filename = props.hasName ? (
      <File.Name>Screen Shot 2017-07-29 at 15.54.25.png</File.Name>
    ) : (
      undefined
    );

    return (
      <Control>
        <File {...props}>
          <File.Label>
            <File.Input name="resume" />
            <File.CTA>
              <File.Icon>
                <FontAwesomeIcon icon={faUpload} />
              </File.Icon>
              <File.Label as="span">Choose a File</File.Label>
            </File.CTA>
            {filename}
          </File.Label>
        </File>
      </Control>
    );
  })
  .add("Controlled", () => {
    const props = filterUndefined({
      align: knobs.align(),
      boxed: knobs.boxed(),
      color: colorKnob(),
      fullwidth: knobs.fullwidth(),
      hasName: knobs.hasName(),
      size: knobs.size(),
    });

    return <ControlledFile name="resume" {...props} />;
  });
