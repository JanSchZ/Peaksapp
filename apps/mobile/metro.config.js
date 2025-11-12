const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..", "..");

const config = getDefaultConfig(projectRoot);
config.watchFolders = [...config.watchFolders, workspaceRoot];
config.resolver ??= { sourceExts: [], assetExts: [] };
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  "@peaks/core": path.join(workspaceRoot, "packages/core"),
};

module.exports = config;
