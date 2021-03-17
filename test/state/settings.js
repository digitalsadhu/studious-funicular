import tap from "tap";
import Settings from "../../src/state/settings.js";

tap.test("settings: set settings object", (t) => {
  const settings = new Settings();
  const result = settings.set({ name: "foo" });
  t.equal(settings.name, "foo");
  t.equal(result, true);
  t.end();
});

tap.test("settings: set same settings object 2x", (t) => {
  const settings = new Settings();
  settings.set({ name: "foo" });
  const result = settings.set({ name: "foo" });
  t.equal(settings.name, "foo");
  t.equal(result, false);
  t.end();
});

tap.test("settings: width and cellsize used to calculate widthPx", (t) => {
  const settings = new Settings();
  settings.set({ width: 10, cellsize: 10 });
  t.equal(settings.widthPx, 100);
  t.end();
});

tap.test("settings: height and cellsize used to calculate heightPx", (t) => {
  const settings = new Settings();
  settings.set({ height: 10, cellsize: 10 });
  t.equal(settings.heightPx, 100);
  t.end();
});
