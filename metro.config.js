// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Loại bỏ hoàn toàn .mjs để ép Expo dùng bản .js chuẩn cũ của zustand, tránh lỗi import.meta
config.resolver.sourceExts = config.resolver.sourceExts.filter(ext => ext !== 'mjs');

module.exports = config;
