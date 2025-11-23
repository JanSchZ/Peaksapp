module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // Required for reanimated if we use it later, but good to have
            // 'react-native-reanimated/plugin', 
        ],
    };
};
