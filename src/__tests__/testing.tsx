import classNames from "classnames";
import Enzyme from "enzyme";
import PropTypes from "prop-types";
import React from "react";

import { ForwardRefAsExoticComponent } from "src/base/exotic";
import { TransformFunc, transformHelpers } from "../base/helpers";
import { noop } from "../utils";

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

export const testGenericPropTypes = (
  // propTypes: { [k: string]: PropTypes.Requireable<any> },
  component: React.ComponentType<any>,
) => {
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

    validatePropType(component.propTypes!, "as", [
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
  describe("transformHelpers [integration]", () => {
    it("should warn on invalid propType", () => {
      const node = React.createElement(component, { pull: "__UNKNOWN" });
      withMockError({}, ({ context: { error } }) => {
        withShallowInContextConsumer(
          { node, contextValue: { transform: transformHelpers } },
          ({ context: { wrapper } }) => {
            expect(wrapper.props().className).toEqual("is-pulled-__UNKNOWN");
            expect(error.mock.calls).toHaveLength(1);
            expect(error.mock.calls[0][0]).toMatch(
              new RegExp("Warning.+Invalid prop `pull`.+"),
            );
          },
        );
      });
    });
  });
};

export const validatePropType = (
  propTypes: React.WeakValidationMap<any>,
  propName: string,
  options: Array<{
    descriptor?: string;
    error?: RegExp;
    extras?: { [k: string]: any };
    valid: boolean;
    value: any;
  }>,
) =>
  options.map(({ value, valid, error, descriptor, extras }) =>
    it(`should ${
      valid ? "not warn on valid" : "warn on invalid"
    } ${propName} [${descriptor ||
      (value.hasOwnProperty("name") ? value.name : value)}]`, () => {
      withMockError({}, ({ context }) => {
        // if the componentName or locaation isn't randomized, propTypes will
        // (for some reason) fail if the prop is checked (and fails) twice
        PropTypes.checkPropTypes(
          propTypes,
          { [propName]: value, ...extras },
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
  propTypes: {
    [k: string]: PropTypes.Requireable<any> | PropTypes.Validator<any>;
  },
  propName: string,
  extras?: { [k: string]: any },
) =>
  validatePropType(propTypes, propName, [
    ...[false, true].map(value => ({ value, valid: true, extras })),
    { value: "string", valid: false, extras },
  ]);

export const validateNumberPropType = (
  propTypes: {
    [k: string]: PropTypes.Requireable<any> | PropTypes.Validator<any>;
  },
  propName: string,
  extras?: { [k: string]: any },
) =>
  validatePropType(propTypes, propName, [
    { value: 1, valid: true, extras },
    { value: "string", valid: false, extras },
  ]);

export const validateOneOfPropType = (
  propTypes: {
    [k: string]: PropTypes.Requireable<any> | PropTypes.Validator<any>;
  },
  propName: string,
  choices: Array<string | number>,
  extras?: { [k: string]: any },
) =>
  validatePropType(propTypes, propName, [
    ...choices.map(value => ({ value, valid: true, extras })),
    { value: "__UNKNOWN", valid: false, extras },
  ]);

export const validateStringPropType = (
  propTypes: {
    [k: string]: PropTypes.Requireable<any> | PropTypes.Validator<any>;
  },
  propName: string,
  extras?: { [k: string]: any },
) =>
  validatePropType(propTypes, propName, [
    { value: "string", valid: true, extras },
    { value: 1, valid: false, extras },
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

export const withShallowInContextConsumer = contextManager(
  ({
    node,
    contextValue,
  }: {
    node: React.ReactElement<any>;
    contextValue: any;
  }) => {
    const outer = Enzyme.shallow(node);
    const Children = outer.props().children;
    const wrapper = Enzyme.shallow(<Children {...contextValue} />);
    return { context: { wrapper }, state: {} };
  },
  noop,
);

export type MakeNodeFunction<
  TComponent extends ForwardRefAsExoticComponent<TComponentProps, any>,
  TComponentProps extends { className?: string } = React.ComponentProps<
    TComponent
  >
> = (props?: TComponentProps) => JSX.Element;

export type MakeShallowWrapperFunction = (
  node: JSX.Element,
  contextValue?: { transform: TransformFunc<any> },
) => Enzyme.ShallowWrapper<any>;

export const testForwardRefAsExoticComponentIntegration = (
  makeNodeFunc: MakeNodeFunction<any>,
  makeShallowWrapperFunc: MakeShallowWrapperFunction,
  defaultElement: keyof React.ReactHTML,
  bulmaClassName: string | undefined,
) => {
  describe("ForwardRefAsExoticComponent [integration]", () => {
    it("should render as the default element", () => {
      const node = makeNodeFunc({});
      const wrapper = makeShallowWrapperFunc(node);
      expect(wrapper.is(defaultElement)).toBe(true);
    });

    it("should render as a custom component", () => {
      const as = "span";
      const node = makeNodeFunc({ as: "span" });
      const wrapper = makeShallowWrapperFunc(node);
      expect(wrapper.is(as)).toBe(true);
    });

    it("should forward ref", () => {
      const ref = React.createRef<HTMLElement>();
      const node = makeNodeFunc({ ref });
      withEnzymeMount({ node }, ({ context: { wrapper } }) => {
        const selector = bulmaClassName
          ? `${defaultElement}.${bulmaClassName}`
          : defaultElement;
        expect(ref.current).toBe(wrapper.find(selector).instance());
      });
    });

    if (bulmaClassName) {
      it("should have bulma className", () => {
        const node = makeNodeFunc({});
        const wrapper = makeShallowWrapperFunc(node);
        expect(wrapper.hasClass(bulmaClassName)).toBe(true);
      });
    }

    it("should preserve custom className", () => {
      const className = "foo";
      const node = makeNodeFunc({ className });
      const wrapper = makeShallowWrapperFunc(node);
      expect(wrapper.hasClass(className)).toBe(true);
    });

    describe("props", () => {
      describe("as", () => {
        const FC: React.FC<{}> = () => React.createElement("div");

        // tslint:disable-next-line:max-classes-per-file
        class CC extends React.Component {
          public render() {
            return React.createElement("div");
          }
        }

        const FRC = React.forwardRef((props, ref) =>
          React.createElement("div", { ref, ...props }),
        );

        [
          { as: "div", descriptor: "HTMLElement", valid: true },
          { as: FC, descriptor: "function component", valid: true },
          { as: CC, descriptor: "class component", valid: true },
          { as: FRC, descriptor: "forwardRef component", valid: true },
          { as: true, descriptor: "invalid type", valid: false },
        ].map(({ as, descriptor, valid }) => {
          it(`should ${valid ? "" : "not "}allow ${descriptor}`, () => {
            withMockError({}, ({ context: { error } }) => {
              const node = makeNodeFunc({ as });
              const wrapper = makeShallowWrapperFunc(node);
              expect(wrapper.exists()).toBe(true);
              if (valid) {
                expect(error.mock.calls).toHaveLength(0);
              } else {
                expect(error.mock.calls).toHaveLength(2);
                expect(error.mock.calls[0][0]).toMatch(
                  new RegExp("Warning: Failed prop.+`as`.+"),
                );
                expect(error.mock.calls[1][0]).toMatch(
                  new RegExp("Warning: React.createElement: type is invalid"),
                );
              }
            });
          });
        });
      });
    });
  });
};

export const testTransformHelpersIntegration = (
  makeNodeFunc: MakeNodeFunction<any>,
  makeShallowWrapperFunc: MakeShallowWrapperFunction,
) => {
  describe("transformHelpers [integration]", () => {
    it("default", () => {
      withMockError({}, ({ context: { error } }) => {
        const node = makeNodeFunc({ pull: "__UNKNOWN" as any });
        const wrapper = makeShallowWrapperFunc(node);
        expect(wrapper.hasClass("is-pulled-__UNKNOWN")).toBe(true);
        expect(error.mock.calls).toHaveLength(1);
        expect(error.mock.calls[0][0]).toMatch(
          new RegExp("Warning.+Invalid prop `pull`.+"),
        );
      });
    });

    describe("custom", () => {
      interface CustomHelpersProps {
        foo?: "bar" | "baz";
      }

      const customHelpersPropTypes = {
        foo: PropTypes.oneOf(["bar", "baz"]),
      };

      const transform: TransformFunc<CustomHelpersProps> = (
        props,
        componentName,
        location = "prop",
      ) => {
        PropTypes.checkPropTypes(
          customHelpersPropTypes,
          props,
          location,
          componentName,
        );
        const { foo, ...rest } = props;
        const className = classNames(props.className, { [`foo-${foo}`]: foo });
        return Object.assign(rest, className ? { className } : {});
      };

      it("should use custom transform", () => {
        const node = makeNodeFunc({ foo: "bar" });
        const wrapper = makeShallowWrapperFunc(node, { transform });
        expect(wrapper.hasClass("foo-bar")).toBe(true);
      });

      it("should warn on invalid use of custom transform", () => {
        withMockError({}, ({ context }) => {
          const node = makeNodeFunc({ foo: "qux" });
          const wrapper = makeShallowWrapperFunc(node, { transform });
          expect(wrapper.hasClass("foo-qux")).toBe(true);
          expect(context.error.mock.calls).toHaveLength(1);
          expect(context.error.mock.calls[0][0]).toMatch(
            new RegExp("Warning.+Invalid prop `foo`.+"),
          );
        });
      });
    });
  });
};

export const makeNodeFactory = <
  TComponent extends ForwardRefAsExoticComponent<any, any>,
  TComponentProps extends React.ComponentProps<TComponent> & {
    as?: React.ReactType<any>;
  } = React.ComponentProps<TComponent>
>(
  Component: TComponent,
) => (props: TComponentProps) => React.createElement(Component, props);

export const makeShallowWrapper: MakeShallowWrapperFunction = (
  node,
  contextValue = { transform: transformHelpers },
) => {
  const forwardRefWrapper = Enzyme.shallow(node);
  const contextConsumerWrapper = forwardRefWrapper.dive();
  const Children = (contextConsumerWrapper.props() as any).children;
  const wrapper = Enzyme.shallow(<Children {...contextValue} />);
  return wrapper;
};
