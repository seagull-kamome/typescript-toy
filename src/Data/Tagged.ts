/**
 * @file
 * @brief Tagged type wrapper.
 *
 * Copyright (C) HATTORI, Hiroki
 * All rights reserved.
 */


export interface Tagged_<T> { readonly __tag: T }
export interface Tagged<T, A> extends Tagged_<T> { readonly __v: A }

export function mkTagged_<T>(tag: T) { return { __tag: tag }; }
export function mkTagged<T, A>(tag: T, v: A) { return { __tag: tag, __v: v }; }

// vim: sw=2 ts=8 noexpandtab :
