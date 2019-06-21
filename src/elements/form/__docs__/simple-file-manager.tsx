import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";

import { Control, File } from "src/elements";
import { FileProps } from "src/elements/form/file";

export type SimpleFileManagerProps = Pick<
  FileProps,
  "align" | "boxed" | "color" | "fullwidth" | "hasName" | "size"
> & { name: string; onChange?: React.FormEventHandler<HTMLInputElement> };

export const SimpleFileManager = ({
  hasName,
  name,
  onChange,
  ...rest
}: SimpleFileManagerProps) => {
  const [filename, setFilename] = useState<string | undefined>(undefined);

  const select = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { files } = event.currentTarget;
      setFilename(
        files !== null && files.length > 0 ? files[0].name : undefined,
      );
      if (onChange !== undefined) {
        onChange(event);
      }
    },
    [onChange, setFilename],
  );

  const withName = hasName === true && filename !== undefined;
  const filenameNode = withName ? <File.Name>{filename}</File.Name> : undefined;

  return (
    <Control>
      <File {...rest} hasName={withName}>
        <File.Label>
          <File.Input name={name} onChange={select} />
          <File.CTA>
            <File.Icon>
              <FontAwesomeIcon icon={faUpload} />
            </File.Icon>
            <File.Label as="span">Choose a File</File.Label>
          </File.CTA>
          {filenameNode}
        </File.Label>
      </File>
    </Control>
  );
};
