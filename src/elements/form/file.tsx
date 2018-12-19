import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  forwardRefAs,
  genericPropTypes,
  HelpersProps,
  transformHelpers,
} from "../../base";
import { Colors, COLORS } from "../../base/helpers";
import { tuple } from "../../utils";

import { FileCTA } from "./file-cta";
import { FileIcon } from "./file-icon";
import { FileInput } from "./file-input";
import { FileLabel } from "./file-label";
import { FileName } from "./file-name";

export const FILE_ALIGNMENTS = tuple("centered", "right");
export type FileAlignmnts = (typeof FILE_ALIGNMENTS)[number];

export const FILE_SIZES = tuple("small", "medium", "large");
export type FileSizes = (typeof FILE_SIZES)[number];

export type FileModifierProps = Partial<{
  align: FileAlignmnts;
  boxed: boolean;
  color: Colors;
  fullwidth: boolean;
  hasName: boolean;
  size: FileSizes;
}>;

export type FileProps = HelpersProps & FileModifierProps;

const propTypes = {
  ...genericPropTypes,
  align: PropTypes.oneOf(FILE_ALIGNMENTS),
  boxed: PropTypes.bool,
  color: PropTypes.oneOf(COLORS),
  fullwidth: PropTypes.bool,
  hasName: PropTypes.bool,
  size: PropTypes.oneOf(FILE_SIZES),
};

export const File = Object.assign(
  forwardRefAs<FileProps, "div">(
    (props, ref) => {
      const {
        as,
        align,
        boxed,
        color,
        hasName,
        fullwidth,
        size,
        ...rest
      } = transformHelpers(props);
      rest.className = classNames("file", rest.className, {
        "has-name": hasName,
        [`is-${align}`]: align,
        "is-boxed": boxed,
        [`is-${color}`]: color,
        "is-fullwidth": fullwidth,
        [`is-${size}`]: size,
      });
      return React.createElement(as!, { ref, ...rest });
    },
    { as: "div" },
  ),
  {
    CTA: FileCTA,
    Icon: FileIcon,
    Input: FileInput,
    Label: FileLabel,
    Name: FileName,
    propTypes,
  },
);
