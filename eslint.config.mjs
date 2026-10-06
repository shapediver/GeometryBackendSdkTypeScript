// @ts-check

import eslint from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';

const unusedVars = [
    'error',
    {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
    },
];

export default tseslint.config(
    {
        ignores: [
            'packages/sdk.geometry-api-sdk-v2/src/client/**',
            '**/build/**',
            '**/dist/**',
            '**/dist-dev/**',
            '**/dist-prod/**',
            '**/node_modules/**',
            'scripts/**',
        ],
    },
    eslint.configs.recommended,
    {
        files: ['packages/sdk.geometry-api-sdk-v2/**/*.ts'],
        extends: [...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylistic],
        languageOptions: {
            parserOptions: {
                project: './packages/sdk.geometry-api-sdk-v2/tsconfig.check.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': unusedVars,
        },
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        files: ['webpack.*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                module: 'readonly',
                require: 'readonly',
            },
        },
    },
    {
        files: ['**/*.test.ts'],
        extends: [jestPlugin.configs['flat/recommended']],
        rules: {
            'jest/expect-expect': 'off',
            'jest/no-conditional-expect': 'off',
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/unbound-method': 'off',
        },
    },
    {
        linterOptions: {
            reportUnusedDisableDirectives: 'error',
            reportUnusedInlineConfigs: 'error',
        },
    }
);
