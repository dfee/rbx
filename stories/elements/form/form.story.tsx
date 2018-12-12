import {
  faCheck,
  faEnvelope,
  faExclamationTriangle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storiesOf } from "@storybook/react";
import React from "react";

import {
  Button,
  Checkbox,
  Control,
  Field,
  Help,
  Icon,
  Input,
  Label,
  Radio,
  Select,
  Textarea,
} from "@/elements";
import { Columns } from "@/grid";

storiesOf("Elements/Form", module)
  .addDecorator(story => <div style={{ margin: 50 }}>{story()}</div>)
  .add("Horizontal form", () => {
    return (
      <Columns>
        <Columns.Column tablet={{ size: "full" }} widescreen={{ size: "half" }}>
          <form>
            <Field horizontal>
              <Field.Label size="normal">
                <Label>From</Label>
              </Field.Label>
              <Field.Body>
                <Field>
                  <Control expanded iconLeft>
                    <Input type="text" placeholder="Name" />
                    <Icon size="small" align="left">
                      <FontAwesomeIcon icon={faUser} />
                    </Icon>
                  </Control>
                </Field>
                <Field>
                  <Control expanded iconLeft iconRight>
                    <Input
                      color="success"
                      type="email"
                      placeholder="Email"
                      value="alex@smith.com"
                    />
                    <Icon size="small" align="left">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </Icon>
                    <Icon size="small" align="right">
                      <FontAwesomeIcon icon={faCheck} />
                    </Icon>
                  </Control>
                </Field>
              </Field.Body>
            </Field>

            <Field horizontal>
              <Field.Label />
              <Field.Body>
                <Field expanded>
                  <Field kind="addons">
                    <Control>
                      <Button static>+44</Button>
                    </Control>
                    <Control expanded>
                      <Input type="tel" placeholder="Your phone number" />
                    </Control>
                  </Field>
                  <Help>Do not enter the first zero</Help>
                </Field>
              </Field.Body>
            </Field>

            <Field horizontal>
              <Field.Label size="normal">
                <Label>Department</Label>
              </Field.Label>
              <Field.Body>
                <Field narrow>
                  <Control>
                    <Select.Container fullwidth>
                      <Select>
                        <Select.Option>Business development</Select.Option>
                        <Select.Option>Marketing</Select.Option>
                        <Select.Option>Sales</Select.Option>
                      </Select>
                    </Select.Container>
                  </Control>
                </Field>
              </Field.Body>
            </Field>

            <Field horizontal>
              <Field.Label>
                <Label>Already a member?</Label>
              </Field.Label>
              <Field.Body>
                <Field narrow>
                  <Control>
                    {["Yes", "No"].map(value => (
                      <Label>
                        <Radio name="member" value={value} /> {value}
                      </Label>
                    ))}
                  </Control>
                </Field>
              </Field.Body>
            </Field>

            <Field horizontal>
              <Field.Label size="normal">
                <Label>Subject</Label>
              </Field.Label>
              <Field.Body>
                <Field>
                  <Control>
                    <Input
                      color="danger"
                      type="text"
                      placeholder="e.g. Partnership opportunity"
                    />
                  </Control>
                  <Help color="danger">This field is required</Help>
                </Field>
              </Field.Body>
            </Field>

            <Field horizontal>
              <Field.Label size="normal">
                <Label>Question</Label>
              </Field.Label>
              <Field.Body>
                <Field>
                  <Control>
                    <Textarea placeholder="Explain how we can help you" />
                  </Control>
                </Field>
              </Field.Body>
            </Field>

            <Field horizontal>
              <Field.Label /> {/* Left empty for spacing  */}
              <Field.Body>
                <Field>
                  <Control>
                    <Button color="primary">Send message</Button>
                  </Control>
                </Field>
              </Field.Body>
            </Field>
          </form>
        </Columns.Column>
      </Columns>
    );
  })
  .add("Vertical form", () => {
    return (
      <Columns>
        <Columns.Column
          mobile={{ size: "full" }}
          tablet={{ size: "half" }}
          desktop={{ size: "one-third" }}
          fullhd={{ size: "one-quarter" }}
          widescreen={{ size: "one-fifth" }}
        >
          <form>
            <Field>
              <Label>Name</Label>
              <Control>
                <Input type="text" placeholder="Text input" />
              </Control>
            </Field>

            <Field>
              <Label>Username</Label>
              <Control iconLeft iconRight>
                <Input
                  color="success"
                  type="text"
                  placeholder="Text input"
                  value="bulma"
                />
                <Icon size="small" align="left">
                  <FontAwesomeIcon icon={faUser} />
                </Icon>
                <Icon size="small" align="right">
                  <FontAwesomeIcon icon={faCheck} />
                </Icon>
              </Control>
              <Help color="success">This username is available</Help>
            </Field>

            <Field>
              <Label>Email</Label>
              <Control iconLeft iconRight>
                <Input
                  color="danger"
                  type="email"
                  placeholder="Email input"
                  value="hello@"
                />
                <Icon size="small" align="left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </Icon>
                <Icon size="small" align="right">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                </Icon>
              </Control>
              <Help color="danger">This email is invalid</Help>
            </Field>

            <Field>
              <Label>Subject</Label>
              <Control>
                <Select.Container>
                  <Select>
                    <Select.Option>Select dropdown</Select.Option>
                    <Select.Option>With Select.Options</Select.Option>
                  </Select>
                </Select.Container>
              </Control>
            </Field>

            <Field>
              <Label>Message</Label>
              <Control>
                <Textarea placeholder="Textarea" />
              </Control>
            </Field>

            <Field>
              <Control>
                <Label>
                  <Checkbox /> I agree to the{" "}
                  <a href="#">terms and conditions</a>
                </Label>
              </Control>
            </Field>

            <Field>
              <Control>
                {["Yes", "No"].map(value => (
                  <Label>
                    <Radio name="question" value={value} /> {value}
                  </Label>
                ))}
              </Control>
            </Field>

            <Field kind="group">
              <Control>
                <Button color="link">Submit</Button>
              </Control>
              <Control>
                <Button text>Cancel</Button>
              </Control>
            </Field>
          </form>
        </Columns.Column>
      </Columns>
    );
  });
