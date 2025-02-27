module.exports = {
    preset: "jest-expo",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transformIgnorePatterns: [
      "node_modules/(?!(react-native|@react-native|react-navigation|expo|@expo|@react-native-async-storage))",
    ],
  };
  