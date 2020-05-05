// @flow
import produce from "immer";

type Foo = { a: boolean } | void;

let foo: Foo = { a: false };
let bar = produce(foo, (draft) => {
  if (draft == null) return;
  draft.a = true;
});
