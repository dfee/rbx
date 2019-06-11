import React from "react";

import { HelpersProps } from "src/base/helpers";
import { Table } from "src/elements";

import { PropDoc } from "./types";

export type RequiredCellProps = {
  required: PropDoc["required"];
};

export const RequiredCell = ({ required }: RequiredCellProps) => {
  const props: {
    children: React.ReactNode;
    textColor: HelpersProps["textColor"];
  } = {
    children: required === true ? "true" : "false",
    textColor: required === true ? "danger" : "grey-light",
  };

  return <Table.Cell {...props} />;
};
