import "@testing-library/jest-native/extend-expect";
import "react-native-gesture-handler/jestSetup";

// Mock React Native Animated Helper
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper", () => ({
  addWhitelistedNativeProps: jest.fn(),
  addWhitelistedUIProps: jest.fn(),
}));

// Mock Reanimated Worklet (if using Reanimated)
global.__reanimatedWorkletInit = jest.fn();
