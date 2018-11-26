import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import Box from "components/box";
import Breadcrumb from "components/breadcrumb";
import { BreadcrumbProps } from "components/breadcrumb/Breadcrumb";

const makeSeparator = () =>
  select(
    "Separator",
    {
      arrow: "arrow",
      bullet: "bullet",
      dot: "dot",
      succeeds: "succeeds",
    },
    "arrow",
  );

const items = [
  {
    name: "Storybook",
    url: "#1",
  },
  {
    name: "Breadcrumb",
    url: "#2",
  },
  {
    active: true,
    name: "Breadcrumb Types",
    url: "#3",
  },
];

storiesOf("Breadcrumb", module)
  .add("Default", () => (
    <div>
      <Box>
        <Breadcrumb separator={makeSeparator()} items={items} />
      </Box>
    </div>
  ))
  .add("Use Custom render Element", () => {
    const Anchor = ({ children, unselectable, ...props }: BreadcrumbProps) => (
      <a className="Others" {...props}>
        {children}
      </a>
    );

    return (
      <div>
        <Box>
          <Breadcrumb
            renderAs={Anchor}
            hrefAttr="href"
            separator={makeSeparator()}
            items={items}
          />
        </Box>
      </div>
    );
  });
