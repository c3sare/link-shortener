import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "psmecz",
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    // setupNodeEvents(on, config) {},
  },
});
