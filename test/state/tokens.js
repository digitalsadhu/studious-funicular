import tap from "tap";
import Tokens from "../../src/state/tokens.js";

tap.test("tokens: add", (t) => {
  let emits = 0;
  let sets = 0;
  const events = {
    emit() {
      emits++;
    },
    on() {},
  };
  const adapter = {
    get() {},
    set() {
      sets++;
    },
  };
  const tokens = new Tokens(events, adapter);
  tokens.add({ src: "foo" });
  t.equal(emits, 1);
  t.equal(sets, 1);
  t.end();
});

tap.test("tokens: add saves whole collection to adapter", (t) => {
  let savedKey = null;
  let savedValue = null;
  const events = {
    emit() {},
    on() {},
  };
  const adapter = {
    get() {},
    set(key, value) {
      savedKey = key;
      savedValue = value;
    },
  };
  const tokens = new Tokens(events, adapter);
  tokens.add({ src: "foo" });
  t.equal(savedKey, "state:tokens");
  t.same(savedValue, [["foo", { src: "foo" }]]);

  tokens.add({ src: "bar" });
  t.equal(savedKey, "state:tokens");
  t.same(savedValue, [
    ["foo", { src: "foo" }],
    ["bar", { src: "bar" }],
  ]);
  t.end();
});

tap.test("tokens: remove after adding saves collection to adapter", (t) => {
  let savedKey = null;
  let savedValue = null;
  const events = {
    emit() {},
    on() {},
  };
  const adapter = {
    get() {},
    set(key, value) {
      savedKey = key;
      savedValue = value;
    },
  };
  const tokens = new Tokens(events, adapter);
  tokens.add({ src: "foo" });
  tokens.add({ src: "bar" });
  tokens.add({ src: "baz" });
  tokens.remove({ src: "bar" });

  t.equal(savedKey, "state:tokens");
  t.same(savedValue, [
    ["foo", { src: "foo" }],
    ["baz", { src: "baz" }],
  ]);
  t.end();
});
