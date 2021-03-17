import tap from "tap";
import Background from "../../src/state/background.js";

tap.test("background: set background object", (t) => {
  const background = new Background();
  const result = background.set({ src: "foo" });
  t.equal(background.src, "foo");
  t.equal(result, true);
  t.end();
});

tap.test("background: set same background object 2x", (t) => {
  const background = new Background();
  background.set({ src: "foo" });
  const result = background.set({ src: "foo" });
  t.equal(background.src, "foo");
  t.equal(result, false);
  t.end();
});
