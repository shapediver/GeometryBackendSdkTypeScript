module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost:9090',
        resources: 'usable',
    },
    setupFilesAfterEnv: ['<rootDir>/__tests-browser__/setup.ts'],
    testTimeout: 60000,
    testMatch: ['**/__tests__/**/*.browser.test.ts', '**/__tests-browser__/**/*.test.ts'],
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
    },
    transform: {
        '^.+\\.[tj]sx?$': [
            'ts-jest',
            {
                tsconfig: {
                    allowJs: true,
                    esModuleInterop: true,
                    allowSyntheticDefaultImports: true,
                },
            },
        ],
    },
    transformIgnorePatterns: ['/node_modules/(?!.*uuid/)'],
};
