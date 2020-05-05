[immer issue 594](https://github.com/immerjs/immer/issues/594)

## 🐛 Bug Report

Some [recent changes to the flow types](https://github.com/immerjs/immer/commit/0dbcfe7205cb0ffdb56170da74fba61d8337d15d) seem to be too limiting: 

```js
type Base = {...} | Array<any> | Map<any> | Set<any>;
```

excludes `string | number | void | null` which all seem to be valid values to use with `immer`.

## Link to repro

Repository with reproduction case: https://github.com/esturcke/immer-flow-base-problem

## To Reproduce

```js
// @flow
import produce from "immer";

type Foo = { a: boolean } | void;

let foo: Foo = { a: false };
let bar = produce(foo, (draft) => {
  if (draft == null) return;
  draft.a = true;
});
```

## Observed behavior

```
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ index.js:7:11

Cannot call produce because undefined [1] is incompatible with function type [2].

     index.js
 [1]  4│ type Foo = { a: boolean } | void;
      5│
      6│ let foo: Foo = { a: false };
      7│ let bar = produce(foo, (draft) => {
      8│   if (draft == null) return;
      9│   draft.a = true;
     10│ });

     node_modules/immer/dist/index.js.flow
 [2] 33│         recipe: (draftState: S, a: A, b: B, c: C, ...extraArgs: any[]) => S | void,

Found 1 error
```
## Expected behavior

No flow errors.

## Environment

immer 6.0.5
