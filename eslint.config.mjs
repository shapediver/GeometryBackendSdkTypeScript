// @ts-check

import eslint from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';

/** Custom rules go here */
const customRules = {
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unused-vars': [
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
    ],
    '@typescript-eslint/restrict-template-expressions': 'warn',
};

function buildLanguageOptions(tsconfig) {
    return {
        parserOptions: {
            project: tsconfig,
            tsconfigRootDir: import.meta.dirname,
        },
    };
}

export default tseslint.config(
    {
        // Global ignores
        ignores: [
            'packages/sdk.geometry-api-sdk-v2/src/client/**',
            '**/build/**',
            '**/dist/**',
            '**/node_modules/**',
            'scripts/**',
        ],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylistic,
    {
        files: ['libs/**/*.ts'],
        languageOptions: buildLanguageOptions('./tsconfig.package.json'),
        rules: customRules,
    },
    {
        files: ['services/**/*.ts'],
        languageOptions: buildLanguageOptions('./tsconfig.service.json'),
        rules: customRules,
    },
    {
        // disable type-aware linting on JS files
        files: ['**/*.js'],
        ...tseslint.configs.disableTypeChecked,
    },
    {
        // enable jest rules on test files
        files: ['**/*.test.ts'],
        ...jestPlugin.configs['flat/recommended'],
        rules: {
            ...jestPlugin.configs['flat/recommended'].rules,

            /** Jest specific settings */
            'jest/expect-expect': 'off',
            'jest/no-conditional-expect': 'off',
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'jest/no-identical-title': 'error',
            'jest/prefer-to-have-length': 'warn',
            'jest/valid-expect': 'error',

            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/unbound-method': 'off',
        },
    }
);
