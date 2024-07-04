import { createContext, ReactNode, useContext } from 'react';

interface ShellContextValue {
  /** <Header /> component */
  header?: ReactNode;
  /** <Sidebar /> component */
  sidebar?: ReactNode;
  /** <Topbar /> component */
  topbar?: ReactNode;
  /** <Submenu /> component */
  submenu?: ReactNode;
  /** Sidebar expanded state */
  sidebarExpanded?: boolean;
}

const defaultValue: ShellContextValue = {};

export const ShellContext = createContext<ShellContextValue>(defaultValue);

export const useShellContext = () => useContext(ShellContext);
