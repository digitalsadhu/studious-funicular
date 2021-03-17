import tap from "tap";
import State from "../../src/state/state.js";

tap.test("state: get/set valid background", (t) => {
  const adapter = { get() {}, set() {} };
  const state = new State(adapter);
  state.background = { src: "http://image" };
  t.same(state.background, { src: "http://image" });
  t.end();
});

tap.test("state: set invalid background", (t) => {
  const adapter = { get() {}, set() {} };
  const state = new State(adapter);
  t.throws(() => (state.background = "http://image"));
  t.end();
});

tap.test("state: set new background should trigger event", (t) => {
  t.plan(1);
  const adapter = { get() {}, set() {} };
  const state = new State(adapter);
  state.on("state:background:update", (bg) => {
    t.same(bg, { src: "http://image" });
    t.end();
  });
  state.background = { src: "http://image" };
});

tap.test("state: set new background should trigger event", (t) => {
  t.plan(1);
  const adapter = { get() {}, set() {} };
  const state = new State(adapter);
  state.on("state:background:update", (bg) => {
    t.same(bg, { src: "http://image" });
    t.end();
  });
  state.background = { src: "http://image" };
});

tap.test("state: set new background should trigger set on adapter", (t) => {
  let num = 0;
  const adapter = {
    get() {},
    set() {
      num++;
    },
  };
  const state = new State(adapter);
  state.background = { src: "http://image" };
  t.equal(num, 1);
  t.end();
});

tap.test(
  "state: set same background should not trigger set on adapter",
  (t) => {
    let num = 0;
    const adapter = {
      get() {},
      set() {
        num++;
      },
    };
    const state = new State(adapter);
    state.background = { src: "http://image" };
    state.background = { src: "http://image" };
    state.background = { src: "http://image" };
    t.equal(num, 1);
    t.end();
  }
);

tap.test("state: get/set valid settings", (t) => {
  const adapter = { get() {}, set() {} };
  const state = new State(adapter);
  state.settings = { name: "my map" };
  t.same(state.settings.name, "my map");
  t.end();
});

tap.test("state: set invalid settings", (t) => {
  const adapter = { get() {}, set() {} };
  const state = new State(adapter);
  t.throws(() => (state.settings = "bad setting"));
  t.throws(() => (state.settings = 1));
  t.throws(() => (state.settings = { bad: "setting" }));
  t.end();
});

tap.test("state: set new settings should trigger event", (t) => {
  t.plan(1);
  const adapter = { get() {}, set() {} };
  const state = new State(adapter);
  state.on("state:settings:update", (bg) => {
    t.same(bg.name, "my map");
    t.end();
  });
  state.settings = { name: "my map" };
});

tap.test("state: set new settings should trigger set on adapter", (t) => {
  let num = 0;
  const adapter = {
    get() {},
    set() {
      num++;
    },
  };
  const state = new State(adapter);
  state.settings = { name: "my map" };
  t.equal(num, 1);
  t.end();
});

tap.test("state: set same settings should not trigger set on adapter", (t) => {
  let num = 0;
  const adapter = {
    get() {},
    set() {
      num++;
    },
  };
  const state = new State(adapter);
  state.settings = { name: "my map" };
  state.settings = { name: "my map" };
  state.settings = { name: "my map" };
  t.equal(num, 1);
  t.end();
});

tap.test("state: load state from adapter", async (t) => {
  const adapter = {
    get(key) {
      if (key === "state:background") return { src: "foo" };
      if (key === "state:settings") return { name: "bar" };
      if (key === "state:tokens") return [["foo", { src: "foo" }]];
    },
    set() {},
  };
  const state = new State(adapter);
  await state.load();
  t.equal(state.background.src, "foo");
  t.equal(state.settings.name, "bar");
  t.equal(state.tokens.get("foo").src, "foo");
  t.end();
});
