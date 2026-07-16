const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase compatibility fix: Metro's newer package resolution conflicts
// with Firebase's CommonJS module structure for React Native
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

module.exports = config;