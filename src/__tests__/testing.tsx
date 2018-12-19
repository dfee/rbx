import { shallow } from "enzyme";
import PropTypes from "prop-types";
import React from "react";

export const hasProperties = (
  component: React.ReactType<any>,
  obj: { [s: string]: any },
) =>
  Object.entries(obj).map(([name, value]) =>
    it(`should have property ${name}`, () => {
      expect(component[name]).toEqual(value);
    }),
  );

export const makeContextFactory = <P extends {}>(initial: P) => (
  overrides?: Partial<P>,
) =>
  Object.entries(initial)
    .map(([key, value]) => ({
      [key]: overrides ? overrides[key] || value : value,
    }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {}) as P;

export const shallowInContext = <P, T>(
  Component: React.ComponentType<P>,
  context: T,
  props: P,
) => {
  const outer = shallow(<Component {...props} />);
  const Children = outer.props().children;
  return shallow(<Children {...context} />);
};

export const makeRandomString = () =>
  Math.random()
    .toString(36)
    .substring(7);

export const testGenericPropTypes = (propTypes: {
  [k: string]: PropTypes.Requireable<any>;
}) => {
  /**
   * we want to make sure that exotic propTypes are checked (i.e. as)
   */
  describe("exotic [integration]", () => {
    // tslint:disable-next-line:max-classes-per-file
    class ClassComponent extends React.Component {
      public render() {
        return React.createElement("div");
      }
    }

    const ForwardRefComponent = React.forwardRef((props, ref) =>
      React.createElement("div", { ref, ...props }),
    );

    const FunctionComponent = () => React.createElement("div");

    validatePropType(propTypes, "as", [
      { value: "div", valid: true },
      { value: ClassComponent, valid: true },
      { value: ForwardRefComponent, valid: true, descriptor: "ForwardRefAs" },
      { value: FunctionComponent, valid: true },
      { value: true, valid: false },
    ]);
  });

  /**
   * we want to make sure that helpersPropTypes are checked
   */
  describe("helpers [integration]", () => {
    validateBoolPropType(propTypes, "clipped");
    validatePropType(propTypes, "className", [
      { value: "string", valid: true },
      { value: true, valid: false },
    ]);
  });
};

export const validatePropType = (
  propTypes: { [k: string]: PropTypes.Requireable<any> },
  propName: string,
  options: Array<{
    descriptor?: string;
    error?: RegExp;
    valid: boolean;
    value: any;
  }>,
) =>
  options.map(({ value, valid, error, descriptor }) =>
    it(`should ${
      valid ? "not warn on valid" : "warn on invalid"
    } ${propName} [${descriptor ||
      (value.hasOwnProperty("name") ? value.name : value)}]`, () => {
      const errorMock = jest.fn();
      const initError = global.console.error;
      global.console.error = errorMock;
      try {
        // if the componentName isn't randomized, propTypes will
        // (for some reason) fail if the test is run twice
        PropTypes.checkPropTypes(
          propTypes,
          { [propName]: value },
          "prop", // location
          `componentName:${makeRandomString()}`, // componentName
        );
        if (valid) {
          expect(errorMock.mock.calls).toHaveLength(0);
        } else {
          expect(errorMock.mock.calls).toHaveLength(1);
          expect(errorMock.mock.calls[0][0]).toMatch(
            error || new RegExp(`Warning.+Invalid prop \`${propName}\`.+`),
          );
        }
      } finally {
        global.console.error = initError;
      }
    }),
  );

export const validateBoolPropType = (
  propTypes: { [k: string]: PropTypes.Requireable<any> },
  propName: string,
) =>
  validatePropType(propTypes, propName, [
    ...[false, true].map(value => ({ value, valid: true })),
    { value: "string", valid: false },
  ]);

export const validateNumberPropType = (
  propTypes: { [k: string]: PropTypes.Requireable<any> },
  propName: string,
) =>
  validatePropType(propTypes, propName, [
    { value: 1, valid: true },
    { value: "string", valid: false },
  ]);

export const validateOneOfPropType = (
  propTypes: { [k: string]: PropTypes.Requireable<any> },
  propName: string,
  choices: Array<string | number>,
) =>
  validatePropType(propTypes, propName, [
    ...choices.map(value => ({ value, valid: true })),
    { value: "__UNKNOWN", valid: false },
  ]);

export const validateStringPropType = (
  propTypes: { [k: string]: PropTypes.Requireable<any> },
  propName: string,
) =>
  validatePropType(propTypes, propName, [
    { value: "string", valid: true },
    { value: 1, valid: false },
  ]);
