import { randomBytes } from "crypto";

import classNames from "classnames";
import * as Enzyme from "enzyme";
import * as PropTypes from "prop-types";
import * as React from "react";

import { HelpersProps } from "src/base/helpers";
import { ValidatingTransformFunction } from "src/base/helpers/factory";
import {
  initialValue as themeInitialValue,
  ThemeContextValue,
  ThemeContext,
} from "src/base/theme";

export const contextManager = <
  TContext extends object,
  TParams extends object,
  TState extends object
>(
  enter: (params: TParams) => { context: TContext; state: TState },
  exit: ({
    context,
    params,
    state,
  }: {
    context: TContext;
    params: TParams;
    state: TState;
  }) => void,
) => (
  params: TParams,
  inner: ({
    context,
    params,
    state,
  }: {
    context: TContext;
    params: TParams;
    state: TState;
  }) => void,
) => {
  const { context, state } = enter(params);
  try {
    inner({ context, params, state });
  } finally {
    exit({ context, params, state });
  }
};

export const withWindow = contextManager(
  /* eslint-disable @typescript-eslint/no-explicit-any */
  ({ value }: { value?: undefined } = {}) => {
    const { window } = global as any;

    if (value !== undefined) {
      (global as any).window = value;
    }

    return { context: {}, state: { window } };
  },
  ({ state: { window } }) => {
    (global as any).window = window;
  },
  /* eslint-enable @typescript-eslint/no-explicit-any */
);

export const withMockError = contextManager(
  () => ({
    context: {
      error: jest
        .spyOn(global.console, "error")
        .mockImplementation(() => undefined),
    },
    state: {},
  }),
  ({ context: { error } }) => {
    error.mockClear();
  },
);

export const withEnzymeMount = contextManager(
  ({
    node,
    options,
    makeWrappingNode,
  }: {
    node: JSX.Element;
    options?: Enzyme.MountRendererProps;
    makeWrappingNode?(node: JSX.Element): JSX.Element;
  }) => {
    // Enzyme owns outer ref: https://github.com/airbnb/enzyme/issues/1852
    // So, mount in div
    const wrappingNode =
      makeWrappingNode !== undefined ? (
        makeWrappingNode(node)
      ) : (
        <div>{node}</div>
      );
    const outer = Enzyme.mount(wrappingNode, options);

    return { context: { wrapper: outer.children() }, state: { outer } };
  },
  ({ state: { outer } }) => outer.unmount(),
);

export const hasProperties = <T extends object>(
  component: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: { [s: string]: any },
) => {
  describe("properties", () => {
    Object.keys(obj).forEach(key => {
      it(`should have property ${key}`, () => {
        expect(component[key]).toEqual(obj[key]);
      });
    });
  });
};

export const makeRandomString = (length: number = 8) =>
  randomBytes(length).toString("hex");

export const validatePropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string | number,
  options: {
    descriptor?: string;
    error?: RegExp;
    extras?: Partial<T>;
    valid: boolean;
    value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }[],
) =>
  options.forEach(({ value, valid, error, descriptor, extras }) => {
    let descriptorString: string;
    if (descriptor !== undefined) {
      descriptorString = descriptor;
    } else if (value === undefined) {
      descriptorString = "undefined";
    } else {
      descriptorString = String(value);
    }
    it(`should ${
      valid ? "not warn on valid" : "warn on invalid"
    } ${propName} [${descriptorString}]`, () => {
      withMockError({}, ({ context }) => {
        // if the componentName or locaation isn't randomized, propTypes will
        // (for some reason) fail if the prop is checked (and fails) twice
        PropTypes.checkPropTypes(
          propTypes,
          { [propName]: value, ...extras },
          "prop", // location
          makeRandomString(), // componentName
        );
        if (valid) {
          expect(context.error.mock.calls).toHaveLength(0);
        } else {
          expect(context.error.mock.calls).toHaveLength(1);
          expect(context.error.mock.calls[0][0]).toMatch(
            error !== undefined
              ? error
              : new RegExp(`Warning.+Invalid prop.+\`${propName}\`.+`),
          );
        }
      });
    });
  });

export const validateBoolPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    ...[false, true].map(value => ({ extras, valid: true, value })),
    { extras, valid: false, value: "string" },
  ]);

export const validateNumberPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    { extras, valid: true, value: 1 },
    { extras, valid: false, value: "string" },
  ]);

export const validateOneOfPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  choices: Readonly<(string | number)[]>,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    ...choices.map(value => ({ extras, valid: true, value })),
    { extras, valid: false, value: "__UNKNOWN" },
  ]);

export const validateRefPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    { descriptor: "func", extras, valid: true, value: () => undefined },
    { descriptor: "ref", extras, valid: true, value: React.createRef() },
    { extras, valid: false, value: "string" }, // deprecated, won't support
  ]);

export const validateStringPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    { extras, valid: true, value: "string" },
    { extras, valid: false, value: 1 },
  ]);

export const validateStringOrNumberPropType = <T extends {}>(
  propTypes: React.WeakValidationMap<T>,
  propName: string,
  extras?: Partial<T>,
) =>
  validatePropType(propTypes, propName, [
    { extras, valid: true, value: "string" },
    { extras, valid: true, value: 1 },
    { descriptor: "obj", extras, valid: false, value: {} },
  ]);

export const makeNodeFactory = <P extends {}>(
  Component: React.ComponentType<P>,
) => (props: P) => React.createElement(Component, props);

export type MakeShallowWrapperFunction = (options: {
  node: JSX.Element;
  contextValue?: ThemeContextValue;
}) => Enzyme.ShallowWrapper<React.ReactType>;

export type GetInnerShallowWrapperFunction = (
  wrapper: Enzyme.ShallowWrapper,
) => Enzyme.ShallowWrapper<React.ReactType>;

export const makeShallowWrapperFactory = (
  getInnerWrapper: GetInnerShallowWrapperFunction = wrapper =>
    wrapper // Component
      .dive() // Generic
      .dive(), // Leaf ("as")
): MakeShallowWrapperFunction => ({
  node,
  contextValue = themeInitialValue,
}) => {
  const wrapper = Enzyme.shallow(
    <ThemeContext.Provider value={contextValue}>{node}</ThemeContext.Provider>,
  );
  return getInnerWrapper(wrapper);
};

export type MakeReactWrapperFunction = (options: {
  node: JSX.Element;
  contextValue?: ThemeContextValue;
}) => Enzyme.ReactWrapper<React.ReactType>;

export type GetInnerReactWrapperFunction = (
  wrapper: Enzyme.ReactWrapper<React.ReactType>,
) => Enzyme.ReactWrapper<React.ReactType>;

export const makeReactWrapperFactory = (
  getInnerWrapper: GetInnerReactWrapperFunction = wrapper =>
    wrapper // Component
      .children() // Generic
      .children(), // Leaf ("as")
): MakeReactWrapperFunction => ({ node, contextValue = themeInitialValue }) =>
  getInnerWrapper(
    Enzyme.mount(
      <ThemeContext.Provider value={contextValue}>
        {node}
      </ThemeContext.Provider>,
    ),
  );

export const testForwardRefAsExoticComponentIntegration = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>,
  options: {
    bulmaClassName?: string;
    defaultElement: keyof React.ReactHTML;
    displayName: string;
    makeShallowWrapper?: MakeShallowWrapperFunction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makeNode?(props: any): JSX.Element;
    makeWrappingNode?(node: React.ReactNode): JSX.Element;
  },
) => {
  const {
    bulmaClassName,
    defaultElement,
    displayName,
    makeNode,
    makeShallowWrapper,
    makeWrappingNode,
  } = {
    makeNode: makeNodeFactory(Component),
    makeShallowWrapper: makeShallowWrapperFactory(),
    ...options,
  };

  describe("ForwardRefAsExoticComponent [integration]", () => {
    it(`should have displayName: ${displayName}`, () => {
      expect(Component.displayName).toEqual(displayName);
    });

    it("should render as the default element", () => {
      const node = makeNode({});
      const wrapper = makeShallowWrapper({ node });
      expect(wrapper.is(defaultElement)).toBe(true);
    });

    it("should render as a custom component", () => {
      const asType = "span" as React.ReactType;
      const node = makeNode({ as: asType });
      const wrapper = makeShallowWrapper({ node });
      expect(wrapper.is(asType)).toBe(true);
    });

    it("should forward ref", () => {
      const ref = React.createRef<HTMLElement>();
      const node = makeNode({ ref });
      withEnzymeMount(
        { makeWrappingNode, node },
        ({ context: { wrapper } }) => {
          const selector =
            bulmaClassName !== undefined
              ? `${defaultElement}.${bulmaClassName}`
              : defaultElement;
          expect(ref.current).toBe(wrapper.find(selector).instance());
        },
      );
    });

    if (bulmaClassName !== undefined) {
      it("should have bulma className", () => {
        const node = makeNode({});
        const wrapper = makeShallowWrapper({ node });
        expect(wrapper.hasClass(bulmaClassName)).toBe(true);
      });
    }

    it("should preserve custom className", () => {
      const className = "foo";
      const node = makeNode({ className });
      const wrapper = makeShallowWrapper({ node });
      expect(wrapper.hasClass(className)).toBe(true);
    });

    describe("props", () => {
      describe("as", () => {
        const FC: React.FC = () => React.createElement("div");
        /** test class */
        // eslint-disable-next-line react/prefer-stateless-function
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
        ].forEach(({ as, descriptor, valid }) => {
          it(`should ${valid ? "" : "not "}allow ${descriptor}`, () => {
            withMockError({}, ({ context: { error } }) => {
              const node = makeNode({ as });
              const wrapper = makeShallowWrapper({ node });
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

export const testThemeIntegration = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>,
  options?: {
    makeReactWrapper?: MakeReactWrapperFunction;
    makeShallowWrapper?: MakeShallowWrapperFunction;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makeNode?(props: any): JSX.Element;
  },
) => {
  const { makeNode, makeReactWrapper, makeShallowWrapper } = {
    makeNode: makeNodeFactory(Component),
    makeReactWrapper: makeReactWrapperFactory(),
    makeShallowWrapper: makeShallowWrapperFactory(),
    ...options,
  };

  describe("theme [integration]", () => {
    it("default transform", () => {
      withMockError({}, ({ context: { error } }) => {
        const node = makeNode({
          pull: "__UNKNOWN" as HelpersProps["pull"],
        });
        const wrapper = makeShallowWrapper({ node });
        expect(wrapper.hasClass("is-pulled-__UNKNOWN")).toBe(true);
        expect(error.mock.calls).toHaveLength(1);
        expect(error.mock.calls[0][0]).toMatch(
          new RegExp("Warning.+Invalid prop `pull`.+"),
        );
      });
    });

    describe("custom transform", () => {
      interface CustomHelpersProps {
        foo?: "bar" | "baz";
      }

      const customHelpersPropTypes = {
        foo: PropTypes.oneOf(["bar", "baz"]),
      };

      const transform: ValidatingTransformFunction<CustomHelpersProps, {}> = (
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
        const { className, foo, ...rest } = props;

        return {
          className: classNames({ [`foo-${foo}`]: foo }, className),
          ...rest,
        };
      };

      it("should transform prop", () => {
        const node = makeNode({ foo: "bar" });
        const wrapper = makeReactWrapper({ contextValue: { transform }, node });
        expect(wrapper.hasClass("foo-bar")).toBe(true);
      });

      it("should warn on invalid prop transform", () => {
        withMockError({}, ({ context }) => {
          const node = makeNode({ foo: "qux" });
          const wrapper = makeReactWrapper({
            contextValue: { transform },
            node,
          });
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
