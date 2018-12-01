import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Box } from "@/components/box";
import { Breadcrumb } from "@/components/breadcrumb";

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
  { href: "#1", name: "Storybook" },
  { href: "#2", name: "Breadcrumb" },
  { active: true, href: "#3", name: "Breadcrumb Types" },
];

storiesOf("Breadcrumb", module)
  .add("Default", () => (
    <div>
      <Box>
        <Breadcrumb separator={makeSeparator()}>
          {items.map(({ active, href, name }, i) => (
            <Breadcrumb.Item active={active} href={href} key={i}>
              {name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Box>
    </div>
  ))
  .add("Use Custom render Element", () => {
    const Link: React.FC<{ children: React.ReactNode; to: string }> = props => (
      <a href={props.to}>{props.children}</a>
    );
    return (
      <div>
        <Box>
          <Breadcrumb separator={makeSeparator()}>
            {items.map(({ active, href: to, name }, i) => (
              <Breadcrumb.Item<typeof Link>
                as={Link}
                active={active}
                to={to}
                key={i}
              >
                {name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Box>
      </div>
    );
  });
