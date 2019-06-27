import * as React from "react";

import { Table } from "src/elements";

import { PropDoc } from "./types";

export type DescriptionCellProps = {
  description: PropDoc["description"];
};

export const DescriptionCell = ({ description }: DescriptionCellProps) => {
  if (description === undefined) {
    return <Table.Cell />;
  }

  return <Table.Cell>{description}</Table.Cell>;
};
