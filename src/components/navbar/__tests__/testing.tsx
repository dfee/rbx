import Enzyme from "enzyme";
import React from "react";

import {
  initialValue as themeInitialValue,
  ThemeContext,
} from "src/base/theme";
import {
  NavbarContext,
  NavbarContextValue,
  initialValue as navbarInitialValue,
} from "src/components/navbar/navbar-context";
import {
  NavbarItemContext,
  NavbarItemContextValue,
  initialValue as navbarItemInitialValue,
} from "src/components/navbar/navbar-item-context";

import {
  GetInnerReactWrapperFunction,
  GetInnerShallowWrapperFunction,
  MakeReactWrapperFunction,
  MakeShallowWrapperFunction,
} from "src/__tests__/testing";

export const getInnerShallowWrapperInNavbarContext: GetInnerShallowWrapperFunction = wrapper =>
  wrapper // ContextProvider
    .dive() // Component
    .dive() // Generic
    .dive(); // Leaf ("as")

export const makeShallowWrapperInNavbarContextFactory = (
  // todo: rename getInnerWrapper => getInnerShallowWrapper
  getInnerWrapper: GetInnerShallowWrapperFunction = getInnerShallowWrapperInNavbarContext,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
): MakeShallowWrapperFunction => ({
  node,
  contextValue = themeInitialValue,
}) => {
  const wrapper = Enzyme.shallow(
    <ThemeContext.Provider value={contextValue}>
      <NavbarContext.Provider value={navbarContextValue}>
        {node}
      </NavbarContext.Provider>
    </ThemeContext.Provider>,
  );
  return getInnerWrapper(wrapper);
};

export const getInnerReactWrapperInNavbarContext: GetInnerReactWrapperFunction = wrapper =>
  wrapper // Component
    .children() // Generic
    .children(); // Leaf ("as")

export const makeReactWrapperInNavbarContextFactory = (
  // todo: rename getInnerWrapper => getInnerReactWrapper
  getInnerWrapper: GetInnerReactWrapperFunction = getInnerReactWrapperInNavbarContext,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
): MakeReactWrapperFunction => ({ node, contextValue = themeInitialValue }) =>
  getInnerWrapper(
    Enzyme.mount(
      <ThemeContext.Provider value={contextValue}>
        <NavbarContext.Provider value={navbarContextValue}>
          {node}
        </NavbarContext.Provider>
      </ThemeContext.Provider>,
    ),
  );

export const getInnerShallowWrapperInNavbarItemContext: GetInnerShallowWrapperFunction = wrapper =>
  wrapper // Navbar ContextProvider
    .dive() // NavbarItem ContextProvider
    .dive() // Component
    .dive() // Generic
    .dive(); // Leaf ("as")

export const makeShallowWrapperInNavbarItemContextFactory = (
  // todo: rename getInnerWrapper => getInnerShallowWrapper
  getInnerWrapper: GetInnerShallowWrapperFunction = getInnerShallowWrapperInNavbarItemContext,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
  navbarItemContextValue: NavbarItemContextValue = navbarItemInitialValue,
): MakeShallowWrapperFunction => ({
  node,
  contextValue = themeInitialValue,
}) => {
  const wrapper = Enzyme.shallow(
    <ThemeContext.Provider value={contextValue}>
      <NavbarContext.Provider value={navbarContextValue}>
        <NavbarItemContext.Provider value={navbarItemContextValue}>
          {node}
        </NavbarItemContext.Provider>
      </NavbarContext.Provider>
    </ThemeContext.Provider>,
  );
  return getInnerWrapper(wrapper);
};

export const getInnerReactWrapperInNavbarItemContext: GetInnerReactWrapperFunction = wrapper =>
  wrapper // Component
    .children() // Generic
    .children(); // Leaf ("as")

export const makeReactWrapperInNavbarItemContextFactory = (
  // todo: rename getInnerWrapper => getInnerReactWrapper
  getInnerWrapper: GetInnerReactWrapperFunction = getInnerReactWrapperInNavbarItemContext,
  navbarContextValue: NavbarContextValue = navbarInitialValue,
  navbarItemContextValue: NavbarItemContextValue = navbarItemInitialValue,
): MakeReactWrapperFunction => ({ node, contextValue = themeInitialValue }) =>
  getInnerWrapper(
    Enzyme.mount(
      <ThemeContext.Provider value={contextValue}>
        <NavbarContext.Provider value={navbarContextValue}>
          <NavbarItemContext.Provider value={navbarItemContextValue}>
            {node}
          </NavbarItemContext.Provider>
        </NavbarContext.Provider>
      </ThemeContext.Provider>,
    ),
  );
