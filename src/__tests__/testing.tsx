import Enzyme from "enzyme";
import PropTypes from "prop-types";
import React from "react";

export const hasProperties = (
  component: React.ReactType<any>,
  obj: { [s: string]: any },
) =>
  Object.keys(obj).map(key =>
    it(`should have property ${key}`, () => {
      expect(component[key]).toEqual(obj[key]);
    }),
  );

export const makeContextFactory = <P extends {}>(initial: P) => (
  overrides?: Partial<P>,
) =>
  Object.keys(initial)
    .map(key => ({
      [key]: overrides ? overrides[key] || initial[key] : initial[key],
    }))
    .reduce((acc, cv) => ({ ...acc, ...cv }), {}) as P;

export const shallowInContext = <P, T>(
  Component: React.ComponentType<P>,
  context: T,
  props: P,
) => {
  const outer = Enzyme.shallow(<Component {...props} />);
  const Children = outer.props().children;
  return Enzyme.shallow(<Children {...context} />);
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
      withMockError({}, ({ context }) => {
        // if the componentName or locaation isn't randomized, propTypes will
        // (for some reason) fail if the prop is checked (and fails) twice
        PropTypes.checkPropTypes(
          propTypes,
          { [propName]: value },
          "prop", // location
          `test(${makeRandomString()})`, // componentName
        );
        if (valid) {
          expect(context.error.mock.calls).toHaveLength(0);
        } else {
          expect(context.error.mock.calls).toHaveLength(1);
          expect(context.error.mock.calls[0][0]).toMatch(
            error || new RegExp(`Warning.+Invalid prop \`${propName}\`.+`),
          );
        }
      });
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

export const contextManager = <
  TContext extends object,
  TParams extends object,
  TState extends object
>(
  enter: (params: TParams) => { context: TContext; state: TState },
  exit: (
    {
      context,
      params,
      state,
    }: { context: TContext; params: TParams; state: TState },
  ) => void,
) => (
  params: TParams,
  inner: ({ context, params }: { context: TContext; params: TParams }) => void,
) => {
  const { context, state } = enter(params);
  try {
    inner({ context, params });
  } finally {
    exit({ context, params, state });
  }
};

export const withMockError = contextManager(
  () => {
    const context = { error: jest.fn() };
    const state = { initError: global.console.error };
    global.console.error = context.error;
    return { context, state };
  },
  ({ state }) => {
    global.console.error = state.initError;
  },
);

export const withEnzymeMount = contextManager(
  ({ node }: { node: React.ReactElement<any> }) => {
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    // So, mount in div
    const outer = Enzyme.mount(<div children={node} />);
    return { context: { wrapper: outer.children() }, state: { outer } };
  },
  ({ state }) => state.outer.unmount(),
);
