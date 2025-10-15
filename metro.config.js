const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona .wasm aos assets
config.resolver.assetExts = [...config.resolver.assetExts, 'wasm'];

module.exports = config;
