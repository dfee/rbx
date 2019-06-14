import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { forwardRefAs, Generic } from "../../base";
import { HelpersProps } from "../../base/helpers";
import { Variables } from "../../base/helpers/variables";
import { Prefer } from "../../types";

import { FileCTA } from "./file-cta";
import { FileIcon } from "./file-icon";
import { FileInput } from "./file-input";
import { FileLabel } from "./file-label";
import { FileName } from "./file-name";

export const FILE_DEFAULTS = {
  alignments: ["centered", "right"] as const,
  sizes: ["small", "medium", "large"] as const,
};

export interface FileVariablesOverrides {}

export interface FileVariablesDefaults {
  alignments: (typeof FILE_DEFAULTS["alignments"])[number];
  sizes: (typeof FILE_DEFAULTS["sizes"])[number];
}

export type FileVariables = Prefer<
  FileVariablesOverrides,
  FileVariablesDefaults
>;

export type FileModifierProps = Partial<{
  align: FileVariables["alignments"];
  boxed: boolean;
  color: Variables["colors"];
  fullwidth: boolean;
  hasName: boolean;
  size: FileVariables["sizes"];
}>;

export type FileProps = HelpersProps & FileModifierProps;

export const File = Object.assign(
  forwardRefAs<FileProps>(
    (
      { align, boxed, className, color, fullwidth, hasName, size, ...rest },
      ref,
    ) => (
      <Generic
        className={classNames(
          "file",
          {
            "has-name": hasName,
            [`is-${align}`]: align,
            "is-boxed": boxed,
            [`is-${color}`]: color,
            "is-fullwidth": fullwidth,
            [`is-${size}`]: size,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    ),
    { as: "div" },
  ),
  {
    CTA: FileCTA,
    Icon: FileIcon,
    Input: FileInput,
    Label: FileLabel,
    Name: FileName,
  },
);

File.displayName = "File";
File.propTypes = {
  align: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  boxed: PropTypes.bool,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullwidth: PropTypes.bool,
  hasName: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
