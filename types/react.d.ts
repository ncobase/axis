/// <reference types="react" />

/**
 * Type definitions for React related functionality
 */

/**
 * Type for component properties/props
 * Extracts prop types P from a React component type T
 */
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

/**
 * Type definition for CSS style properties object
 * Represents valid CSS properties that can be used in React style objects
 */
export type CSSProperties = React.CSSProperties;

/**
 * Generic event handler type
 * Handles synthetic React events and returns void
 */
// eslint-disable-next-line no-unused-vars
export type EventHandler<E extends React.SyntheticEvent> = (event: E) => void;

/**
 * Mouse event handler type
 * Specifically handles React mouse events and returns void
 */
// eslint-disable-next-line no-unused-vars
export type MouseEventHandler<E extends React.MouseEvent> = (event: E) => void;
