import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faBold,
  faCheck,
  faItalic,
  faTimes,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { action } from "@storybook/addon-actions";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Button, Icon } from "@/elements";
import {
  BUTTON_SIZES,
  BUTTON_STATES,
  ButtonSizes,
} from "@/elements/button/button";
import { BUTTON_GROUP_POSITIONS } from "@/elements/button/button-group";
import { Section } from "@/layout";
import { COLORS } from "@/modifiers/color";

import { iterableToSelectObject, titleize } from "../helpers";

export const knobs = {
  disabled: (title: string = "Disabled") => boolean(title, false),
  fullwidth: (title: string = "Fullwidth") => boolean(title, false),
  inverted: (title: string = "Inverted") => boolean(title, false),
  outlined: (title: string = "Outlined") => boolean(title, false),
  rounded: (title: string = "Rounded") => boolean(title, false),
  size: (title: string = "Size") =>
    select(title, iterableToSelectObject(BUTTON_SIZES, { undefined: "" }), ""),
  state: (title: string = "State") =>
    select(title, iterableToSelectObject(BUTTON_STATES, { undefined: "" }), ""),
  static: (title: string = "Static") => boolean(title, false),
  text: (title: string = "Text") => boolean(title, false),
};

storiesOf("Elements/Button", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const { size, state, ...rest } = {
      disabled: knobs.disabled(),
      fullwidth: knobs.fullwidth(),
      inverted: knobs.inverted(),
      outlined: knobs.outlined(),
      rounded: knobs.rounded(),
      size: knobs.size(),
      state: knobs.state(),
      static: knobs.static(),
      text: knobs.text(),
    };

    return (
      <Button.Group>
        {COLORS.map(color => (
          <Button
            color={color}
            {...rest}
            onClick={action("Button Click")}
            onMouseEnter={action("Hover")}
            size={size || undefined}
            state={state || undefined}
          >
            {titleize(color)}
          </Button>
        ))}
      </Button.Group>
    );
  })
  .add("With Font Awesome icons", () => (
    <React.Fragment>
      <Button.Group>
        <Button>
          <Icon size="small">
            <FontAwesomeIcon icon={faBold} />
          </Icon>
        </Button>
        <Button>
          <Icon size="small">
            <FontAwesomeIcon icon={faItalic} />
          </Icon>
        </Button>
        <Button>
          <Icon size="small">
            <FontAwesomeIcon icon={faUnderline} />
          </Icon>
        </Button>
      </Button.Group>

      <Button.Group>
        <Button>
          <Icon>
            <FontAwesomeIcon icon={faGithub} />
          </Icon>
          <span>GitHub</span>
        </Button>

        <Button>
          <Icon>
            <FontAwesomeIcon icon={faTwitter} />
          </Icon>
          <span>Twitter</span>
        </Button>

        <Button color="success">
          <Icon size="small">
            <FontAwesomeIcon icon={faCheck} />
          </Icon>
          <span>Save</span>
        </Button>

        <Button color="danger" outlined>
          <span>Delete</span>
          <Icon size="small">
            <FontAwesomeIcon icon={faTimes} />
          </Icon>
        </Button>
      </Button.Group>

      <Button.Group>
        {(["small", undefined, "medium", "large"] as ButtonSizes[]).map(
          (size, i) => (
            <Button size={size} key={i}>
              <Icon>
                <FontAwesomeIcon icon={faGithub} />
              </Icon>
              <span>GitHub</span>
            </Button>
          ),
        )}
      </Button.Group>
    </React.Fragment>
  ))
  .add("Button group", () => (
    <Button.Group>
      <Button color="link">Save Changes</Button>
      <Button>Cancel</Button>
      <Button color="danger">Delete post</Button>
    </Button.Group>
  ))
  .add("Button addons", () => (
    <Button.Group hasAddons>
      <Button>
        <Icon size="small">
          <FontAwesomeIcon icon={faAlignLeft} />
        </Icon>
        <span>Left</span>
      </Button>
      <Button>
        <Icon size="small">
          <FontAwesomeIcon icon={faAlignCenter} />
        </Icon>
        <span>Center</span>
      </Button>
      <Button>
        <Icon size="small">
          <FontAwesomeIcon icon={faAlignRight} />
        </Icon>
        <span>Right</span>
      </Button>
    </Button.Group>
  ))
  .add("Button group with addons", () => (
    <React.Fragment>
      <Button.Group hasAddons>
        <Button>
          <Icon size="small">
            <FontAwesomeIcon icon={faBold} />
          </Icon>
          <span>Bold</span>
        </Button>
        <Button>
          <Icon size="small">
            <FontAwesomeIcon icon={faItalic} />
          </Icon>
          <span>Italic</span>
        </Button>
        <Button>
          <Icon size="small">
            <FontAwesomeIcon icon={faUnderline} />
          </Icon>
          <span>Underline</span>
        </Button>
      </Button.Group>

      <Button.Group hasAddons>
        <Button>
          <Icon size="small">
            <FontAwesomeIcon icon={faAlignLeft} />
          </Icon>
          <span>Left</span>
        </Button>
        <Button>
          <Icon size="small">
            <FontAwesomeIcon icon={faAlignCenter} />
          </Icon>
          <span>Center</span>
        </Button>
        <Button>
          <Icon size="small">
            <FontAwesomeIcon icon={faAlignRight} />
          </Icon>
          <span>Right</span>
        </Button>
      </Button.Group>
    </React.Fragment>
  ))
  .add("List of buttons", () => (
    <React.Fragment>
      <Section>
        <Button.Group>
          <Button color="success">Save changes</Button>
          <Button color="info">Save and continue</Button>
          <Button color="danger">Cancel</Button>
        </Button.Group>
      </Section>

      <Section>
        <Button.Group>
          {[
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen",
            "Twenty",
          ].map(name => (
            <Button key={name}>{name}</Button>
          ))}
        </Button.Group>
      </Section>

      <Section>
        {BUTTON_GROUP_POSITIONS.map(position => (
          <Button.Group hasAddons position={position}>
            <Button>Yes</Button>
            <Button>Maybe</Button>
            <Button>No</Button>
          </Button.Group>
        ))}
      </Section>

      <Section>
        <Button.Group hasAddons>
          <Button color="success" selected>
            Yes
          </Button>
          <Button>Maybe</Button>
          <Button>No</Button>
        </Button.Group>

        <Button.Group hasAddons>
          <Button>Yes</Button>
          <Button color="info" selected>
            Maybe
          </Button>
          <Button>No</Button>
        </Button.Group>

        <Button.Group hasAddons>
          <Button>Yes</Button>
          <Button>Maybe</Button>
          <Button color="danger">No</Button>
        </Button.Group>
      </Section>
    </React.Fragment>
  ));
