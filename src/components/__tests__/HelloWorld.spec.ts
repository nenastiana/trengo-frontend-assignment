import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HelloWorld from "../trash/HelloWorld.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.text()).toContain("Hello, world!");
  });
});