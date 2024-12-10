export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "vue"],
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest",
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    transformIgnorePatterns: ["/node_modules/"],
    testMatch: ["**/tests/**/*.spec.(js|jsx|ts|tsx)"],
    watchman: false,
  };