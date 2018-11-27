import { storiesOf } from "@storybook/react";
import React from "react";

import { Button } from "@/components/button";
import {
  Checkbox,
  Control,
  Field,
  Help,
  Input,
  InputFile,
  Label,
  Radio,
  Select,
  Textarea,
} from "@/components/form";
import { Icon } from "@/components/icon";

// tslint:disable:max-classes-per-file

interface HoCSelectState {
  value: string;
}

const HoCSelect = (Component: typeof Select) => {
  class Controlled extends React.Component<{}, HoCSelectState> {
    public static displayName = "Select";

    public readonly state: HoCSelectState = {
      value: "",
    };

    public render() {
      return (
        <Component
          onChange={this.onChange}
          value={this.state.value}
          {...this.props}
        />
      );
    }

    private onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
      this.setState({
        value: evt.target.value,
      });
    }
  }

  return Controlled;
};

interface HoCCheckboxState {
  checked: boolean;
}

const HoCCheckbox = (Component: typeof Checkbox) => {
  class Controlled extends React.Component<{}, HoCCheckboxState> {
    public static displayName = "Checkbox";
    public readonly state: HoCCheckboxState = {
      checked: false,
    };

    public onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        checked: evt.target.checked,
      });
    }

    public render() {
      return (
        <Component
          onChange={this.onChange}
          checked={this.state.checked}
          {...this.props}
        />
      );
    }
  }
  return Controlled;
};

interface RadioGroupState {
  selected: string | null;
}

class RadioGroup extends React.Component<{}, RadioGroupState> {
  public state: RadioGroupState = { selected: null };

  public onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      selected: evt.target.value,
    });
  }

  public render() {
    return (
      <Control>
        <Radio
          onChange={this.onChange}
          checked={this.state.selected === "Yes"}
          value="Yes"
          name="question"
        >
          Yes
        </Radio>
        <Radio
          onChange={this.onChange}
          checked={this.state.selected === "No"}
          value="No"
          name="question"
        >
          No
        </Radio>
      </Control>
    );
  }
}

const SelectControlled = HoCSelect(Select);
const CheckboxControlled = HoCCheckbox(Checkbox);

storiesOf("Form", module)
  .addDecorator(story => <div style={{ margin: 50 }}>{story()}</div>)
  .add("Default", () => (
    <div>
      <Field>
        <Label>Name</Label>
        <Control>
          <Input placeholder="Text input" />
        </Control>
      </Field>

      <Field>
        <Label>Username</Label>
        <Control>
          <Input
            color="success"
            type="text"
            placeholder="Text input"
            value="bulma"
          />
        </Control>
        <Help color={"success" as "success"}>This username is available</Help>
      </Field>

      <Field>
        <Label>Email</Label>
        <Control>
          <Input
            color="danger"
            type="email"
            placeholder="Email input"
            value="hello@"
          />
        </Control>
        <Help color={"danger" as "danger"}>This email is invalid</Help>
      </Field>

      <Field>
        <Label>With Icons</Label>
        <Control iconLeft iconRight>
          <Input color="success" type="email" placeholder="I have icons" />
          <Icon align="left" icon="bars" />
          <Icon align="right" icon="bars" />
        </Control>
        <Help color={"danger" as "danger"}>This email is invalid</Help>
      </Field>

      <Field>
        <Label>Subject</Label>
        <Control>
          <SelectControlled>
            <option>Select dropdown</option>
            <option>With options</option>
          </SelectControlled>
        </Control>
      </Field>

      <Field>
        <Label>Message</Label>
        <Control>
          <Textarea placeholder="Textarea" />
        </Control>
      </Field>

      <Field>
        <Label>File</Label>
        <Control>
          <InputFile
            icon={<Icon icon="upload" />}
            boxed
            placeholder="Textarea"
          />
        </Control>
      </Field>

      <Field>
        <Control>
          <CheckboxControlled>
            I agree to the <a href="#agree">terms and conditions</a>
          </CheckboxControlled>
        </Control>
      </Field>

      <Field>
        <RadioGroup />
      </Field>

      <Field kind={"group" as "group"}>
        <Control>
          <Button type="primary">Submit</Button>
        </Control>
        <Control>
          <Button color={"link" as "link"}>Cancel</Button>
        </Control>
      </Field>
    </div>
  ))
  .add("Handle Multiple inputs", () => {
    interface MultiInputHandlerState {
      comment: string;
      email: string;
      gender: string;
      name: string;
      password: string;
      question: string | null;
      termsAccepted: boolean;
    }

    class MultiInputHandler extends React.PureComponent<
      {},
      MultiInputHandlerState
    > {
      public readonly state: MultiInputHandlerState = {
        comment: "",
        email: "",
        gender: "",
        name: "",
        password: "",
        question: null,
        termsAccepted: false,
      };

      public render() {
        const {
          comment,
          email,
          gender,
          name,
          password,
          question,
          termsAccepted,
        } = this.state;
        return (
          <div>
            <Field>
              <Label>Email</Label>
              <Control>
                <Input
                  onChange={this.setEmail}
                  name="email"
                  type="email"
                  placeholder="Email input"
                  value={email}
                />
              </Control>
            </Field>

            <Field>
              <Label>Name</Label>
              <Control>
                <Input
                  onChange={this.setName}
                  name="name"
                  type="text"
                  placeholder="Name input"
                  value={name}
                />
              </Control>
            </Field>

            <Field>
              <Label>Password</Label>
              <Control>
                <Input
                  onChange={this.setPassword}
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                />
              </Control>
            </Field>

            <Field>
              <Label>Gender</Label>
              <Control>
                <Select onChange={this.setGender} name="gender" value={gender}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other?</option>
                </Select>
              </Control>
            </Field>

            <Field>
              <Label>Comment</Label>
              <Control>
                <Textarea
                  name="comment"
                  value={comment}
                  onChange={this.setComment}
                  placeholder="Textarea"
                />
              </Control>
            </Field>

            <Field>
              <Label>Do you undertood how to use me?</Label>
              <Control>
                <Radio
                  onChange={this.setQuestion}
                  checked={question === "Yes"}
                  value="Yes"
                  name="question"
                >
                  Yes
                </Radio>
                <Radio
                  onChange={this.setQuestion}
                  checked={question === "No"}
                  value="No"
                  name="question"
                >
                  No
                </Radio>
              </Control>
            </Field>

            <Field>
              <Control>
                <Checkbox
                  name="termsAccepted"
                  onChange={this.setTermsAccepted}
                  checked={termsAccepted}
                >
                  I agree to the <a href="#agree">terms and conditions</a>
                </Checkbox>
              </Control>
            </Field>

            <pre>
              <code>{JSON.stringify(this.state, null, 2)}</code>
            </pre>
          </div>
        );
      }

      private setComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ comment: event.target.value });
      }

      private setEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: event.target.value });
      }

      private setGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ gender: event.target.value });
      }

      private setName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: event.target.value });
      }

      private setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: event.target.value });
      }

      private setQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ question: event.target.value });
      }

      private setTermsAccepted = (
        event: React.ChangeEvent<HTMLInputElement>,
      ) => {
        this.setState({ termsAccepted: event.target.checked });
      }
    }
    return <MultiInputHandler />;
  });
