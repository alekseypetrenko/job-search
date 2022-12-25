import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { createStore } from "vuex";

import MainNav from "@/components/Navigation/MainNav.vue";

describe("MainNav", () => {
  let wrapper;

  const creatConfig = (store) => ({
    global: {
      plugins: [store],
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("displays company name", () => {
    const store = createStore();
    const wrapper = shallowMount(MainNav, creatConfig(store));
    expect(wrapper.text()).toMatch("Oleksii");
  });

  it("displays menu items for navigation", () => {
    const store = createStore();
    const wrapper = shallowMount(MainNav, creatConfig(store));

    const navigationMenuItems = wrapper.findAll(
      "[data-test='main-nav-list-item']",
    );
    const navigationMenuTexts = navigationMenuItems.map((item) => item.text());
    expect(navigationMenuTexts).toEqual([
      "Teams",
      "Locations",
      "Life",
      "How we hire",
      "Students",
      "Jobs",
    ]);
  });

  describe("when user is logged out", () => {
    it("prompts user to sign in", () => {
      const store = createStore();
      const wrapper = shallowMount(MainNav, creatConfig(store));
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });

  describe("when user is loged in", () => {
    it("displays user profile picture", () => {
      const store = createStore({
        state() {
          return {
            isLoggedIn: true,
          };
        },
      });
      const wrapper = shallowMount(MainNav, creatConfig(store));
      let profileImage = wrapper.find("[data-test='profile-image']");

      profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });

    it("displays subnavigation menu with additional information", async () => {
      const store = createStore({
        state() {
          return {
            isLoggedIn: true,
          };
        },
      });
      const wrapper = shallowMount(MainNav, creatConfig(store));

      const subnav = wrapper.find('[data-test="subnav"]');
      expect(subnav.exists()).toBe(true);
    });
  });

  describe("when user is logged out", () => {
    it("issues call to Vuex to loggin user", async () => {
      const store = createStore();
      const commit = jest.fn();
      store.commit = commit;

      const wrapper = shallowMount(MainNav, creatConfig(store));
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");

      expect(commit).toHaveBeenCalledWith("LOGIN_USER");
    });
  });
});
