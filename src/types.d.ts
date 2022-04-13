/**
 * utility types
 */

export type UnknownKey = string | number | symbol;

export type UnknownType<T = unknown> = Record<string | number | symbol, T>;
