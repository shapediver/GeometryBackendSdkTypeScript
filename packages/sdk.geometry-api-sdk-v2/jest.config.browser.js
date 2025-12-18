module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        url: 'http://localhost:9090',
        resources: 'usable',
    },
    testTimeout: 60000,
    testMatch: ['**/__tests__/**/*.browser.test.ts', '**/__tests-browser__/**/*.test.ts'],
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: {
                    esModuleInterop: true,
                    allowSyntheticDefaultImports: true,
                },
            },
        ],
    },
};
