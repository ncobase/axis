import React, { createContext, useContext } from 'react';

interface LayoutContextValue {
  isFocusMode: boolean;
  setIsFocusMode: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  navIsOpen: boolean;
  navOnOpen: () => void;
  navOnClose: () => void;
}

const defaultValue: LayoutContextValue = {
  isFocusMode: false,
  setIsFocusMode: undefined,
  navIsOpen: false,
  navOnOpen: () => {},
  navOnClose: () => {}
};

export const LayoutContext = createContext<LayoutContextValue>(defaultValue);

export const useLayoutContext = () => useContext(LayoutContext);
