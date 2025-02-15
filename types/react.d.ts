/// <reference types="react" />

/**
 * React 相关类型定义
 */

/**
 * 组件属性类型
 */
export type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

/**
 * 样式对象类型
 */
export type CSSProperties = React.CSSProperties;

/**
 * 事件处理器类型
 */
export type EventHandler<E extends React.SyntheticEvent> = (event: E) => void;

/**
 * 鼠标事件处理器类型
 */
export type MouseEventHandler<E extends React.MouseEvent> = (event: E) => void;
