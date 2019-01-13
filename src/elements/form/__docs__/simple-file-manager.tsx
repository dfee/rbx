import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Control, File } from "src/elements";
import { FileProps } from "src/elements/form/file";

export type SimpleFileManagerProps = Pick<
  FileProps,
  "align" | "boxed" | "color" | "fullwidth" | "hasName" | "size"
> & { name: string; onChange?: React.FormEventHandler<HTMLInputElement> };

export interface SimpleFileManagerState {
  filename?: string;
}

export class SimpleFileManager extends React.PureComponent<
  SimpleFileManagerProps,
  SimpleFileManagerState
> {
  public readonly state: SimpleFileManagerState = {};
  constructor(props: SimpleFileManagerProps) {
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
