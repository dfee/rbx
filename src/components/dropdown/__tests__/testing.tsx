import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContextValue,
  ThemeContext,
} from "src/base/theme";
import {
  DropdownContext,
  DropdownContextValue,
  initialValue as dropdownInitialValue,
} from "src/components/dropdown/dropdown-context";
import {
  GetInnerReactWrapperFunction,
  GetInnerShallowWrapperFunction,
  MakeReactWrapperFunction,
  MakeShallowWrapperFunction,
} from "src/__tests__/testing";

export type DefaultShallowWrapperOptions = {
  node: JSX.Element;
  contextValue?: ThemeContextValue;
};

export const getInnerShallowWrapper: GetInnerShallowWrapperFunction = wrapper =>
  wrapper // ContextProvider
    .dive() // Component
    .dive() // Generic
    .dive(); // Leaf ("as")

export const makeShallowWrapperFactory = (
  // todo: rename getInnerWrapper => getInnerShallowWrapper
  getInnerWrapper: GetInnerShallowWrapperFunction = getInnerShallowWrapper,
  dropdownContextValue: DropdownContextValue = dropdownInitialValue,
): MakeShallowWrapperFunction => ({
  node,
  contextValue = themeInitialValue,
}) => {
  const wrapper = Enzyme.shallow(
    <ThemeContext.Provider value={contextValue}>
      <DropdownContext.Provider value={dropdownContextValue}>
        {node}
      </DropdownContext.Provider>
    </ThemeContext.Provider>,
  );
  return getInnerWrapper(wrapper);
};

export const getInnerReactWrapper: GetInnerReactWrapperFunction = wrapper =>
  wrapper // Component
    .children() // Generic
    .children(); // Leaf ("as")

export const makeReactWrapperFactory = (
  // todo: rename getInnerWrapper => getInnerReactWrapper
  getInnerWrapper: GetInnerReactWrapperFunction = getInnerReactWrapper,
  dropdownContextValue: DropdownContextValue = dropdownInitialValue,
): MakeReactWrapperFunction => ({ node, contextValue = themeInitialValue }) =>
  getInnerWrapper(
    Enzyme.mount(
      <ThemeContext.Provider value={contextValue}>
        <DropdownContext.Provider value={dropdownContextValue}>
          {node}
        </DropdownContext.Provider>
      </ThemeContext.Provider>,
    ),
  );
