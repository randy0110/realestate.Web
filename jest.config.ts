import { Config } from "jest";

const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const config: Config = {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestTransformCfg,
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], 
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
};


export default config;